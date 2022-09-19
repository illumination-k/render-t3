import "../styles/globals.css";
import type { AppRouter } from "@/server/routers";
import { withTRPC } from "@trpc/next";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import superjson from "superjson";

interface SessionAppProps extends AppProps {
  pageProps: {
    session: Session;
  };
}

function MyApp({ Component, pageProps }: SessionAppProps) {
  const { session, ...rest } = pageProps;
  return (
    <SessionProvider session={session}>
      <Component {...rest} />
    </SessionProvider>
  );
}

export default MyApp;
