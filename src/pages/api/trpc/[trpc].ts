// src/pages/api/trpc/[trpc].ts
import { createNextApiHandler } from "@trpc/server/adapters/next";
import { appRouter } from "@/api/router";
import { createContext } from "@/api/router/context";

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: createContext,
});
