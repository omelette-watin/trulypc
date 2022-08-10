import FormField, { FormFieldProps } from "@/web/components/system/FormField"
import forwardRef from "@/web/forwardRef"
import { FieldInputProps, FieldProps } from "formik"
import { ChangeEventHandler, FormEvent, useCallback } from "react"

const FormFieldFiles = forwardRef<
  HTMLInputElement,
  Partial<FormFieldProps> & { name: string }
>("FormFieldFiles", (props, ref) => {
  const { name, ...otherProps } = props
  const override = useCallback(
    (
      field: FieldProps["field"],
      form?: FieldProps["form"],
    ): FieldInputProps<string> => ({
      ...field,
      value: "",
      onChange: (
        event: FormEvent<HTMLInputElement>,
      ): ReturnType<ChangeEventHandler> => {
        form?.setFieldValue(name, (event.target as HTMLInputElement).files)
      },
    }),
    [name],
  )

  return (
    <FormField
      type="file"
      name={name}
      override={override}
      {...otherProps}
      ref={ref}
    />
  )
})

export default FormFieldFiles
