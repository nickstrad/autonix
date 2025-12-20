import { Prisma } from "@/generated/prisma";
import { AI_PROVIDERS } from "@/lib/constants";
import prisma from "@/lib/db";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import {
  decryptProviderKeys,
  encryptProviderKeyUpdates,
} from "@/features/settings/lib/settings-crypto-helpers";
import z from "zod";

export const settingsRouter = createTRPCRouter({
  get: protectedProcedure.query(async ({ ctx }) => {
    const user = await prisma.user.findUnique({
      where: { id: ctx.auth.user.id },
      select: {
        settings: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const settings = user.settings as Prisma.JsonObject;
    return decryptProviderKeys(settings);
  }),
  update: protectedProcedure
    .input(
      z.object({
        [AI_PROVIDERS.GEMINI]: z.string().optional(),
        [AI_PROVIDERS.ANTHROPIC]: z.string().optional(),
        [AI_PROVIDERS.OPENAI]: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await prisma.user.findUnique({
        where: { id: ctx.auth.user.id },
      });

      if (!user) {
        throw new Error("User not found");
      }

      const currentSettings = user.settings as Prisma.JsonObject;
      const updatedSettings = encryptProviderKeyUpdates(currentSettings, input);

      return await prisma.user.update({
        where: {
          id: ctx.auth.user.id,
        },
        data: {
          settings: updatedSettings,
        },
      });
    }),
});
