import cn from "@/web/cn"
import { UIProps } from "@/web/typed"
import { FC } from "react"

const Avatar: FC<
  UIProps<
    {
      gradient?: [
        degree: number,
        startColor: [number, number, number],
        endColor: [number, number, number],
      ]
    },
    "span"
  >
> = (props) => {
  const { children, gradient, ...otherProps } = props

  return (
    <span
      {...otherProps}
      {...cn(
        "border-neutral text-md rounded-lg border-4 font-bold uppercase text-white",
        { "bg-gradient-primary": !gradient },
        otherProps,
      )}
      style={
        gradient
          ? {
              backgroundImage: `linear-gradient(${
                gradient[0]
              }deg, rgb(${gradient[1].join(",")}) 0%, rgb(${gradient[2].join(
                ",",
              )}) 100%)`,
            }
          : undefined
      }
    >
      <span className="flex h-10  w-10 items-center justify-center">
        {children}
      </span>
    </span>
  )
}

export default Avatar
