import { Prisma } from "@/generated/prisma/client";
import { AI_PROVIDERS, Settings } from "@/lib/constants";
import { encrypt } from "@/lib/crypto";
import prisma from "@/lib/db";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
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

    return user.settings;
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

      const validInput = Object.fromEntries(
        Object.entries(input).filter(([, value]) => value !== undefined)
      );

      const currentSettings = user.settings as Prisma.JsonObject;

      const updatedSettings = {
        ...currentSettings,
        ...validInput,
      };

      Object.values(AI_PROVIDERS).forEach((key) => {
        const provider = key as keyof Settings;
        if (currentSettings[provider] === updatedSettings[provider]) {
          return;
        }
        const unencrypted = String(updatedSettings[provider]);
        updatedSettings[provider] = unencrypted
          ? encrypt(unencrypted)
          : undefined;
      });

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
