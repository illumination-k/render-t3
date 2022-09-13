import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

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
