import React, { useCallback, useState } from "react";
import Table from "../table/components/Table";
import { v4 } from "uuid";

// utils
const newRecord = (id, text, name, date) => ({
  id,
  text,
  name,
  date,
});

const App = () => {
  const [list, setList] = useState([
    newRecord(2, "aa", "bb", new Date(2020, 1)),
    newRecord(1, "a", "b", new Date(2020, 0)),
    newRecord(3, "aaa", "bbb", new Date(2020, 2)),
  ]);

  const addRecord = useCallback(() => {
    const value = v4();
    setList((prev) => [...prev, newRecord(value, value, "test", new Date())]);
  }, []);

  const deleteRecord = useCallback(
    (record) =>
      setList((prev) => [...prev.filter(({ id }) => id !== record.id)]),
    []
  );

  const header = {
    id: {
      titleHead: "№",
      width: "170px",
      order: {
        type: "number",
        direction: "asc",
      },
      filter: {
        type: "list",
        items: [
          { id: 1, text: 1 },
          { id: 2, text: 2 },
        ],
      },
    },
    text: {
      titleHead: "Текст",
      order: {
        type: "string",
        direction: "desc",
      },
      filter: {
        type: "text",
        detail: {
          name: 12,
          qwe: "qwe",
        },
      },
      btns: [
        (record) =>
          record.id === 3 && {
            title: ({ id }) => `Удалить запись ${id}`,
            handler: deleteRecord,
            icon: "delete",
          },
      ],
    },
    name: {
      titleHead: "Наименование",
      /* filter: {
        type: "button",
        icon: "search",
        hundler: (cbFilter, element) => {
          setTimeout(() => {
            cbFilter("bbb", "asd");
          }, 2000);
        },
        detail: {
          name: 12,
          qwe: "qwe",
        },
      }, */
    },
  };

  return (
    <>
      <Table
        title="Таблица"
        list={list}
        header={header}
        pageSize={10}
        // rowsBtn={[
        // 	{
        // 		/* title: "Добавить запись", */
        // 		title: ({ id }) => id,
        // 		handler: deleteRecord,
        // 		icon: "delete",
        // 		/* disabled: true, */
        // 	},
        // ]}
        controlPanel={[
          {
            title: "Добавить запись",
            handler: addRecord,
          },
        ]}
        /* onRowClick={(record) => {
					console.log("onRowClick", record);
				}}
				onUnselectRecord={() => {
					console.log("onUnselectRecord");
				}} */
      ></Table>
    </>
  );
};

export default App;
