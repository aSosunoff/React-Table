import { cloneDeep } from "lodash";
import { useMemo } from "react";
import sorting from "../utils/sorting";

export const useSorting = (list, prop, order, sortingType) =>
	useMemo(
		() =>
			cloneDeep(list).sort((a, b) =>
				sorting(sortingType, order, a[prop], b[prop])
			),
		[list, prop, order, sortingType]
	);
