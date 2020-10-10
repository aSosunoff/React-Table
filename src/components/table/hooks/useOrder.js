import { useCallback, useState } from "react";

export const useOrder = (prop, direction) => {
	const [order, setOrder] = useState(() => ({
		prop,
		direction,
	}));

	const sortHandler = useCallback(
		(prop) => {
			setOrder({
				prop,
				direction:
					order.prop !== prop || order.direction === "desc" || !order.direction
						? "asc"
						: "desc",
			});
		},
		[order.direction, order.prop, setOrder]
	);

	return {
		...order,
		sortHandler,
	};
};
