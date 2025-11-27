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
