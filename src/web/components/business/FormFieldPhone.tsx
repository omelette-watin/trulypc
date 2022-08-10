import FormField, { FormFieldProps } from "@/web/components/system/FormField"
import forwardRef from "@/web/forwardRef"

const FormFieldPhone = forwardRef<
  HTMLInputElement,
  Partial<FormFieldProps> & { name: string }
>("FormFieldPhone", (props, ref) => (
  <FormField
    label="Phone number"
    type="tel"
    placeholder="Type international format phone number"
    autoComplete="new-tel"
    {...props}
    ref={ref}
  />
))

export default FormFieldPhone
