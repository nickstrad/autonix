import { Webhook, WEBHOOK_TYPES } from "./constants";

const isValidWebhookType = (webhook?: string): webhook is Webhook => {
  return (
    typeof webhook === "string" &&
    Object.values(WEBHOOK_TYPES).includes(webhook as Webhook)
  );
};

export const buildWebhookUrl = ({
  workflowId,
  type,
}: {
  workflowId?: string;
  type: "stripe" | "google-form";
}) => {
  if (!isValidWebhookType(type)) {
    return "";
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const webhookUrl = `${baseUrl}/api/webhooks/${type}?workflowId=${workflowId}`;
  return webhookUrl;
};
