import React, { useCallback, useMemo, useState } from "react";
import Table from "../../../src";
import "material-icons/iconfont/material-icons.scss";

/* utils */
const newRecord = (id, text, name, date) => ({
  id,
  text,
  name,
  date,
  avatar: "https://avatars2.githubusercontent.com/u/15358461?v=4",
});
/*  */

const App = () => {
  const [list, setList] = useState([
    newRecord(2, "aa", "bb", new Date(2020, 10, 10).getTime()),
    newRecord(1, "a", "b", new Date(2020, 10, 1).getTime()),
    newRecord(3, "aaa", "bbb", new Date(2020, 10, 15).getTime()),
    newRecord(5, "aaa", "bbb", new Date(2020, 10, 15).getTime()),
    newRecord(4, "aaa", "bbb", new Date(2020, 10, 15).getTime()),
    newRecord(6, "aaa", "bbb", new Date(2020, 10, 15).getTime()),
    newRecord(7, "aaa", "bbb", new Date(2020, 10, 15).getTime()),
  ]);

  const [currentPage, setPageHandler] = useState(1);
  const pageSize = 5;
  const pageCount = Math.ceil(list.length / pageSize);

  const onOrderHandler = useCallback(
    (prop, direction) => console.log(prop, direction),
    []
  );
  const onFilterHandler = useCallback((filter) => console.log(filter), []);

  const itemsOnPage = useMemo(
    () =>
      list.slice(
        (currentPage - 1) * pageSize,
        (currentPage - 1) * pageSize + pageSize
      ),
    [currentPage, list]
  );

  return (
    <Table
      title="Таблица"
      list={itemsOnPage}
      recordStyles={{
        height: "71px",
      }}
      header={{
        avatar: {
          width: "100px",
          format: (value) =>
            value && (
              <img
                alt="avatar"
                style={{
                  maxWidth: "70px",
                }}
                src={value}
              />
            ),
        },
        id: {
          filter: {
            type: "text",
          },
          order: {
            type: "number",
          },
        },
      }}
      pageSize={pageSize}
      custom
      onFilterHandler={onFilterHandler}
      onOrderHandler={onOrderHandler}
      onPageHandler={setPageHandler}
      pageCount={pageCount}
      currentPage={currentPage}
    />
  );
};

export default App;
