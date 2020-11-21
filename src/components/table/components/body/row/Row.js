import { cloneDeep } from "lodash";
import React, { useCallback, useMemo } from "react";
import { v4 } from "uuid";
import cn from "classnames";
import Btn from "../btn";
import Cell from "../cell";
import styles from "./Row.module.scss";
import { useRecordContext } from "../../../context/recordContext";
import isEmptyObject from "../../../utils/isEmptyObject";

const Row = ({
  row,
  rowsBtn,
  rowCssClass = () => null,
  indexRecord,
  isSelected,
  record,
}) => {
  const localRowsBtn = useMemo(
    () =>
      cloneDeep(rowsBtn).map((btn) => ({
        uuid: v4(),
        btn,
      })),
    [rowsBtn]
  );

  const { rowClickHandler } = useRecordContext();

  const rowHandler = useCallback(
    () => rowClickHandler(isEmptyObject(record) ? null : indexRecord, record),
    [indexRecord, record, rowClickHandler]
  );

  return (
    <div
      className={cn([
        styles.table__row,
        rowCssClass(record),
        {
          [styles["selected-row"]]: isSelected,
        },
      ])}
      onClick={rowHandler}
    >
      {row.map(({ key, ...cell }) => (
        <Cell key={key} {...cell} record={record} indexRecord={indexRecord} />
      ))}

      {localRowsBtn.map(({ uuid, btn }) => (
        <Btn key={uuid} btn={btn} record={record} indexRecord={indexRecord} />
      ))}
    </div>
  );
};

export default Row;
