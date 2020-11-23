import React from "react";
import styles from "./Filter.module.scss";
import cn from "classnames";
import Text from "./text/Text";
import List from "./list/List";
import Button from "./button/Button";
import PropTypes from "prop-types";

const Filter = ({
  filterState,
  filterPanel,
  onSetFilter,
  onDeleteFromFilterByField,
  onClearFilter,
}) => {
  return filterPanel ? (
    <div className={styles.table__filter} data-test-id="filter-container">
      {Object.entries(filterPanel).map(
        ([field, { type, items, icon, handler }]) => {
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
                <div
                  className={styles.table__cell_filter}
                  key={field}
                  data-test-id="filter-default"
                ></div>
              );
          }
        }
      )}

      <div
        className={cn([
          styles.table__cell_filter,
          styles["table__cell_btn-delete"],
        ])}
        onClick={onClearFilter}
        data-test-id="filter-clear-button"
      >
        <i className="material-icons">delete</i>
      </div>
    </div>
  ) : null;
};

Filter.defaultProps = {
  filterState: {},
  filterPanel: null,
  onSetFilter: () => null,
  onDeleteFromFilterByField: () => null,
  onClearFilter: () => null,
};

Filter.propTypes = {
  filterState: PropTypes.object,
  filterPanel: PropTypes.object,
  onSetFilter: PropTypes.func,
  onDeleteFromFilterByField: PropTypes.func,
  onClearFilter: PropTypes.func,
};

export default Filter;
