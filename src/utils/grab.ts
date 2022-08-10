const grab = <RETURN = unknown>(
  obj: Record<string, unknown>,
  path: string[] | null,
  _trail = path
): RETURN => {
  if (
    !path ||
    !path.length ||
    obj === null ||
    obj === undefined ||
    typeof obj !== "object"
  ) {
    return obj as RETURN;
  }

  const value = obj[path[0]];

  if (path.length === 1) {
    return value as RETURN;
  }

  if (obj === null || obj === undefined || typeof obj !== "object") {
    throw new Error(`Unknown path: ${_trail}`);
  }

  return grab(value as typeof obj, path.slice(1), _trail);
};

export default grab;
