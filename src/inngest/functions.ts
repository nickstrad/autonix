import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { inngest } from "./client";
import { generateText } from "ai";

const PREFIX = "event";
const INGEST_EVENT_EXECUTE = "execute/ai";

export const INNGEST_EVENT_NAMES = {
  EXECUTE: {
    NAME: INGEST_EVENT_EXECUTE,
    ID: `${PREFIX}/${INGEST_EVENT_EXECUTE}`,
  },
} as const;

const google = createGoogleGenerativeAI();

export const execute = inngest.createFunction(
  { id: INNGEST_EVENT_NAMES.EXECUTE.NAME },
  { event: INNGEST_EVENT_NAMES.EXECUTE.ID },
  async ({ event, step }) => {
    const { steps } = await step.ai.wrap("ai-generate-text", generateText, {
      model: google("gemini-2.5-flash-lite"),
      system: "You are math teacher.",
      prompt: "what is 2 + 2?",
    });
    return steps;
  }
);
