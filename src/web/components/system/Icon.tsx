import cn from "@/web/cn"
import { UIProps } from "@/web/typed"
import * as HeroIcons from "@heroicons/react/outline"
import { FC } from "react"

export type IconName = keyof typeof HeroIcons

const Icon: FC<UIProps<{ name: IconName }, SVGSVGElement>> = (props) => {
  const { name, ...otherProps } = props
  const HeroIcon = HeroIcons[name as IconName]

  return <HeroIcon {...otherProps} {...cn("w-6", otherProps)} />
}

export default Icon
