import { NodeExecutor } from "@/features/executions/types";
import { googleFormTriggerChannel } from "@/inngest/channels/google-form-trigger";
import { INNGEST_EVENTS } from "@/lib/constants";

type GoogleFormTriggerData = Record<string, unknown>;

export const googleFormTriggerExecutor: NodeExecutor<
  GoogleFormTriggerData
> = async ({ nodeId, context, step, publish }) => {
  await publish(
    googleFormTriggerChannel().status({
      nodeId,
      status: "loading",
    })
  );

  const result = await step.run(
    INNGEST_EVENTS.GOOGLE_FORM_TRIGGER.NAME,
    async () => ({
      ...context,
      googleFormTriggerExecutedAt: new Date().toISOString(),
    })
  );

  await publish(
    googleFormTriggerChannel().status({
      nodeId,
      status: "success",
    })
  );

  return result;
};
