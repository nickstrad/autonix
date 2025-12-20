import { InitialNode } from "@/components/app/initial-node";
import {
  AnthropicNode,
  GeminiNode,
  OpenAINode,
} from "@/features/executions/components/ai-provider/lazy-nodes";
import { HttpRequestNode } from "@/features/executions/components/http-request/node";
import { GoogleFormTriggerNode } from "@/features/triggers/components/google-form-trigger/node";
import { ManualTriggerNode } from "@/features/triggers/components/manual-trigger/node";
import { StripeTriggerNode } from "@/features/triggers/components/stripe-trigger/node";
import { NodeType } from "@/generated/prisma/enums";
import { createAnthropic } from "@ai-sdk/anthropic";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";
import type { NodeTypes } from "@xyflow/react";

export const APP_NAME = "Autonix";

export const ERRORS = {
  FORBIDDEN: {
    code: "FORBIDDEN",
    message: "You do not have permission to access this resource.",
  },
  UNAUTHORIZED: {
    code: "UNAUTHORIZED",
    message: "unauthorized",
  },
} as const;

export const ENTITIES = {
  EXECUTION: "execution",
  EXECUTIONS: "executions",
  WORKFLOW: "workflow",
  WORKFLOWS: "workflows",
} as const;

export type Entity = (typeof ENTITIES)[keyof typeof ENTITIES];

export const STATIC_PATHS = {
  HOME: "/",
  LOGIN: "/login",
  LOGOUT: "/logout",
  SIGNUP: "/signup",
  EXECUTIONS: `/${ENTITIES.EXECUTIONS}`,
  WORKFLOWS: `/${ENTITIES.WORKFLOWS}`,
} as const;

export const DYNAMIC_PATH_BUILDERS = {
  WORKFLOWS: {
    detailsView: (id: string) => `${STATIC_PATHS.WORKFLOWS}/${id}`,
  },
  EXECUTIONS: {
    byWorkflow: (workflowId: string) =>
      `${STATIC_PATHS.EXECUTIONS}?workflowId=${workflowId}`,
  },
} as const;

export const POLAR = {
  PRODUCT_SLUG: "Autonix-Pro",
  PRODUCT_ID: "d3ab2dfb-5ad4-4fad-a524-c817ab34a5f5",
} as const;

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 5,
  MAX_PAGE_SIZE: 100,
  MIN_PAGE_SIZE: 1,
} as const;

/*
INNGEST values
*/
const PREFIX = "event";
const INNGEST_EVENT_EXECUTE_WORKFLOW = "workflows/execute.workflow";
const INNGEST_EVENT_MANUAL_TRIGGER = "triggers/manual.trigger";
const INNGEST_EVENT_HTTP_REQUEST = "http-request/http.request";
const INNGEST_EVENT_GOOGLE_FORM_TRIGGER = "triggers/google.form";
const INNGEST_EVENT_STRIPE_TRIGGER = "triggers/stripe";

export const INNGEST_EVENTS = {
  EXECUTE_WORKFLOW: {
    NAME: INNGEST_EVENT_EXECUTE_WORKFLOW,
    ID: `${PREFIX}/${INNGEST_EVENT_EXECUTE_WORKFLOW}`,
  },
  MANUAL_TRIGGER: {
    NAME: INNGEST_EVENT_MANUAL_TRIGGER,
    ID: `${PREFIX}/${INNGEST_EVENT_MANUAL_TRIGGER}`,
  },
  HTTP_REQUEST: {
    NAME: INNGEST_EVENT_HTTP_REQUEST,
    ID: `${PREFIX}/${INNGEST_EVENT_HTTP_REQUEST}`,
  },
  GOOGLE_FORM_TRIGGER: {
    NAME: INNGEST_EVENT_GOOGLE_FORM_TRIGGER,
    ID: `${PREFIX}/${INNGEST_EVENT_GOOGLE_FORM_TRIGGER}`,
  },
  STRIPE_TRIGGER: {
    NAME: INNGEST_EVENT_STRIPE_TRIGGER,
    ID: `${PREFIX}/${INNGEST_EVENT_STRIPE_TRIGGER}`,
  },
} as const;

/* AI Provider values */
export const AI_PROVIDERS = {
  GEMINI: NodeType.GEMINI,
  ANTHROPIC: NodeType.ANTHROPIC,
  OPENAI: NodeType.OPENAI,
} as const;

export type Settings = {
  [AI_PROVIDERS.GEMINI]?: string;
  [AI_PROVIDERS.ANTHROPIC]?: string;
  [AI_PROVIDERS.OPENAI]?: string;
};

export const INNGEST_CHANNELS = {
  HTTP_REQUEST: "http-request-execution",
  MANUAL_TRIGGER: "manual-trigger-execution",
  GOOGLE_FORM_TRIGGER: "google-form-trigger-execution",
  STRIPE_TRIGGER: "stripe-trigger-execution",
  [AI_PROVIDERS.GEMINI]: "ai-provider-gemini-execution",
  [AI_PROVIDERS.ANTHROPIC]: "ai-provider-anthropic-execution",
  [AI_PROVIDERS.OPENAI]: "ai-provider-openai-execution",
} as const;

export const getAIProviderChannelName = (provider: AIProvider) => {
  const providerName = AI_PROVIDERS[provider];
  if (!(providerName in INNGEST_CHANNELS)) {
    throw new Error(`Invalid AI provider: ${provider}`);
  }
  return INNGEST_CHANNELS[providerName];
};

export type AIProvider = (typeof AI_PROVIDERS)[keyof typeof AI_PROVIDERS];

export const AI_PROVIDER_MAP = {
  [AI_PROVIDERS.GEMINI]: AI_PROVIDERS.GEMINI,
  [AI_PROVIDERS.ANTHROPIC]: AI_PROVIDERS.ANTHROPIC,
  [AI_PROVIDERS.OPENAI]: AI_PROVIDERS.OPENAI,
} as const;

export type AIProviderNodeType = keyof typeof AI_PROVIDER_MAP;
export const AI_PROVIDER_NODES = Object.keys(
  AI_PROVIDER_MAP
) as AIProviderNodeType[];

export const getAIProviderModel = ({
  provider,
  apiKey,
}: {
  provider: AIProvider;
  apiKey: string;
}) => {
  switch (provider) {
    case AI_PROVIDERS.GEMINI:
      return createGoogleGenerativeAI({ apiKey }).chat("gemini-2.5-flash");
    case AI_PROVIDERS.ANTHROPIC:
      return createAnthropic({ apiKey })("claude-haiku-4-5");
    case AI_PROVIDERS.OPENAI:
      return createOpenAI({ apiKey }).chat("gpt-5.2");
    default:
      throw new Error(`Unsupported AI provider type: ${provider}`);
  }
};

const AI_PROVIDERS_CONFIG: {
  [key in AIProvider]: {
    label: string;
    icon: string;
    channel: string;
  };
} = {
  [AI_PROVIDERS.GEMINI]: {
    label: "Gemini",
    icon: "/logos/gemini.svg",
    channel: getAIProviderChannelName(AI_PROVIDERS.GEMINI),
  },
  [AI_PROVIDERS.ANTHROPIC]: {
    label: "Anthropic",
    icon: "/logos/anthropic.svg",
    channel: getAIProviderChannelName(AI_PROVIDERS.ANTHROPIC),
  },
  [AI_PROVIDERS.OPENAI]: {
    label: "OpenAI",
    icon: "/logos/openai.svg",
    channel: getAIProviderChannelName(AI_PROVIDERS.OPENAI),
  },
} as const;

export const getAIProviderConfig = (provider: AIProvider) => {
  if (!(provider in AI_PROVIDERS_CONFIG)) {
    throw new Error(`Invalid AI provider: ${provider}`);
  }
  return AI_PROVIDERS_CONFIG[provider];
};

export const NODE_COMPONENTS = {
  [NodeType.INITIAL]: InitialNode,
  [NodeType.HTTP_REQUEST]: HttpRequestNode,
  [NodeType.MANUAL_TRIGGER]: ManualTriggerNode,
  [NodeType.GOOGLE_FORM_TRIGGER]: GoogleFormTriggerNode,
  [NodeType.STRIPE_TRIGGER]: StripeTriggerNode,
  [NodeType.GEMINI]: GeminiNode,
  [NodeType.ANTHROPIC]: AnthropicNode,
  [NodeType.OPENAI]: OpenAINode,
} as const satisfies NodeTypes;

export type RegisteredNodeType = keyof typeof NODE_COMPONENTS;

// Webhook values and types
// TODO: investigate svix as production level webhooks as a service company
export const WEBHOOK_TYPES = {
  STRIPE: "stripe",
  GOOGLE_FORM: "google-form",
} as const;

export type Webhook = (typeof WEBHOOK_TYPES)[keyof typeof WEBHOOK_TYPES];
