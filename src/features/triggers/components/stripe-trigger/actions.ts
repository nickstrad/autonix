"use server";

import { getSubscriptionToken, type Realtime } from "@inngest/realtime";
import { inngest } from "@/inngest/client";
import { stripeTriggerChannel } from "@/inngest/channels/stripe-trigger";

export type StripeTriggerNodeToken = Realtime.Token<
  typeof stripeTriggerChannel,
  ["status"]
>;

export const fetchStripeTriggerNodeRealtimeToken =
  async (): Promise<StripeTriggerNodeToken> => {
    const token = await getSubscriptionToken(inngest, {
      channel: stripeTriggerChannel(),
      topics: ["status"],
    });
    return token;
  };
