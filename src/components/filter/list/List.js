import React, { useCallback, useMemo } from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import styles from "./List.module.scss";

const List = ({ clsMain, clsButton, items, value, onSet }) => {
  const isValue = useMemo(() => Boolean(value), [value]);

  const changeHandler = useCallback(
    ({ target }) => {
      const selected = target.options[target.options.selectedIndex];

      if (selected.value === "-1") {
        onSet();
      } else {
        onSet(selected.value, {
          obj: selected.dataset.obj && JSON.parse(selected.dataset.obj),
        });
      }
    },
    [onSet]
  );

  const clearHandler = useCallback(
    ({ target }) => {
      target.previousElementSibling.selectedIndex = 0;
      onSet();
    },
    [onSet]
  );

  return (
    <div
      className={cn([clsMain, styles.table__cell_select])}
      style={{
        "--button-delete": isValue ? 1 : 0,
      }}
    >
      <select value={value} onChange={changeHandler}>
        <option value="-1">Выберите</option>
        {items.map((item, inx) => (
          <option key={inx} value={item.id} data-obj={JSON.stringify(item)}>
            {item.text}
          </option>
        ))}
      </select>

      {isValue ? (
        <i
          className={cn(["material-icons", clsButton])}
          onClick={clearHandler}
          data-test-id="list-clear-button"
        >
          clear
        </i>
      ) : null}
    </div>
  );
};

List.defaultProps = {
  items: [],
  onSet: () => null,
};

List.propTypes = {
  clsMain: PropTypes.string,
  clsButton: PropTypes.string,
  items: PropTypes.instanceOf(Array),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onSet: PropTypes.func,
};

export default List;
