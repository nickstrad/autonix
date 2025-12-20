import { PAGINATION } from "@/lib/constants";
import prisma from "@/lib/db";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { z } from "zod";
import { ExecutionStatus } from "@/generated/prisma/browser";
import { Prisma } from "@/generated/prisma/browser";

export const executionsRouter = createTRPCRouter({
  getMany: protectedProcedure
    .input(
      z.object({
        page: z.number().default(PAGINATION.DEFAULT_PAGE),
        pageSize: z
          .number()
          .min(PAGINATION.MIN_PAGE_SIZE)
          .max(PAGINATION.MAX_PAGE_SIZE)
          .default(PAGINATION.DEFAULT_PAGE_SIZE),
        status: z.string().default(""),
        sortBy: z.string().default("createdAt"),
        sortOrder: z.enum(["asc", "desc"]).default("desc"),
        workflowId: z.string().default(""),
      })
    )
    .query(async ({ ctx, input }) => {
      const { page, pageSize, status, sortBy, sortOrder, workflowId } = input;
      const where: Prisma.ExecutionWhereInput = {
        userId: ctx.auth.user.id,
      };

      if (
        status &&
        Object.values(ExecutionStatus).includes(status as ExecutionStatus)
      ) {
        where.status = status as ExecutionStatus;
      }

      if (workflowId) {
        where.workflowId = workflowId;
      }

      const orderBy =
        sortBy === "workflow.name"
          ? { workflow: { name: sortOrder } }
          : { [sortBy]: sortOrder };

      const [items, totalCount] = await Promise.all([
        prisma.execution.findMany({
          where,
          include: {
            workflow: {
              select: {
                name: true,
              },
            },
          },
          orderBy,
          skip: (page - 1) * pageSize,
          take: pageSize,
        }),
        prisma.execution.count({
          where,
        }),
      ]);

      const totalPages = Math.ceil(totalCount / pageSize);
      const hasNextPage = page < totalPages;
      const hasPreviousPage = page > 1;

      return {
        items,
        page,
        pageSize,
        totalCount,
        totalPages,
        hasNextPage,
        hasPreviousPage,
      };
    }),
  getOne: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const execution = await prisma.execution.findUniqueOrThrow({
        where: {
          userId: ctx.auth.user.id,
          id: input.id,
        },
        include: {
          workflow: true,
        },
      });

      return execution;
    }),
});
