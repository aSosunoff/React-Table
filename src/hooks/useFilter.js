import { cloneDeep } from "lodash";
import { useCallback, useMemo, useState } from "react";

const ititStateFilter = {};

export const useFilter = (list, header) => {
  const [filterState, setFilterState] = useState(ititStateFilter);

  const filteredList = useMemo(
    () =>
      cloneDeep(list).filter((item) =>
        Object.entries(filterState).reduce(
          (res, [prop, { value, type, from, to }]) => {
            switch (type) {
              case "daterange":
                return res && item[prop] >= from && item[prop] <= to;
              case "date":
                return res && item[prop] === value;
              default:
                return (
                  res &&
                  !!String(item[prop]).match(new RegExp(`^${value}`, "i"))
                );
            }
          },
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

  const deleteFieldByFieldFromFilter = useCallback(
    (field) => {
      const { [field]: deleteFilterName, ...newFilterState } = filterState;
      setFilterState(newFilterState);
    },
    [filterState]
  );

  const setFilterHandler = useCallback(
    (field, value, additionalProperties) => {
      if (value || value === 0 || value === "0") {
        const { detail } = filterPanel[field];

        setFilterState((prev) => ({
          ...prev,
          [field]: {
            ...additionalProperties,
            value,
            detail,
          },
        }));
      } else {
        deleteFieldByFieldFromFilter(field);
      }
    },
    [deleteFieldByFieldFromFilter, filterPanel]
  );

  const clearFilterHandler = useCallback(
    () => setFilterState(ititStateFilter),
    []
  );

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
