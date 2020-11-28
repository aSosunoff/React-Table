import { usePagination } from "./usePagination";

export const usePaginationWithCustom = (size, list, custom) => {
  const paging = usePagination(size, list);

  return {
    ...paging,
    itemsOnPage: custom ? list : paging.itemsOnPage,
  };
};
