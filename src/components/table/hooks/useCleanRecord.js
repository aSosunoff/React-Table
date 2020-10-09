import { useMemo } from "react";
import { v4 } from "uuid";

const fillCleanItem = (size, countItems) =>
	countItems < size ? Array(size - countItems).fill("") : [];

export const useCleanRecord = (list, sizeList) =>
	useMemo(
		() => [
			...list,
			...fillCleanItem(sizeList, list.length).map((record) => ({
				uuid: v4(),
				...record,
			})),
		],
		[sizeList, list]
	);
