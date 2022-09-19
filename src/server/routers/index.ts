import { createRouter } from "../createRouter";
import { documentRouter } from "./document";

import superjson from "superjson";

export const appRouter = createRouter()
  .transformer(superjson)
  .query("healthcheck", {
    async resolve() {
      return "ok";
    },
  })
  .merge("document.", documentRouter);

export type AppRouter = typeof appRouter;
