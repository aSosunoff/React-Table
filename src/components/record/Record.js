import { cloneDeep } from "lodash";
import React, { useCallback, useMemo } from "react";
import { v4 } from "uuid";
import cn from "classnames";
import PropTypes from "prop-types";
import Btn from "./btn";
import Cell from "./cell";
import styles from "./Record.module.scss";
import { useRecordContext } from "../../context/recordContext";
import isEmptyObject from "../../utils/isEmptyObject";

const Record = ({
  header,
  rowsBtn,
  rowCssClass,
  recordAttributes,
  recordStyles,
  indexRecord,
  record,
}) => {
  const cells = useMemo(
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
          attributes = { title: record[key] };
        } else if (typeof titleCell === "function") {
          attributes = { title: titleCell(record[key], record) };
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

  const { rowClickHandler, selectedRowId } = useRecordContext();

  const rowHandler = useCallback(
    () => rowClickHandler(isEmptyObject(record) ? null : indexRecord, record),
    [indexRecord, record, rowClickHandler]
  );

  return (
    <div
      {...recordAttributes}
      className={cn([
        styles.table__row,
        rowCssClass(record),
        {
          [styles["selected-row"]]: selectedRowId === indexRecord,
        },
      ])}
      onClick={rowHandler}
      style={recordStyles}
    >
      {cells.map(({ key, ...cell }) => (
        <Cell key={key} {...cell} record={record} indexRecord={indexRecord} />
      ))}

      {localRowsBtn.map(({ uuid, btn }) => (
        <Btn key={uuid} btn={btn} record={record} indexRecord={indexRecord} />
      ))}
    </div>
  );
};

Record.defaultProps = {
  rowCssClass: () => null,
  header: {},
  rowsBtn: [],
  record: {},
  recordAttributes: {},
  recordStyles: {},
};

Record.propTypes = {
  header: PropTypes.instanceOf(Object),
  rowsBtn: PropTypes.instanceOf(Array),
  recordAttributes: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  recordStyles: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  rowCssClass: PropTypes.func,
  indexRecord: PropTypes.number,
  record: PropTypes.instanceOf(Object),
};

export default Record;
