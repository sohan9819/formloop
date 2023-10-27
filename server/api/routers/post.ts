import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  // publicProcedure,
} from "@/server/api/trpc";

export const postRouter = createTRPCRouter({
  hello: protectedProcedure
    .input(z.object({ text: z.string() }))
    .query(({ ctx, input }) => {
      return {
        greeting: `From ${ctx.session?.firstName} ${ctx.session?.lastName}:  ${input.text}`,
      };
    }),
});
