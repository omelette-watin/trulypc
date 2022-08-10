import cn from "@/web/cn"
import { UIProps } from "@/web/typed"
import { FC } from "react"

const Row: FC<UIProps<{ as?: FC | string }>> = (props) => {
  const { as: Component = "div", ...otherProps } = props

  return (
    <Component {...otherProps} {...cn("flex flex-wrap gap-6", otherProps)} />
  )
}

export default Row
