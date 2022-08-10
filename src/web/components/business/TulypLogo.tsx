import cn from "@/web/cn"
import { UIProps } from "@/web/typed"
import Image from "next/image"
import { FC } from "react"

const TulypLogo: FC<UIProps<{ withBrand?: boolean }, "span">> = ({
  withBrand,
  ...otherProps
}) => (
  <span
    {...otherProps}
    {...cn("flex justify-center items-center gap-3", otherProps)}
  >
    <Image src="/images/logo.svg" width={35} height={35} alt="Tulyp Logo" />
    {withBrand ? (
      <span className="-mb-3.5">
        <Image
          src="/images/brand.svg"
          width={121}
          height={35}
          alt="Tulyp Logo"
        />
      </span>
    ) : null}
  </span>
)

export default TulypLogo
