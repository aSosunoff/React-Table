export const getStartOrderProp = (header) => {
  const firstHeaderByDirection = Object.entries(header).find(
    ([, { order = null } = {}]) => order
  ) || [null, { order: { direction: "asc" } }];

  const [
    prop,
    {
      order: { direction },
    },
  ] = firstHeaderByDirection;

  return [prop, direction];
};
