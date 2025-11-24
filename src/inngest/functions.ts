import { inngest } from "./client";

const INGEST_EVENT_HELLO_WORLD = "hello.world";

export const INNGEST_EVENT_NAMES = {
  HELLO_WORLD: {
    ID: `test/${INGEST_EVENT_HELLO_WORLD}`,
    NAME: INGEST_EVENT_HELLO_WORLD,
  },
} as const;

export const helloWorld = inngest.createFunction(
  { id: INNGEST_EVENT_NAMES.HELLO_WORLD.NAME },
  { event: INNGEST_EVENT_NAMES.HELLO_WORLD.ID },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  }
);
