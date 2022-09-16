import { createRouter } from "../createRouter";
import { documentRouter } from "./document";

import superjson from "superjson";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("document.", documentRouter);

export type AppRouter = typeof appRouter;
