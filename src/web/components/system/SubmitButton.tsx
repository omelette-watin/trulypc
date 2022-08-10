import cn from "@/web/cn"
import Button from "@/web/components/system/Button"
import forwardRef from "@/web/forwardRef"
import { PropsOf } from "@headlessui/react/dist/types"
import { useFormikContext } from "formik"
import { useCallback } from "react"

const SubmitButton = forwardRef<
  HTMLButtonElement,
  PropsOf<typeof Button> & { noMargin?: boolean }
>("SubmitButton", (props, ref) => {
  const { noMargin, ...otherProps } = props
  const { submitForm, isValid, isSubmitting } = useFormikContext()
  const handleClick = useCallback(submitForm, [submitForm])

  return (
    <Button
      onClick={handleClick}
      disabled={isSubmitting || !isValid}
      {...otherProps}
      {...cn({ "mt-4": !noMargin }, otherProps)}
      ref={ref}
    />
  )
})

export default SubmitButton
