import * as trpc from "@trpc/server";
import { createRouter } from "./context";

/**
 * Creates a tRPC router that asserts all queries and mutations are from an admin. Will throw an unauthorized error if a user is not an admin.
 */
export const createAdminRouter = () => {
  return createRouter().middleware(({ ctx, next }) => {
    if (
      !ctx.session ||
      !ctx.session.user ||
      ctx.session.user.role !== "ADMIN"
    ) {
      throw new trpc.TRPCError({ code: "UNAUTHORIZED" });
    }
    return next({
      ctx: {
        ...ctx,
        session: { ...ctx.session, user: ctx.session.user },
      },
    });
  });
};
