import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export type ProtectedPageProps = {
  redirectUrl?: string;
} & React.PropsWithChildren;

const ProtectedPage = ({ redirectUrl = "/", children }: ProtectedPageProps) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (!(session || status === "loading")) {
      router.push(redirectUrl);
    }
  }, [router, redirectUrl, session, status]);

  if (status === "loading") {
    return <>Loading...</>;
  }

  if (!session) {
    return <>Redirecting...</>;
  }

  return <>{children}</>;
};

export default ProtectedPage;
