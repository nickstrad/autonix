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
