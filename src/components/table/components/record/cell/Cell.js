import React, { useMemo } from "react";
import cn from "classnames";
import Btn from "../btn";
import styles from "./Cell.module.scss";
import PropTypes from "prop-types";

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
              {`${value}`}
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
  value: PropTypes.any,
  btns: PropTypes.array,
  record: PropTypes.object,
  indexRecord: PropTypes.number,
  attributes: PropTypes.object,
  clickHandler: PropTypes.func,
  cssClass: PropTypes.string,
};

export default Cell;
