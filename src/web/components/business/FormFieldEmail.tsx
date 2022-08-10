import FormField, { FormFieldProps } from "@/web/components/system/FormField"
import forwardRef from "@/web/forwardRef"

const FormFieldEmail = forwardRef<
  HTMLInputElement,
  Partial<FormFieldProps> & { name: string }
>("FormFieldEmail", (props, ref) => (
  <FormField
    label="E-mail"
    type="email"
    autoComplete="email"
    {...props}
    ref={ref}
  />
))

export default FormFieldEmail
