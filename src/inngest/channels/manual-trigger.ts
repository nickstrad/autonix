import { INNGEST_CHANELS } from "@/lib/constants";
import { channel, topic } from "@inngest/realtime";

export const manualTriggerChannel = channel(
  INNGEST_CHANELS.MANUAL_TRIGGER
).addTopic(
  topic("status").type<{
    nodeId: string;
    status: "loading" | "success" | "error";
  }>()
);
