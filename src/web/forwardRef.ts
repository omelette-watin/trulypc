import { forwardRef as fref, ForwardRefRenderFunction } from "react"

const forwardRef = <COMPONENT, PROPS>(
  displayName: string,
  Component: ForwardRefRenderFunction<COMPONENT, PROPS>,
) => {
  const NamedComponent = fref<COMPONENT, PROPS>(Component)

  NamedComponent.displayName = displayName

  return NamedComponent
}

export default forwardRef
