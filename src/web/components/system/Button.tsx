import cn from "@/web/cn"
import Icon, { IconName } from "@/web/components/system/Icon"
import forwardRef from "@/web/forwardRef"
import { UIProps } from "@/web/typed"

const variants = {
  primary:
    "text-white bg-gradient-primary shadow-primary focus:ring-primary hover:bg-gradient-secondary",
  secondary:
    "text-secondary bg-secondary border border-input focus:ring-secondary",
}
const buttonSizes = {
  xs: "text-sm",
  sm: "px-6 py-3 text-sm font-semi-bold",
  md: "px-6 py-3 text-base font-semibold",
  lg: "px-7 py-4 text-base font-semibold",
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

type ButtonProps = UIProps<
  {
    variant?: keyof typeof variants
    size?: "xs" | "sm" | "md" | "lg"
    icon?: IconName
    iconPosition?: "left" | "right"
    full?: boolean
  },
  "button"
>

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  "Button",
  (props, ref) => {
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
      <button
        {...otherProps}
        {...cn(
          "rounded-lg font-semibold flex justify-center items-center disabled:opacity-50",
          { "w-full": full },
          variants[variant],
          buttonSizes[size],
          otherProps,
        )}
        ref={ref}
      >
        {!icon ? null : iconPosition === "right" ? null : (
          <Icon name={icon} className={iconMarginClassName} />
        )}
        {children}
        {!icon ? null : iconPosition === "left" ? null : (
          <Icon name={icon} className={iconMarginClassName} />
        )}
      </button>
    )
  },
)

export default Button
