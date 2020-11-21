import { cloneDeep } from "lodash";
import React, { useCallback } from "react";
import { v4 } from "uuid";
import styles from "./Body.module.scss";
import Row from "./row";

const Body = ({ rowCssClass, list = [], header, rowsBtn = [] }) => {
  const row = useCallback(
    (record) =>
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
    [header]
  );

  return (
    <div className={styles.table__body}>
      {list.map(({ uuid, ...record }, indexRecord) => (
        <Row
          key={uuid}
          row={row(record)}
          rowsBtn={rowsBtn}
          indexRecord={indexRecord}
          rowCssClass={rowCssClass}
          record={record}
        />
      ))}
    </div>
  );
};

export default Body;
