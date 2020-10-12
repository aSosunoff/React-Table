import { useEffect, useRef } from "react";

export const useEffectUpdate = (effect, dependencies = []) => {
	const isInitialMount = useRef(true);

	useEffect(() => {
		let effectCleanupFunc = () => {};

		if (isInitialMount.current) {
			isInitialMount.current = false;
		} else {
			effectCleanupFunc = effect() || effectCleanupFunc;
		}

		return () => {
			effectCleanupFunc();

			if (!isInitialMount.current) {
				isInitialMount.current = true;
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, dependencies);
};
