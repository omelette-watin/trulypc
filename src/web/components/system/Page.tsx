import cn from "@/web/cn";
import { UIProps } from "@/web/typed";
import Head from "next/head";
import { FC } from "react";

export interface PageProps {
  title: string;
}

const Page: FC<UIProps<PageProps>> = (props) => {
  const { children, title, ...otherProps } = props;

  return (
    <main {...otherProps} {...cn("grow", otherProps)}>
      <Head>
        <title>Tulyp - {title}</title>
        <meta charSet="utf-8" />
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      {children}
    </main>
  );
};

export default Page;
