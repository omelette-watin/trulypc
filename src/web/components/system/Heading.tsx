import cn from "@/web/cn"
import { UIProps } from "@/web/typed"

import { FC } from "react"

const sizes = {
  xs: "heading-xs",
  sm: "heading-sm",
  md: "heading-md",
  lg: "heading-lg",
  xl: "heading-xl",
  "2xl": "heading-2xl",
}

const Heading: FC<
  UIProps<
    {
      as?: FC<unknown> | string
      size?: keyof typeof sizes
      level?: number
    },
    "div"
  >
> = (props) => {
  const { as: Component = "div", size = "2xl", level, ...otherProps } = props

  return (
    <Component
      role="heading"
      aria-level={level}
      {...otherProps}
      {...cn("leading-normal font-bold", sizes[size], otherProps)}
    />
  )
}

export default Heading
