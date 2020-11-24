import { useCallback, useState } from "react";

export const usePropDirection = (prop, direction) => {
  const [propDirection, setPropDirection] = useState(() => ({
    prop,
    direction,
  }));

  const setPropDirectionHandler = useCallback(
    (prop) =>
      setPropDirection((prev) => ({
        prop,
        direction:
          prev.prop !== prop || prev.direction === "desc" || !prev.direction
            ? "asc"
            : "desc",
      })),
    [setPropDirection]
  );

  return {
    ...propDirection,
    setPropDirectionHandler,
  };
};
