type UnaryFunction = (arg: any) => any;
type LastFunction<T extends UnaryFunction[]> = T extends [
  ...rest: infer REST,
  last: infer LAST
]
  ? LAST
  : any;
type LastFunctionParameters<T extends UnaryFunction[]> = Parameters<
  LastFunction<T>
>[number];
type FirstFunctionReturnType<T extends UnaryFunction[]> = ReturnType<T[0]>;

const compose =
  <T extends UnaryFunction[]>(...fns: T) =>
  (arg: LastFunctionParameters<T>): FirstFunctionReturnType<T> =>
    fns.reduceRight((acc: unknown, fn: T[number]) => fn(acc), arg);

export default compose;
