import FormField, { FormFieldProps } from "@/web/components/system/FormField"
import forwardRef from "@/web/forwardRef"

type Props = Partial<FormFieldProps> & { name: string }

const FormFieldPassword = forwardRef<HTMLInputElement, Props>(
  "FormFieldPassword",
  (props, ref) => (
    <FormField
      label="Password"
      type="password"
      placeholder="Enter your password"
      {...props}
      ref={ref}
    />
  ),
)

export default FormFieldPassword
