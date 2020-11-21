import React, { useMemo, useRef } from "react";
import styles from "./Filter.module.scss";
import cn from "classnames";
import Text from "./text/Text";
import List from "./list/List";
import Button from "./button/Button";

const Filter = ({
  filterState,
  filterPanel,
  onSetFilter = () => null,
  onDeleteFromFilterByField = () => null,
  onClearFilter = () => null,
} = {}) => {
  const filter = useRef(null);

  const filterRow = useMemo(() => Object.entries(filterPanel), [filterPanel]);

  return (
    <div ref={filter} className={styles.table__filter}>
      {filterRow.map(([field, { type, items, icon, handler }]) => {
        switch (type) {
          case "text":
            return (
              <Text
                key={field}
                clsMain={styles.table__cell_filter}
                clsButton={styles.table__cell_button}
                value={filterState[field]?.value ?? ""}
                onSet={onSetFilter.bind(this, field)}
                onClear={onDeleteFromFilterByField.bind(this, field)}
              />
            );
          case "list":
            return (
              <List
                key={field}
                clsMain={styles.table__cell_filter}
                clsButton={styles.table__cell_button}
                value={filterState[field]?.value ?? -1}
                items={items}
                onSet={onSetFilter.bind(this, field)}
                onClear={onDeleteFromFilterByField.bind(this, field)}
              />
            );
          case "button":
            return (
              <Button
                key={field}
                clsMain={styles.table__cell_filter}
                clsButton={styles.table__cell_button}
                icon={icon}
                value={filterState[field]}
                handler={handler}
                onSet={onSetFilter.bind(this, field)}
                onClear={onDeleteFromFilterByField.bind(this, field)}
              />
            );
          default:
            return (
              <div className={styles.table__cell_filter} key={field}></div>
            );
        }
      })}

      <div
        className={cn([
          styles.table__cell_filter,
          styles["table__cell_btn-delete"],
        ])}
        onClick={onClearFilter}
      >
        <i className="material-icons">delete</i>
      </div>
    </div>
  );
};

export default Filter;
