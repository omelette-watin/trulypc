import cn from "@/web/cn"
import { UIProps } from "@/web/typed"
import NextLink, { LinkProps as NextLinkProps } from "next/link"
import { FC } from "react"
import { Url } from "url"

const Link: FC<
  UIProps<
    NextLinkProps & {
      asUrl?: Url
      noStyle?: boolean
    },
    "a"
  >
> = (props) => {
  const { href, asUrl, children, noStyle, passHref, ...otherProps } = props

  return (
    <NextLink as={asUrl} passHref={passHref} href={href}>
      <a
        {...otherProps}
        {...cn(
          {
            "text-link hover:text-link-hover active:text-link-active cursor-pointer":
              !noStyle,
          },
          otherProps,
        )}
      >
        {children}
      </a>
    </NextLink>
  )
}

export default Link
