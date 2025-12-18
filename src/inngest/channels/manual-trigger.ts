import { channel, topic } from "@inngest/realtime";
import { INNGEST_CHANNELS } from "@/lib/constants";

export const manualTriggerChannel = channel(
  INNGEST_CHANNELS.MANUAL_TRIGGER
).addTopic(
  topic("status").type<{
    nodeId: string;
    status: "loading" | "success" | "error";
  }>()
);
