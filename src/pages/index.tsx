import type { NextPage } from "next";
import { useSession, signOut } from "next-auth/react";

import { requireAuth } from "@/common/requireAuth";
import MainLayout from "@/web/components/business/MainLayout";
import Heading from "@/web/components/system/Heading";

const Dashboard: NextPage = () => {
  const { data } = useSession();

  return (
    <MainLayout title="Dashboard">
      <Heading size="xl">Hello {data?.user?.firstName},</Heading>
    </MainLayout>
  );
};

export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} };
});

export default Dashboard;
