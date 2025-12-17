import { NodeExecutor } from "@/features/executions/types";
import { manualTriggerChannel } from "@/inngest/channels/manual-trigger";
import { INNGEST_EVENTS } from "@/lib/constants";

type ManualTriggerData = Record<string, unknown>;

export const manualTriggerExecutor: NodeExecutor<ManualTriggerData> = async ({
  nodeId,
  context,
  step,
  publish,
}) => {
  await publish(
    manualTriggerChannel().status({
      nodeId,
      status: "loading",
    })
  );

  const result = await step.run(
    INNGEST_EVENTS.MANUAL_TRIGGER.NAME,
    async () => ({
      ...context,
      manualTriggerExecutedAt: new Date().toISOString(),
    })
  );

  await publish(
    manualTriggerChannel().status({
      nodeId,
      status: "success",
    })
  );

  return result;
};
