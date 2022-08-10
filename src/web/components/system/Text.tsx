import cn from "@/web/cn"
import { UIProps } from "@/web/typed"

import { FC } from "react"

const sizes = {
  sm: "text-xs leading-5",
  md: "text-sm",
  lg: "text-base",
}

const bolds = {
  sm: "font-semibold",
  md: "font-semibold",
  lg: "font-bold",
}

const Text: FC<
  UIProps<
    {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      as: FC<any> | string
      bold?: boolean
      size: keyof typeof sizes
      truncate?: boolean
    },
    "div"
  >
> = (props) => {
  const { as: Component, bold = false, size, truncate, ...otherProps } = props

  return (
    <Component
      {...otherProps}
      {...cn(
        {
          [bolds[size]]: bold,
          truncate: truncate,
        },
        sizes[size],
        otherProps,
      )}
    />
  )
}

export default Text
