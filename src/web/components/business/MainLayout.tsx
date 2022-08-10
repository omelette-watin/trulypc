import cn from "@/web/cn";
import TulypLogo from "@/web/components/business/TulypLogo";
import Avatar from "@/web/components/system/Avatar";
import Icon from "@/web/components/system/Icon";
import Link from "@/web/components/system/Link";
import Page, { PageProps } from "@/web/components/system/Page";
import Text from "@/web/components/system/Text";
import VerticalNavigation, {
  NavItem,
} from "@/web/components/system/VerticalNavigation";
import { UIProps } from "@/web/typed";
import { Menu } from "@headlessui/react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FC } from "react";

const navItems: NavItem[] = [
  {
    href: "/",
    icon: "HomeIcon",
    name: "Home",
    strict: true,
  },
  {
    href: "/customer/deals",
    icon: "ClipboardCheckIcon",
    name: "Deals",
  },
  {
    href: "/customer/partners-invitations",
    icon: "BookOpenIcon",
    name: "Partners",
  },
  "BREAKER",
  {
    href: "/settings",
    icon: "CogIcon",
    name: "Settings",
  },
];
const MainLayout: FC<UIProps<PageProps>> = (props) => {
  const { children, ...otherProps } = props;
  const { asPath } = useRouter();
  const { data: session } = useSession();

  return (
    <Page {...otherProps} {...cn("flex h-full min-h-fit", otherProps)}>
      <aside className="bg-neutral fixed flex h-full w-64 flex-col p-5">
        <header className="flex items-center justify-between py-4 ">
          <Link noStyle href="/">
            <TulypLogo />
          </Link>
        </header>
        <VerticalNavigation items={navItems} currentPath={asPath} />
        <Menu>
          <Menu.Button className="mt-auto flex items-center justify-between gap-2">
            <Avatar>
              {session?.user &&
                `${session?.user?.firstName[0]}
                ${session?.user?.lastName[1]}`}
            </Avatar>
            <span className="flex flex-col overflow-hidden text-left">
              <Text as="span" bold size="md" truncate>
                {session?.user?.firstName} {session?.user?.lastName}
              </Text>
              <Text as="span" className="muted" size="sm" truncate>
                {session?.user?.email}
              </Text>
            </span>
            <Icon name="SelectorIcon" className="muted" />
          </Menu.Button>
          <Menu.Items>
            <Menu.Item>
              <button className="w-full">
                <Link href="/settings/my-account">
                  <Text
                    as="span"
                    size="lg"
                    bold
                    className="my-2 flex gap-3 rounded-md p-2"
                  >
                    <Icon name="AdjustmentsIcon" />
                    Settings
                  </Text>
                </Link>
              </button>
            </Menu.Item>
            <Menu.Item>
              <button
                className="my-2 flex w-full gap-3 rounded-md p-2"
                onClick={() => signOut({ callbackUrl: "/sign-in" })}
              >
                <Icon name="LogoutIcon" />
                <Text as="span" size="lg" bold>
                  Logout
                </Text>
              </button>
            </Menu.Item>
          </Menu.Items>
        </Menu>
      </aside>
      <section className="ml-64 grow px-14 py-10">{children}</section>
    </Page>
  );
};

export default MainLayout;
