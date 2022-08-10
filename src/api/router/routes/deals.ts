import { createProtectedRouter } from "../createProtectedRouter";

export const dealsRouter = createProtectedRouter().query("getAllMyDeals", {
  resolve: async ({ ctx }) => {
    const {
      session: { user },
      prisma,
    } = ctx;

    const deals = await prisma.deals.findMany({
      where: {
        customerId: user.id,
      },
      include: {
        partnerInvitations: {
          select: {
            partners: {
              select: {
                users: {
                  select: {
                    companies: {
                      select: {
                        name: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    return deals;
  },
});
