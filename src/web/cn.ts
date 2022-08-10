import classnames, { Argument } from "classnames"

const cn = (...args: Argument[]) => {
  const [props] = args.slice(-1) as [{ className?: string }]

  return { className: classnames(...args.slice(0, -1), props?.className) }
}

export const classNames = classnames

export default cn
