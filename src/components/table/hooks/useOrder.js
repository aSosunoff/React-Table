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
		direction,
	};
};

export const useOrder = (header) => {
	// headOrder = { prop: id, direction: 'asc' }
	const [headOrder, setHeadOrder] = useState(() => getStartOrderProp(header));

	const sortHandler = useCallback(
		(prop) => {
			setHeadOrder({
				prop,
				direction:
					headOrder.prop !== prop ||
					headOrder.direction === "desc" ||
					!headOrder.direction
						? "asc"
						: "desc",
			});
		},
		[headOrder.direction, headOrder.prop, setHeadOrder]
	);

	return {
		...headOrder,
		sortHandler,
	};
};
