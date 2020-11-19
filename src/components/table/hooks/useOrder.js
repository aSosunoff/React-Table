import { useCallback, useState } from "react";

export const useOrder = (prop, direction) => {
  const [order, setOrder] = useState(() => ({
    prop,
    direction,
  }));

  const sortHandler = useCallback(
    (prop) =>
      setOrder((prev) => ({
        prop,
        direction:
          prev.prop !== prop || prev.direction === "desc" || !prev.direction
            ? "asc"
            : "desc",
      })),
    [setOrder]
  );

  return {
    ...order,
    sortHandler,
  };
};
