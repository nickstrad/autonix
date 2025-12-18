import { channel, topic } from "@inngest/realtime";
import { INNGEST_CHANNELS } from "@/lib/constants";

export const stripeTriggerChannel = channel(
  INNGEST_CHANNELS.STRIPE_TRIGGER
).addTopic(
  topic("status").type<{
    nodeId: string;
    status: "loading" | "success" | "error";
  }>()
);
