import { cloneDeep } from "lodash";
import { useMemo } from "react";
import sorting from "../utils/sorting";

export default function useSortable(list, prop, order, sortingType) {
	return useMemo(
		() =>
			cloneDeep(list).sort((a, b) =>
				sorting(sortingType, order, a[prop], b[prop])
			),
		[list, prop, order, sortingType]
	);
}
