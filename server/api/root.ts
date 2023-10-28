import { userRouter } from "@/server/api/routers/user";
import { formRouter } from "@/server/api/routers/form";

import { createTRPCRouter } from "@/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  form: formRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
