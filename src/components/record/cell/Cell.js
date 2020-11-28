import React, { useMemo } from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import Btn from "../btn";
import styles from "./Cell.module.scss";

const Cell = ({
  value,
  btns,
  record,
  indexRecord,
  attributes,
  clickHandler,
  cssClass,
}) => {
  const memoizedWidthCell = useMemo(
    () => ({
      "--width-cell": ["1fr"].concat(Array(btns.length).fill("50px")).join(" "),
    }),
    [btns.length]
  );

  const valueComponent = useMemo(
    () => (React.isValidElement(value) ? value : `${value}`),
    [value]
  );

  return (
    <div
      className={cn([styles.table__cell, cssClass])}
      style={memoizedWidthCell}
      {...attributes}
      data-test-id="cell"
    >
      {value ? (
        <>
          <div
            className={styles.table__cell_field}
            onClick={clickHandler}
            data-test-id="cell-value"
          >
            <div className={styles["table__cell_field-nowrap"]}>
              {valueComponent}
            </div>
          </div>

          {btns.map(({ uuid, btn }) => (
            <Btn
              key={uuid}
              btn={btn}
              record={record}
              indexRecord={indexRecord}
            />
          ))}
        </>
      ) : null}
    </div>
  );
};

Cell.defaultProps = {
  btns: [],
};

Cell.propTypes = {
  /* value: PropTypes.any, */
  btns: PropTypes.instanceOf(Array),
  record: PropTypes.instanceOf(Object),
  indexRecord: PropTypes.number,
  attributes: PropTypes.instanceOf(Object),
  clickHandler: PropTypes.func,
  cssClass: PropTypes.string,
};

export default Cell;
