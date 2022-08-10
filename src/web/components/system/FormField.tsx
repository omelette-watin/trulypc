import cn from "@/web/cn";
import FormFieldError from "@/web/components/system/FormFieldError";
import Input, { InputProps } from "@/web/components/system/Input";
import forwardRef from "@/web/forwardRef";
import { Field, FieldInputProps, FieldProps } from "formik";

export interface FormFieldProps extends InputProps {
  name: string;
  label?: string;
  override?: (
    field: FieldProps["field"],
    form?: FieldProps["form"]
  ) => FieldInputProps<string | number | readonly string[] | undefined>;
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  "FormField",
  (props, ref) => {
    const {
      label,
      name,
      type,
      className,
      placeholder,
      override,
      ...otherProps
    } = props;

    return (
      <Field name={name}>
        {({ field, form, meta: { error, touched } }: FieldProps) => (
          <label {...cn("flex flex-col gap-2 grow", className, otherProps)}>
            <span className="text-sm font-bold text-gray-800 pl-2">
              {label}
            </span>
            <Input
              type={type}
              placeholder={placeholder || label}
              {...otherProps}
              {...(override?.(field, form) || field)}
              {...cn(
                {
                  "hover:shadow-danger focus:shadow-danger hover:border-neutral focus:border-neutral border-danger":
                    error && touched,
                },
                {}
              )}
              ref={ref}
            />
            {error && touched ? <FormFieldError>{error}</FormFieldError> : null}
          </label>
        )}
      </Field>
    );
  }
);

export default FormField;
