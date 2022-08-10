import cn from "@/web/cn"
import Icon, { IconName } from "@/web/components/system/Icon"
import Link from "@/web/components/system/Link"
import { UIProps } from "@/web/typed"
import { FC } from "react"

const variants = {
  primary:
    "text-white bg-gradient-primary shadow-primary focus:ring-primary hover:bg-gradient-secondary",
  secondary:
    "text-secondary bg-secondary border border-input focus:ring-secondary",
  link: "text-pink-600",
}
const buttonSizes = {
  xs: "text-sm",
  sm: "px-6 py-3 text-sm font-semibold",
  md: "px-7 py-4 text-base font-semibold",
  lg: "text-base",
}
const iconMargins = {
  lg: {
    left: "-ml-1 mr-3 w-5",
    right: "ml-3 -mr-1 w-5",
  },
  md: {
    left: "-ml-1 mr-2 w-5",
    right: "ml-2 -mr-1 w-5",
  },
  sm: {
    left: "-ml-1 mr-2 w-5",
    right: "ml-2 -mr-1 w-5",
  },
  xs: {
    left: "-ml-1 mr-2 w-5",
    right: "ml-2 -mr-1 w-5",
  },
}

type LinkButtonProps = UIProps<
  {
    href: string
    variant?: keyof typeof variants
    size?: "xs" | "sm" | "md" | "lg"
    icon?: IconName
    iconPosition?: "left" | "right"
    full?: boolean
  },
  "a"
>

const LinkButton: FC<LinkButtonProps> = (props) => {
  const {
    variant = "primary",
    size = "md",
    iconPosition = "left",
    icon,
    children,
    full,
    ...otherProps
  } = props
  const iconMarginClassName = children ? iconMargins[size][iconPosition] : ""

  return (
    <Link
      noStyle
      {...otherProps}
      {...cn(
        "mx-auto rounded-lg font-semibold flex justify-center items-center disabled:opacity-50",
        { "w-full": full },
        variants[variant],
        buttonSizes[size],
        otherProps,
      )}
    >
      {!icon ? null : iconPosition === "right" ? null : (
        <Icon name={icon} className={iconMarginClassName} />
      )}
      {children}
      {!icon ? null : iconPosition === "left" ? null : (
        <Icon name={icon} className={iconMarginClassName} />
      )}
    </Link>
  )
}

export default LinkButton
