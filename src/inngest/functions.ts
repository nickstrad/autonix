import prisma from "@/lib/db";
import { inngest } from "./client";
import { NonRetriableError } from "inngest";
import { topologicalSort } from "./utils";
import { NodeType } from "@/generated/prisma/browser";
import { getExcecutor } from "@/features/executions/lib/executor-registry";
import { httpRequestChannel } from "./channels/http-request";
import { INNGEST_EVENTS } from "@/lib/constants";
import { manualTriggerChannel } from "./channels/manual-trigger";

type ValidRetryNumber =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20;

const isAllowedRetryNumber = (value: number): value is ValidRetryNumber => {
  return (
    typeof value === "number" && !isNaN(value) && value >= 0 && value <= 20
  );
};

const retriesEnv = process.env.INGEST_RETRIES;
const parsedRetries = Number(retriesEnv);
const retries = isAllowedRetryNumber(parsedRetries) ? parsedRetries : 0;

export const executeWorkflow = inngest.createFunction(
  {
    id: INNGEST_EVENTS.EXECUTE_WORKFLOW.ID,
    retries, // TODO: change for prod
  },
  {
    event: INNGEST_EVENTS.EXECUTE_WORKFLOW.NAME,
    channels: [httpRequestChannel(), manualTriggerChannel()],
  },
  async ({ event, step, publish }) => {
    const workflowId = event.data.workflowId;
    if (!workflowId) {
      throw new NonRetriableError("Workflow ID is required");
    }

    const sortedNodes = await step.run("prepare-workflow", async () => {
      const workflow = await prisma.workflow.findUniqueOrThrow({
        where: { id: workflowId },
        include: { nodes: true, connections: true },
      });
      try {
        return topologicalSort({
          nodes: workflow.nodes,
          connections: workflow.connections,
        });
      } catch (err) {
        if (
          err instanceof Error &&
          err.message.includes("Workflow contains a cycle")
        ) {
          throw new NonRetriableError("Workflow contains a cycle");
        }
        throw err;
      }
    });

    let context = event.data.initialData || {};

    for (const node of sortedNodes) {
      const executor = getExcecutor(node.type as NodeType);

      context = await executor({
        data: node.data as Record<string, unknown>,
        nodeId: node.id,
        context,
        step,
        publish,
      });
    }

    return { workflowId, result: context };
  }
);
