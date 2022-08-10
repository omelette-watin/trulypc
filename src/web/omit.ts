const omit = <T>(
  obj: T,
  key: keyof typeof obj
): Omit<typeof obj, typeof key> => {
  const { [key]: _, ...rest } = obj;

  return rest;
};

export default omit;
