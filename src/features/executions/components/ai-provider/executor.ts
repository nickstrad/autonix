import { NonRetriableError } from "inngest";
import { NodeExecutor } from "@/features/executions/types";
import Handlebars from "handlebars";
import { getAIProviderChannel } from "@/inngest/channels/ai-providers";
import { generateText } from "ai";
import { NodeType } from "@/generated/prisma/browser";
import {
  AIProvider,
  AIProviderNodeType,
  AI_PROVIDERS,
  getAIProviderModel,
} from "@/lib/constants";

Handlebars.registerHelper("json", (context) => {
  const stringifiedData = JSON.stringify(context, null, 2);
  const safeString = new Handlebars.SafeString(stringifiedData);
  return safeString;
});

const isString = (value: unknown): value is string => {
  return typeof value === "string";
};

type AIProviderTriggerData = Record<string, unknown>;

export const getAIProviderExecutor: (
  provider: AIProvider
) => NodeExecutor<AIProviderTriggerData> =
  (provider: AIProvider) =>
  async ({
    context,
    step,
    data: { variableName, prompt },
    nodeId,
    publish,
  }) => {
    const channel = getAIProviderChannel(provider);

    await publish(
      channel().status({
        nodeId,
        status: "loading",
      })
    );

    if (!variableName || !prompt) {
      await publish(
        channel().status({
          nodeId,
          status: "error",
        })
      );
      throw new NonRetriableError(
        `AI Provider node: No variableName or prompt configured`
      );
    }

    try {
      if (!isString(variableName) || variableName.trim() === "") {
        throw new NonRetriableError(
          `AI Provider node: Invalid variable name ${variableName} configured`
        );
      }

      const result = await step.run("ai-provider-execution", async () => {
        const interpolatedPrompt = Handlebars.compile(prompt)(context);
        if (!interpolatedPrompt || typeof interpolatedPrompt !== "string") {
          throw new NonRetriableError(`AI Provider node: Invalid prompt`);
        }

        const model = getAIProviderModel(provider);

        const { text } = await generateText({
          model: model,
          prompt: interpolatedPrompt,
        });

        const responsePayload = {
          response: text,
        };

        return {
          ...context,
          [variableName]: responsePayload,
        };
      });

      await publish(
        channel().status({
          nodeId,
          status: "success",
        })
      );

      return result;
    } catch (error) {
      await publish(
        channel().status({
          nodeId,
          status: "error",
        })
      );
      throw error;
    }
  };

export const AI_PROVIDER_EXECUTORS: Record<
  AIProviderNodeType,
  NodeExecutor<AIProviderTriggerData>
> = {
  [NodeType.GEMINI]: getAIProviderExecutor(AI_PROVIDERS.GEMINI),
  [NodeType.ANTHROPIC]: getAIProviderExecutor(AI_PROVIDERS.ANTHROPIC),
  [NodeType.OPENAI]: getAIProviderExecutor(AI_PROVIDERS.OPENAI),
};
