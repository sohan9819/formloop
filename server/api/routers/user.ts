import { z } from "zod";

import {
  publicProcedure,
  protectedProcedure,
  createTRPCRouter,
} from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        id: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        image: z.string().url(),
        email: z.string().email(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, firstName, lastName, email, image } = input;
      return await ctx.db.user.create({
        data: {
          id,
          firstName,
          lastName,
          email,
          image,
        },
      });
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        image: z.string().url().optional(),
        email: z.string().email().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (Object.keys(input).length > 0) {
        return await ctx.db.user.update({
          where: {
            id: input.id,
          },
          data: input,
          include: {
            Form: true,
          },
        });
      }
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.user.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
