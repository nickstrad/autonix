import { NodeExecutor } from "@/features/executions/types";
import { INNGEST_EVENTS } from "@/inngest/functions";

type ManualTriggerData = Record<string, unknown>;

export const manualTriggerExecutor: NodeExecutor<ManualTriggerData> = async ({
  nodeId,
  context,
  step,
}) => {
  // TODO: Publish 'loading' state for manual trigger
  const result = await step.run(
    INNGEST_EVENTS.MANUAL_TRIGGER.NAME,
    async () => ({
      ...context,
      manualTriggerExecutedAt: new Date().toISOString(),
    })
  );

  // TODO: Publish 'success' state for manual trigger

  return result;
};
