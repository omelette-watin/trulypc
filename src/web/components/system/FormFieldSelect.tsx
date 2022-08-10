import cn from "@/web/cn";
import FormFieldError from "@/web/components/system/FormFieldError";
import Icon from "@/web/components/system/Icon";
import { Listbox } from "@headlessui/react";
import { Field, FieldProps } from "formik";
import { ComponentPropsWithoutRef, useCallback } from "react";

export interface FormFieldSelectProps
  extends ComponentPropsWithoutRef<"select"> {
  name: string;
  className?: string;
  label: string;
  disabled?: boolean;
  options: [string, string?][];
}

const FormFieldSelect = (props: FormFieldSelectProps) => {
  const {
    label,
    name,
    placeholder,
    disabled = false,
    options,
    ...otherProps
  } = props;
  const handleChange = useCallback(
    (
        onChange: (
          field: string,
          value: any,
          shouldValidate?: boolean | undefined
        ) => void
      ) =>
      (value: string) => {
        onChange(name, value);
      },
    []
  );

  return (
    <Field name={name}>
      {({
        field,
        form: { setFieldValue },
        meta: { error, touched },
      }: FieldProps) => (
        <div {...cn("text-form-label", otherProps)}>
          <label>{label}</label>
          <Listbox
            as="div"
            className="text-form-value text-form-value relative mt-2 mb-5 rounded-lg border-gray-200 bg-white outline-none disabled:bg-gray-100"
            placeholder={placeholder}
            disabled={disabled}
            {...field}
            onChange={handleChange(setFieldValue)}
          >
            <Listbox.Button className="hover:input-hover-active  disabled:hover:input-disabled focus:input-hover-active relative min-w-full rounded-lg border-2 p-3 text-left font-bold outline-none">
              <span className="block truncate">
                {options.find(([v]) => v === field.value)?.[0] ||
                  "Select a partner"}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <Icon
                  name="SelectorIcon"
                  className="text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Listbox.Options className="input absolute top-full left-0 mt-2 max-h-60 w-full overflow-auto rounded-lg border-2 border-gray-200 bg-white outline-none disabled:bg-gray-100">
              {options.length > 0 &&
                options.map(([value, label]) => (
                  <Listbox.Option
                    key={value}
                    value={value}
                    {...cn({
                      "cursor-pointer p-3 hover:bg-gray-100 outline-none": true,
                      "font-bold": value === field.value,
                    })}
                  >
                    {label || value}
                  </Listbox.Option>
                ))}
            </Listbox.Options>
            {error && touched ? <FormFieldError>{error}</FormFieldError> : null}
          </Listbox>
        </div>
      )}
    </Field>
  );
};

export default FormFieldSelect;
