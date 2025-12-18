import { NodeExecutor } from "@/features/executions/types";
import { stripeTriggerChannel } from "@/inngest/channels/stripe-trigger";
import { INNGEST_EVENTS } from "@/lib/constants";

type StripeTriggerNodeData = Record<string, unknown>;

export const stripeTriggerExecutor: NodeExecutor<
  StripeTriggerNodeData
> = async ({ nodeId, context, step, publish }) => {
  await publish(
    stripeTriggerChannel().status({
      nodeId,
      status: "loading",
    })
  );

  const result = await step.run(
    INNGEST_EVENTS.STRIPE_TRIGGER.NAME,
    async () => ({
      ...context,
      stripeTriggerNodeExecutedAt: new Date().toISOString(),
    })
  );

  await publish(
    stripeTriggerChannel().status({
      nodeId,
      status: "success",
    })
  );

  return result;
};
