export function splitArray<T>(
  array: T[],
  firstPageSize = 22,
  restPageSize = 32
) {
  if (array.length === 0) {
    return [];
  }

  const divisions: { items: T[] }[] = [];
  let startIndex = 0;

  divisions.push({
    items: array.slice(startIndex, startIndex + firstPageSize),
  });
  startIndex += firstPageSize;

  while (startIndex < array.length) {
    divisions.push({
      items: array.slice(startIndex, startIndex + restPageSize),
    });
    startIndex += restPageSize;
  }

  return divisions;
}

export function arrayIsEmpty(...arrays: any[][]) {
  if (arrays.length === 0) {
    return true;
  }

  for (const array of arrays) {
    if (array.length > 0) {
      return false;
    }
  }

  return true;
}
