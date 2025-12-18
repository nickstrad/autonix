import {
  AI_PROVIDERS,
  AIProvider,
  getAIProviderChannelName,
} from "@/lib/constants";
import { channel, topic } from "@inngest/realtime";

const createAIProviderChannel = (provider: AIProvider) => {
  const channelName = getAIProviderChannelName(provider);
  return channel(channelName).addTopic(
    topic("status").type<{
      nodeId: string;
      status: "loading" | "success" | "error";
    }>()
  );
};

export const geminiChannel = createAIProviderChannel(AI_PROVIDERS.GEMINI);
export const anthropicChannel = createAIProviderChannel(AI_PROVIDERS.ANTHROPIC);
export const openAIChannel = createAIProviderChannel(AI_PROVIDERS.OPENAI);

export type AIProviderChannel =
  | typeof geminiChannel
  | typeof anthropicChannel
  | typeof openAIChannel;

const channelMap: Record<AIProvider, AIProviderChannel> = {
  [AI_PROVIDERS.GEMINI]: geminiChannel,
  [AI_PROVIDERS.ANTHROPIC]: anthropicChannel,
  [AI_PROVIDERS.OPENAI]: openAIChannel,
};

export const getAIProviderChannel = (provider: AIProvider) => {
  if (!(provider in channelMap)) {
    throw new Error(`Unsupported provider: ${provider}`);
  }

  return channelMap[provider];
};
