const removeEmptyVals = (obj: Object) => {
  // obj => iterable => obj
  const map = new Map(Object.entries(obj));
  map.forEach((value, key) => {
    if (!value) map.delete(key);
  });

  return Object.fromEntries(map);
};

export { removeEmptyVals };
