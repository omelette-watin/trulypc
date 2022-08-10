import { inferQueryOutput } from "@/utils/trpc";
import { UIProps } from "@/web/typed";
import { useRouter } from "next/router";
import { HTMLProps, useCallback } from "react";

export type ArrayElement<A> = A extends readonly (infer T)[] ? T : never;

export type DealCardSmallProps = UIProps<
  {
    deal: ArrayElement<inferQueryOutput<"deals.getAllMyDeals">>;
    className?: string;
  },
  Omit<HTMLProps<HTMLDivElement>, "id">
>;

const DealCardBig = (props: DealCardSmallProps) => {
  const { deal, className } = props;
  const router = useRouter();
  const handleClick = useCallback(
    () => router.push(`/customer/deals/${deal.id}`),
    [router, deal.id]
  );

  return (
    <div
      className="flex flex-col items-left space-y-3 justify-between cursor-pointer border-neutral border-2 p-6 rounded-xl w-full"
      onClick={handleClick}
    >
      <div className="flex w-full flex-row items-center">
        <div className="w-full">
          <p className="text-2xl font-bold mr-1 truncate">
            {deal.partnerInvitations?.partners?.users.companies.name}
          </p>
          <div className="flex items-center">
            <p className="muted w-full">
              Created on {new Date(deal.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
      <div className="justify-between flex items-center">
        <div className="basis-1/3">
          <p className="muted font-bold">Total deal amount</p>
          <p className="font-bold text-2xl">
            {deal.amount.toLocaleString(undefined, {
              currency: deal.currencyCode,
              style: "currency",
            })}
          </p>
        </div>
        <div className="basis-1/3">
          <p className="muted font-bold">Escrowed amount</p>
          <p className="font-bold text-2xl">
            {deal.amount.toLocaleString(undefined, {
              currency: deal.currencyCode,
              style: "currency",
            })}
          </p>
        </div>
        <div className="basis-1/3">
          <p className="muted font-bold">Dispatch date</p>
          <p className="font-bold text-2xl">
            {deal.dispatchDate.toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DealCardBig;
