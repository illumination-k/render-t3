import { nextAuthOptions } from "@/libs/auth";
import * as trpc from "@trpc/server";
import { TRPCError } from "@trpc/server";
import { unstable_getServerSession } from "next-auth";
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

    const session = await unstable_getServerSession(req, res, nextAuthOptions);

    if (!session) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    return next();
  });
}
