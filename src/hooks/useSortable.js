import { cloneDeep } from "lodash";
import { useMemo } from "react";
import sorting from "../utils/sorting";

export const useSorting = (list, prop, direction, sortingType) =>
  useMemo(
    () =>
      cloneDeep(list).sort((a, b) =>
        sorting(sortingType, direction, a[prop], b[prop])
      ),
    [list, prop, direction, sortingType]
  );
