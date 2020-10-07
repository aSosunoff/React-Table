import React, { useState } from "react";
import Table from "../table/Table";

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

	const added = () => {
		/* list.splice(4, 1, {
			...list[4],
			name: "test",
		});
		setList([...list]); */
		setList([...list, { name: "test" }]);
	};

	return (
		<>
			<Table
				title="Таблица"
				list={list}
				header={{
					id: {
						titleHead: "№",
						width: "50px",
						order: {
							type: "number",
							direction: 'asc',
						},
					},
					text: {
						titleHead: "текст",
						order: {
							type: "string",
							direction: 'desc',
						},
					},
					name: {
						titleHead: "имя",
					},
				}}
				pageSize={3}
				/* btns={} */
			></Table>
			<button onClick={added}>111</button>
		</>
	);
}

export default App;
