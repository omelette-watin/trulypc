import cn from "@/web/cn";
import TulypLogo from "@/web/components/business/TulypLogo";
import Page, { PageProps } from "@/web/components/system/Page";
import { UIProps } from "@/web/typed";
import { FC } from "react";

const SmallLayout: FC<UIProps<PageProps & { withLogo?: boolean }>> = ({
  withLogo,
  children,
  ...otherProps
}) => (
  <Page {...otherProps} {...cn("flex flex-col justify-center", otherProps)}>
    {withLogo ? <TulypLogo withBrand /> : null}
    <div className="border-neutral mx-auto mt-12 flex w-[460px] flex-col justify-center rounded-2xl border-2 p-10">
      {children}
    </div>
  </Page>
);

export default SmallLayout;
