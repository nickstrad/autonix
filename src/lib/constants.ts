import { InitialNode } from "@/components/app/initial-node";
import { HttpRequestNode } from "@/features/executions/components/http-request/node";
import { ManualTriggerNode } from "@/features/triggers/components/manual-trigger/node";
import { NodeType } from "@/generated/prisma/enums";
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
  CREDENTIAL: "credential",
  CREDENTIALS: "credentials",
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
  CREDENTIALS: `/${ENTITIES.CREDENTIALS}`,
  EXECUTIONS: `/${ENTITIES.EXECUTIONS}`,
  WORKFLOWS: `/${ENTITIES.WORKFLOWS}`,
} as const;

export const DYNAMIC_PATH_BUILDERS = {
  WORKFLOWS: {
    detailsView: (id: string) => `${STATIC_PATHS.WORKFLOWS}/${id}`,
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

export const NODE_COMPONENTS = {
  [NodeType.INITIAL]: InitialNode,
  [NodeType.HTTP_REQUEST]: HttpRequestNode,
  [NodeType.MANUAL_TRIGGER]: ManualTriggerNode,
} as const satisfies NodeTypes;

export type RegisteredNodeType = keyof typeof NODE_COMPONENTS;

/*
INNGEST values
*/
const PREFIX = "event";
const INNGEST_EVENT_EXECUTE_WORKFLOW = "workflows/execute.workflow";
const INNGEST_EVENT_MANUAL_TRIGGER = "triggers/manual.trigger";
const INNGEST_EVENT_HTTP_REQUEST = "http-request/http.request";

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
} as const;

export const INNGEST_CHANELS = {
  HTTP_REQUEST: "http-request-execution",
  MANUAL_TRIGGER: "manual-trigger-execution",
} as const;
