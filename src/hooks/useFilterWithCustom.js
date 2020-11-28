import { useFilter } from "./useFilter";

export const useFilterWithCustom = (list, header, custom) => {
  const filter = useFilter(list, header);

  return {
    ...filter,
    filteredList: custom ? list : filter.filteredList,
  };
};
