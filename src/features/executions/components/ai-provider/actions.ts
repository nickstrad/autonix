"use server";

import { getSubscriptionToken, type Realtime } from "@inngest/realtime";
import { inngest } from "@/inngest/client";
import {
  AIProviderChannel,
  getAIProviderChannel,
} from "@/inngest/channels/ai-providers";
import { AIProvider } from "@/lib/constants";

export type AIProviderToken = Realtime.Token<AIProviderChannel, ["status"]>;

export const fetchAIProviderRealtimeToken = async (
  provider: AIProvider
): Promise<AIProviderToken> => {
  const providerChannel = getAIProviderChannel(provider);
  const token = await getSubscriptionToken(inngest, {
    channel: providerChannel(),
    topics: ["status"],
  });

  return token as AIProviderToken;
};
