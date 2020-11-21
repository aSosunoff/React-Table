import React, { useCallback, useState } from "react";
import Table from "../table/components/Table";
import DateTimeRange from "@asosunoff/react-datetime-range";
import { v4 } from "uuid";

/* utils */
const newRecord = (id, text, name, date) => ({
  id,
  text,
  name,
  date,
});
/*  */

const App = () => {
  /* TABLE */
  const [list, setList] = useState([
    newRecord(2, "aa", "bb", new Date(2020, 10, 10).getTime()),
    newRecord(1, "a", "b", new Date(2020, 10, 1).getTime()),
    newRecord(3, "aaa", "bbb", new Date(2020, 10, 15).getTime()),
  ]);

  const addRecord = useCallback(() => {
    const value = v4();
    setList((prev) => [
      ...prev,
      newRecord(
        value,
        value,
        "test",
        new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate()
        ).getTime()
      ),
    ]);
  }, []);

  const deleteRecord = useCallback(
    (record) =>
      setList((prev) => [...prev.filter(({ id }) => id !== record.id)]),
    []
  );
  /*  */

  /* DATE */
  // open
  const [isOpen, setOpen] = useState(false);
  const openHandler = useCallback(() => setOpen(true), []);
  const closeHandler = useCallback(() => setOpen(false), []);
  // target
  const [targetRange, setTarget] = useState();
  // range
  const [
    callbackFilterHandler,
    setCallbackFilterHandler,
  ] = useState(() => () => {});

  const rangeSelectedHandler = useCallback(
    ({ startDate, endDate }) => {
      if (startDate && endDate) {
        callbackFilterHandler(
          `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`,
          {
            type: "daterange",
            from: startDate.getTime(),
            to: endDate.getTime(),
          }
        );
      } else if (startDate) {
        callbackFilterHandler(startDate.getTime(), {
          type: "date",
          title: `${startDate.toLocaleDateString()}`,
        });
      }
    },
    [callbackFilterHandler]
  );
  /*  */

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
      btns: [
        {
          title: "Посмотреть данные",
          handler: (record) => alert(record.id),
          icon: "remove_red_eye",
        },
      ],
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
            title: "Посмотреть данные",
            handler: (record) => alert(record.text),
            icon: "remove_red_eye",
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
    date: {
      titleHead: "Дата",
      format: (value) => value && new Date(value).toLocaleDateString(),
      order: {
        type: "date",
      },
      filter: {
        type: "button",
        icon: "date_range",
        handler: (cb, target) => {
          openHandler();
          setCallbackFilterHandler(() => cb);
          setTarget(target);
        },
      },
    },
  };

  return (
    <>
      <DateTimeRange
        locales="ru"
        isOpen={isOpen}
        target={targetRange}
        onRangeSelected={rangeSelectedHandler}
        onClose={closeHandler}
      />

      <Table
        title="Таблица"
        list={list}
        header={header}
        pageSize={10}
        rowsBtn={[
          {
            title: "Просмотреть запись",
            handler: (record) => alert(JSON.stringify(record)),
            icon: "remove_red_eye",
          },
          {
            title: ({ id }) => `Удалить запись ${id}`,
            handler: deleteRecord,
            icon: "delete",
          },
        ]}
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
