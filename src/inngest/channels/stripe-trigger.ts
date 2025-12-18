import { INNGEST_CHANELS } from "@/lib/constants";
import { channel, topic } from "@inngest/realtime";

export const stripeTriggerChannel = channel(
  INNGEST_CHANELS.STRIPE_TRIGGER
).addTopic(
  topic("status").type<{
    nodeId: string;
    status: "loading" | "success" | "error";
  }>()
);
