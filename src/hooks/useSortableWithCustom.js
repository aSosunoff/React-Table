import { useSorting } from "./useSortable";

export const useSortableWithCustom = (
  list,
  prop,
  direction,
  sortingType,
  custom
) => {
  const sortableList = useSorting(list, prop, direction, sortingType);

  return custom ? list : sortableList;
};
