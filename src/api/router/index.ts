import superjson from "superjson";

import { createRouter } from "./context";
import { dealsRouter } from "./routes/deals";
import { demoRouter } from "./routes/demo";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("demo.", demoRouter)
  .merge("deals.", dealsRouter);

export type AppRouter = typeof appRouter;
