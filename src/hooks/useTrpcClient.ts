import type { AppRouter } from "@/server/routers";
import { createTRPCClient } from "@trpc/client";
import { useMemo } from "react";
import superjson from "superjson";

export default function useTrpcClient() {
  const client = useMemo(() => {
    return createTRPCClient<AppRouter>({
      url: "/api/trpc",
      transformer: superjson,
    });
  }, []);

  return client;
}
