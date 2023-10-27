// import { z } from "zod";

import {
  // publicProcedure,
  protectedProcedure,
  createTRPCRouter,
} from "@/server/api/trpc";
// import { TRPCError } from "@trpc/server";

export const formRouter = createTRPCRouter({
  getFormStats: protectedProcedure.query(async ({ ctx }) => {
    // if (input.userId !== ctx.session?.id) {
    //   throw new TRPCError({
    //     code: "NOT_FOUND",
    //     message: "User Not Found",
    //   });
    // }

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
});
