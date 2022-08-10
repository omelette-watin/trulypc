import cn from "@/web/cn"
import Banner from "@/web/components/system/Banner"
import { UIProps } from "@/web/typed"
import { FC } from "react"

const FormErrorMessages: FC<UIProps<{ errors: string[] | null }, "div">> = ({
  errors,
  ...otherProps
}) =>
  errors ? (
    <>
      {errors.map((error) => (
        <Banner key={error} variant="danger" {...cn(otherProps)}>
          {error}
        </Banner>
      ))}
    </>
  ) : null

export default FormErrorMessages
