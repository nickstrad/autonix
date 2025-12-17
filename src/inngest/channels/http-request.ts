import { INNGEST_CHANELS } from "@/lib/constants";
import { channel, topic } from "@inngest/realtime";

export const httpRequestChannel = channel(
  INNGEST_CHANELS.HTTP_REQUEST
).addTopic(
  topic("status").type<{
    nodeId: string;
    status: "loading" | "success" | "error";
  }>()
);
