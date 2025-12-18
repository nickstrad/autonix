import { channel, topic } from "@inngest/realtime";
import { INNGEST_CHANNELS } from "@/lib/constants";

export const httpRequestChannel = channel(
  INNGEST_CHANNELS.HTTP_REQUEST
).addTopic(
  topic("status").type<{
    nodeId: string;
    status: "loading" | "success" | "error";
  }>()
);
