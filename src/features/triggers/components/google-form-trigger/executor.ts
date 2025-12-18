import { NodeExecutor } from "@/features/executions/types";
import { GoogleFormTriggerNodeChannel } from "@/inngest/channels/google-form-trigger";
import { INNGEST_EVENTS } from "@/lib/constants";

type GoogleFormTriggerNodeData = Record<string, unknown>;

export const GoogleFormTriggerNodeExecutor: NodeExecutor<
  GoogleFormTriggerNodeData
> = async ({ nodeId, context, step, publish }) => {
  await publish(
    GoogleFormTriggerNodeChannel().status({
      nodeId,
      status: "loading",
    })
  );

  const result = await step.run(
    INNGEST_EVENTS.GOOGLE_FORM_TRIGGER.NAME,
    async () => ({
      ...context,
      GoogleFormTriggerNodeExecutedAt: new Date().toISOString(),
    })
  );

  await publish(
    GoogleFormTriggerNodeChannel().status({
      nodeId,
      status: "success",
    })
  );

  return result;
};
