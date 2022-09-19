import { nextAuthOptions, unstable_getServerUserSession } from "@/libs/auth";
import * as trpc from "@trpc/server";
import { TRPCError } from "@trpc/server";
import { Context } from "./context";

/**
 * Helper function to create a router with context
 */
export function createRouter() {
  return trpc.router<Context>();
}

export function createProtectedRouter() {
  return trpc.router<Context>().middleware(async ({ ctx, next }) => {
    const { req, res } = ctx;
    console.log(req.query);

    const session = await unstable_getServerUserSession(req, res, nextAuthOptions);

    if (!session) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    if (!session.userId) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", cause: "User ID dose not set in session" });
    }

    console.log(req.body);
    delete req.query.batch;

    return next({
      ctx: { ...ctx, session: session },
    });
  });
}
