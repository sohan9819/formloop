import { z } from "zod";

import { protectedProcedure, createTRPCRouter } from "@/server/api/trpc";

export const formRouter = createTRPCRouter({
  getFormStats: protectedProcedure.query(async ({ ctx }) => {
    const stats = await ctx.db.form.aggregate({
      where: {
        userld: ctx.session?.id,
      },
      _sum: {
        visits: true,
        submissions: true,
      },
    });

    const visits = stats._sum.visits ?? 0;
    const submissions = stats._sum.submissions ?? 0;
    const submissionRate = visits > 0 ? (submissions / visits) * 100 : 0;
    const bounceRate = 100 - submissionRate;

    return {
      visits,
      submissions,
      submissionRate,
      bounceRate,
    };
  }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(3),
        description: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.form.create({
        data: {
          userld: ctx.session!.id,
          name: input.name,
          description: input.description,
        },
      });
    }),
  getForms: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.form.findMany({
      where: {
        userld: ctx.session!.id,
      },
    });
  }),
});