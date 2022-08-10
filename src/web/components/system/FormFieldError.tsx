import cn from "@/web/cn";
import { UIProps } from "@/web/typed";
import { FC } from "react";

const FormFieldError: FC<UIProps<unknown, "span">> = (props) => {
  const { children, ...otherProps } = props;

  return (
    <span {...cn("text-danger text-xs pl-2", otherProps)}>{children}</span>
  );
};

export default FormFieldError;
