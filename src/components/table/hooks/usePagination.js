import { useMemo, useState } from "react";
import { chunkFromArray } from "../utils/chunkFromArray";

export const usePagination = (size = 5, list) => {
  const [currentPage, setPageHandler] = useState(1);

  const chunkList = useMemo(() => chunkFromArray(list, size), [list, size]);

  const pageCount = useMemo(() => chunkList.length, [chunkList.length]);

  const itemsOnPage = useMemo(
    () => chunkList[currentPage - 1] || chunkList[0] || [],
    [currentPage, chunkList]
  );

  return {
    itemsOnPage,
    currentPage,
    pageCount,
    setPageHandler,
  };
};
