"use server";

import { getSubscriptionToken, type Realtime } from "@inngest/realtime";
import { inngest } from "@/inngest/client";
import { GoogleFormTriggerNodeChannel } from "@/inngest/channels/google-form-trigger";

export type GoogleFormTriggerNodeToken = Realtime.Token<
  typeof GoogleFormTriggerNodeChannel,
  ["status"]
>;

export const fetchGoogleFormTriggerNodeRealtimeToken =
  async (): Promise<GoogleFormTriggerNodeToken> => {
    const token = await getSubscriptionToken(inngest, {
      channel: GoogleFormTriggerNodeChannel(),
      topics: ["status"],
    });
    return token;
  };
