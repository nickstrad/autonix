import { channel, topic } from "@inngest/realtime";
import { INNGEST_CHANNELS } from "@/lib/constants";
export const GoogleFormTriggerNodeChannel = channel(
  INNGEST_CHANNELS.GOOGLE_FORM_TRIGGER
).addTopic(
  topic("status").type<{
    nodeId: string;
    status: "loading" | "success" | "error";
  }>()
);
