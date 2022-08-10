import cn from "@/web/cn"
import Icon, { IconName } from "@/web/components/system/Icon"
import Text from "@/web/components/system/Text"
import { UIProps } from "@/web/typed"
import { FC } from "react"

const variants: Record<
  "danger" | "warn" | "info" | "success",
  { icon: IconName; style: string }
> = {
  danger: { icon: "ExclamationCircleIcon", style: "text-danger bg-danger" },
  warn: { icon: "ExclamationCircleIcon", style: "text-warn bg-warn" },
  info: { icon: "ExclamationCircleIcon", style: "text-info bg-info" },
  success: { icon: "ExclamationCircleIcon", style: "text-success bg-success" },
}

const Banner: FC<
  UIProps<{ as?: FC | string; variant: keyof typeof variants }>
> = (props) => {
  const { as: Component = "div", children, variant, ...otherProps } = props

  return (
    <Text
      as={Component}
      size="md"
      bold
      {...cn(
        "flex items-center p-2 rounded-lg",
        variants[variant].style,
        otherProps,
      )}
    >
      <Icon name={variants[variant].icon} className="mr-1.5" />
      {children}
    </Text>
  )
}

export default Banner
