import { INNGEST_CHANELS } from "@/lib/constants";
import { channel, topic } from "@inngest/realtime";

export const googleFormTriggerChannel = channel(
  INNGEST_CHANELS.GOOGLE_FORM_TRIGGER
).addTopic(
  topic("status").type<{
    nodeId: string;
    status: "loading" | "success" | "error";
  }>()
);
