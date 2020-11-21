export const chunkFromArray = (arr, size = 1) => {
  const a = arr || [];

  return Array(Math.ceil(a.length / size))
    .fill([])
    .map((_, inx) => a.slice(inx * size, inx * size + size));
};
