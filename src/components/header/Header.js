import React, { useMemo } from "react";
import PropTypes from "prop-types";
import styles from "./Header.module.scss";

const Header = ({ header, prop, direction, onOrder }) => {
  const headers = useMemo(
    () =>
      Object.entries(header).map(
        ([propCell, { titleHead = propCell, order }]) => ({
          prop: propCell,
          order: prop === propCell ? direction : null,
          titleHead,
          canSortable: Boolean(order),
        })
      ),
    [header, prop, direction]
  );

  return (
    <div className={styles.table__header}>
      {headers.map(({ prop, order, titleHead, canSortable }) => (
        <div
          data-test-id="header-cell"
          className={styles.table__cell_head}
          key={prop}
          data-order={order}
          data-sortable={canSortable ? "" : null}
          onClick={() => canSortable && onOrder(prop)}
        >
          <span data-test-id="header-name">{titleHead}</span>
          {canSortable ? (
            <span
              className={styles["table__sort-arrow"]}
              data-test-id="header-sortable"
            >
              <span className={styles["sort-arrow"]} />
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
};

Header.defaultProps = {
  header: {},
  onOrder: () => {},
};

Header.propTypes = {
  header: PropTypes.instanceOf(Object),
  prop: PropTypes.string,
  direction: PropTypes.oneOf(["asc", "desc"]),
  onOrder: PropTypes.func,
};

export default Header;
