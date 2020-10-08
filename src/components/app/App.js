import { cloneDeep } from "lodash";
import React, { useState } from "react";
import Table from "../table/Table";
import { v4 } from "uuid";

function App() {
	const [list, setList] = useState([
		{
			id: 1,
			text: "a",
			name: "b",
		},
		{
			id: 2,
			text: "aa",
			name: "bb",
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

	const header = {
		id: {
			titleHead: "№",
			width: "50px",
			order: {
				type: "number",
				direction: "asc",
			},
		},
		text: {
			titleHead: "текст",
			order: {
				type: "string",
				direction: "desc",
			},
		},
		name: {
			titleHead: "имя",
		},
	};

	const added = () => {
		const value = v4();
		setList([...list, { id: value, text: value, name: "test" }]);
	};

	const deleteRow = (record) => {
		const listLocal = cloneDeep(list);
		setList([...listLocal.filter(({ id }) => id !== record.id)]);
	};

	return (
		<>
			<Table
				title="Таблица"
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
			></Table>
		</>
	);
}

export default App;
