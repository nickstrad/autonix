import prisma from "@/lib/db";
import { inngest } from "./client";
import { NonRetriableError } from "inngest";
import { topologicalSort } from "./utils";
import { NodeType } from "@/generated/prisma/browser";
import { getExcecutor } from "@/features/executions/lib/executor-registry";

const PREFIX = "event";
const INNGEST_EVENT_EXECUTE_WORKFLOW = "workflows/execute.workflow";
const INNGEST_EVENT_MANUAL_TRIGGER = "triggers/manual.trigger";
const INNGEST_EVENT_HTTP_REQUEST = "http-request/http.request";

export const INNGEST_EVENTS = {
  EXECUTE_WORKFLOW: {
    NAME: INNGEST_EVENT_EXECUTE_WORKFLOW,
    ID: `${PREFIX}/${INNGEST_EVENT_EXECUTE_WORKFLOW}`,
  },
  MANUAL_TRIGGER: {
    NAME: INNGEST_EVENT_MANUAL_TRIGGER,
    ID: `${PREFIX}/${INNGEST_EVENT_MANUAL_TRIGGER}`,
  },
  HTTP_REQUEST: {
    NAME: INNGEST_EVENT_HTTP_REQUEST,
    ID: `${PREFIX}/${INNGEST_EVENT_HTTP_REQUEST}`,
  },
} as const;

export const executeWorkflow = inngest.createFunction(
  { id: INNGEST_EVENTS.EXECUTE_WORKFLOW.ID },
  { event: INNGEST_EVENTS.EXECUTE_WORKFLOW.NAME },
  async ({ event, step }) => {
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
      });
    }

    return { workflowId, result: context };
  }
);
