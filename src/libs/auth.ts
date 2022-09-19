import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions, Session, unstable_getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import env from "@/env";
import { prisma } from "@/server/prisma";

export interface UserSession extends Session {
  userId: string;
}

/**
 * wraper function of `unstable_getServerSession` in next-auth
 * @param args: see `unstable_getServerSession`
 * @returns `UserSession`
 */
export async function unstable_getServerUserSession(
  ...args: Parameters<typeof unstable_getServerSession>
): Promise<UserSession> {
  return await unstable_getServerSession(...args) as UserSession;
}

export const nextAuthOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      session.userId = user.id;
      return session as UserSession;
    },
  },
};
