import prisma from "@/lib/db";
import { createTRPCRouter, protectedProcedure } from "../init";
import { INNGEST_EVENT_NAMES } from "@/inngest/functions";
import { inngest } from "@/inngest/client";

export const appRouter = createTRPCRouter({
  testAI: protectedProcedure.mutation(async () => {
    await inngest.send({ name: INNGEST_EVENT_NAMES.EXECUTE.ID });
    return { success: true, message: "Job queued" };
  }),
  getWorkflows: protectedProcedure.query(({ ctx }) => {
    return prisma.workflow.findMany();
  }),
  createWorkflow: protectedProcedure.mutation(() => {
    return prisma.workflow.create({
      data: {
        name: "New Workflow",
      },
    });
  }),
});

export type AppRouter = typeof appRouter;
