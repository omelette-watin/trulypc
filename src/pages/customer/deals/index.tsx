import type { NextPage } from "next";

import { requireAuth } from "@/common/requireAuth";
import MainLayout from "@/web/components/business/MainLayout";
import Heading from "@/web/components/system/Heading";
import { trpc } from "@/utils/trpc";
import Loading from "@/web/components/system/Loading";
import FormErrorMessages from "@/web/components/system/FormErrorMessages";
import Button from "@/web/components/system/Button";
import DealCardBig from "@/web/components/business/DealCardBig";

const DealsPage: NextPage = () => {
  const { data, isLoading, error } = trpc.useQuery(["deals.getAllMyDeals"]);

  return (
    <MainLayout title="Dashboard">
      <div className="flex justify-between items-center mb-6">
        <Heading size="xl">Deals</Heading>
        <Button icon="PlusIcon">Create new deal</Button>
      </div>
      {isLoading && <Loading />}
      {error && <FormErrorMessages errors={[error.message]} />}
      <div className="flex flex-wrap gap-6">
        {data && data.map((deal) => <DealCardBig deal={deal} key={deal.id} />)}
      </div>
    </MainLayout>
  );
};

export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} };
});

export default DealsPage;
