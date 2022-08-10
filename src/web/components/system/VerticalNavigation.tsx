import cn from "@/web/cn"
import Icon, { IconName } from "@/web/components/system/Icon"
import Link from "@/web/components/system/Link"
import Text from "@/web/components/system/Text"
import { UIProps } from "@/web/typed"
import { FC } from "react"

type Item = {
  href: string
  name: string
  icon: IconName
  active?: boolean
  strict?: boolean
}

type VerticalNavigationItemProps = UIProps<
  {
    item: NavItem
    currentPath: string
  },
  "a"
>

export type NavItem = Item | "BREAKER"

export const VerticalNavigationItem: FC<VerticalNavigationItemProps> = ({
  item,
  currentPath,
  ...otherProps
}) => {
  if (item === "BREAKER") {
    return <div className="my-2 border" />
  }

  const { href, name, icon, strict, active } = item
  const isActive =
    active || (strict ? currentPath === href : currentPath.startsWith(href))

  return (
    <Text as="li" size="lg" bold className="my-2">
      <Link
        href={href}
        key={name}
        noStyle
        {...cn(
          "flex rounded-md p-2",
          { "bg-gradient-primary text-white shadow-primary": isActive },
          otherProps,
        )}
        {...otherProps}
      >
        <Icon name={icon} />
        <span className="ml-3">{name}</span>
      </Link>
    </Text>
  )
}

const VerticalNavigation: FC<
  UIProps<
    {
      items: NavItem[]
      currentPath: string
    },
    "nav"
  >
> = (props) => {
  const { items, currentPath, ...otherProps } = props

  return (
    <nav {...otherProps}>
      <ul className="list-none">
        {items.map((item, index) => (
          <VerticalNavigationItem
            key={(item as Item)?.name || `${item}-${index}`}
            item={item}
            currentPath={currentPath}
          />
        ))}
      </ul>
    </nav>
  )
}

export default VerticalNavigation
