import React, { useState } from "react";
import Table from "../../../src";
import "material-icons/iconfont/material-icons.scss";

/* utils */
const newRecord = (id, text, name, date) => ({
  id,
  text,
  name,
  date,
});
/*  */

const App = () => {
  const [list, setList] = useState([
    newRecord(2, "aa", "bb", new Date(2020, 10, 10).getTime()),
    newRecord(1, "a", "b", new Date(2020, 10, 1).getTime()),
    newRecord(3, "aaa", "bbb", new Date(2020, 10, 15).getTime()),
  ]);

  return (
    <Table
      title="Таблица"
      list={list}
      header={{
        avatar: {
          width: "100px",
          format: (value, record) =>
            record.id && (
              <img
                alt="avatar"
                style={{
                  maxWidth: "70px",
                }}
                src="https://avatars2.githubusercontent.com/u/15358461?v=4"
              />
            ),
        },
        id: {},
      }}
      pageSize={5}
      custom
      onFilterHandler={(filter) => console.log(filter)}
      onOrderHandler={(prop, direction) => console.log(prop, direction)}
      onPageHandler={(page) => console.log(page)}
      pageCount={1}
      currentPage={1}
    />
  );
};

export default App;
