import cn from "@/web/cn"
import forwardRef from "@/web/forwardRef"
import { UIProps } from "@/web/typed"

export type InputProps = UIProps<unknown, "input">

const Input = forwardRef<HTMLInputElement, InputProps>(
  "Input",
  (props, ref) => (
    <input
      {...props}
      {...cn(
        "hover:shadow-focus focus:shadow-focus hover:border-focus focus:border-focus rounded-lg border border-gray-300 bg-white p-3 text-gray-800 outline-none",
        props,
      )}
      ref={ref}
    />
  ),
)

export default Input
