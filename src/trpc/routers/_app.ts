import { settingsRouter } from "@/features/settings/server/router";
import { workflowsRouter } from "@/features/workflows/server/router";
import { createTRPCRouter } from "../init";

export const appRouter = createTRPCRouter({
  workflows: workflowsRouter,
  settings: settingsRouter,
});

export type AppRouter = typeof appRouter;
