import { cloneDeep } from "lodash";
import React, { useState } from "react";
import Table from "../table/components/Table";
import { v4 } from "uuid";

function App() {
	const [list, setList] = useState([
		{
			id: 2,
			text: "aa",
			name: "bb",
		},
		{
			id: 1,
			text: "a",
			name: "b",
		},
		{
			id: 3,
			text: "aaa",
			name: "bbb",
		},
		{
			id: 4,
			text: "aaaa",
			name: "bbbb",
		},
		{
			id: 5,
			text: "aaaaa",
			name: "bbbbb",
		},
		/* {
			id: 6,
			text: "aaaaaa",
			name: "bbbbbb",
		}, */
	]);

	const added = () => {
		const value = v4();
		setList([...list, { id: value, text: value, name: "test" }]);
	};

	const deleteRow = (record) => {
		const listLocal = cloneDeep(list);
		setList([...listLocal.filter(({ id }) => id !== record.id)]);
	};

	const header = {
		id: {
			titleHead: "№",
			/* width: "70px", */
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
			titleHead: "текст",
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
						/* title: "Добавить запись", */
						title: ({ id }) => id,
						handler: deleteRow,
						icon: "delete",
						/* disabled: true, */
					},
			],
		},
		name: {
			titleHead: "имя",
			format: (_, record) => record.text,
			filter: {
				type: "text",
				detail: {
					name: 12,
					qwe: "qwe",
				},
			},
		},
	};

	return (
		<>
			<Table
				title="Таблица"
				/* rowCssClass={(record) => (record.id === 3 ? "qweqwe" : "")} */
				list={list}
				header={header}
				pageSize={10}
				rowsBtn={[
					{
						/* title: "Добавить запись", */
						title: ({ id }) => id,
						handler: deleteRow,
						icon: "delete",
						/* disabled: true, */
					},
				]}
				controlPanel={[
					{
						title: "Добавить запись",
						handler: added,
					},
				]}
				onRowClick={(record) => {
					console.log("onRowClick", record);
				}}
				onUnselectRecord={() => {
					console.log("onUnselectRecord");
				}}
			></Table>
		</>
	);
}

export default App;
