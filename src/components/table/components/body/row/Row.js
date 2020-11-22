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
  /* row, */
  header,
  rowsBtn,
  rowCssClass = () => null,
  indexRecord,
  record,
}) => {
  const row = useMemo(
    () =>
      Object.keys(header).map((key) => {
        const btns = cloneDeep(header[key].btns || []);
        const {
          format = () => record[key],
          cssClass = () => null,
          titleCell = null,
          clickHandler = () => null,
        } = header[key];

        let attributes = {};

        if (titleCell === true) {
          attributes = { ...attributes, title: record[key] };
        } else if (typeof titleCell === "function") {
          attributes = { ...attributes, title: titleCell(record[key], record) };
        }

        return {
          key,
          value: format(record[key], record),
          btns: btns.map((btn) => ({
            uuid: v4(),
            btn,
          })),
          cssClass: cssClass(record[key], key, record),
          attributes,
          clickHandler: () => clickHandler(record[key], record),
        };
      }),
    [header, record]
  );

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

  const { selectedRowId } = useRecordContext();

  return (
    <div
      className={cn([
        styles.table__row,
        rowCssClass(record),
        {
          [styles["selected-row"]]: selectedRowId === indexRecord,
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
