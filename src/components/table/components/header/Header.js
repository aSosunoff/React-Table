import React, { useMemo } from "react";
import styles from "./Header.module.scss";
import PropTypes from "prop-types";

const Header = ({ header, prop, direction, onOrder }) => {
  const headers = useMemo(
    () =>
      Object.entries(header).map(
        ([propCell, { titleHead = propCell, order }]) => {
          const canSortable = Boolean(order);

          return {
            prop: propCell,
            order: prop === propCell ? direction : null,
            titleHead,
            canSortable,
            sortable: canSortable ? "" : null,
            onSortHandler: () => canSortable && onOrder(propCell),
          };
        }
      ),
    [header, prop, direction, onOrder]
  );

  return (
    <div className={styles.table__header}>
      {headers.map(
        ({ prop, order, titleHead, canSortable, sortable, onSortHandler }) => (
          <div
            data-test-id="header-cell"
            className={styles.table__cell_head}
            key={prop}
            data-order={order}
            data-sortable={sortable}
            onClick={onSortHandler}
          >
            <span data-test-id="header-name">{titleHead}</span>
            {canSortable ? (
              <span
                className={styles["table__sort-arrow"]}
                data-test-id="header-sortable"
              >
                <span className={styles["sort-arrow"]}></span>
              </span>
            ) : null}
          </div>
        )
      )}
    </div>
  );
};

Header.defaultProps = {
  header: {},
  onOrder: () => {},
};

Header.propTypes = {
  header: PropTypes.object,
  prop: PropTypes.string,
  direction: PropTypes.oneOf(["asc", "desc"]),
  onOrder: PropTypes.func,
};

export default Header;
