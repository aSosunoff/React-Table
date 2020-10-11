import { cloneDeep } from "lodash";
import { useMemo, useState } from "react";

const ititStateFilter = {};

export const useFilter = (list, header) => {
	const [filterState, setFilterState] = useState(ititStateFilter);

	const filteredList = useMemo(
		() =>
			cloneDeep(list).filter((item) =>
				Object.entries(filterState).reduce(
					(res, [prop, { value }]) =>
						res && !!String(item[prop]).match(new RegExp(`^${value}`, "i")),
					true
				)
			),
		[list, filterState]
	);

	const filterPanel = useMemo(
		() =>
			Object.fromEntries(
				Object.entries(header).map(([field, { filter = false }]) => [
					field,
					filter,
				])
			),
		[header]
	);

	const isFilter = useMemo(
		() => Boolean(Object.entries(header).find(([, { filter } = {}]) => filter)),
		[header]
	);

	const mergeFilter = (obj) => {
		setFilterState({
			...filterState,
			...obj,
		});
	};

	const deleteFieldByFieldFromFilter = (field) => {
		const { [field]: deleteFilterName, ...newFilterState } = filterState;
		setFilterState(newFilterState);
	};

	const setFilterHandler = (field, value) => {
		if (value || value === 0 || value === "0") {
			const { detail } = filterPanel[field];
			mergeFilter({
				[field]: {
					value,
					detail,
				},
			});
		} else {
			deleteFieldByFieldFromFilter(field);
		}
	};

	const clearFilterHandler = () => {
		setFilterState(ititStateFilter);
	};

	return {
		filteredList,
		filterState,
		filterPanel,
		isFilter,
		setFilterHandler,
		deleteFieldByFieldFromFilter,
		clearFilterHandler,
	};
};
