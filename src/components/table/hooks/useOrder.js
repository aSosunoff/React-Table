import { useCallback, useState } from "react";

const getStartOrderProp = (header) => {
	const firstHeaderByDirection = Object.entries(header).find(
		([, { order = null } = {}]) => order
	) || [null, { order: { direction: "asc" } }];

	const [
		prop,
		{
			order: { direction },
		},
	] = firstHeaderByDirection;

	return {
		prop,
		order: direction,
	};
};

export const useOrder = (header) => {
	// headOrder = { prop: id, order: 'asc' }
	const [headOrder, setHeadOrder] = useState(() => getStartOrderProp(header));

	const sortHandler = useCallback(
		(prop) => {
			setHeadOrder({
				prop,
				order:
					headOrder.prop !== prop ||
					headOrder.order === "desc" ||
					!headOrder.order
						? "asc"
						: "desc",
			});
		},
		[headOrder.order, headOrder.prop, setHeadOrder]
	);

	return {
		headOrder,
		sortHandler,
	};
};
