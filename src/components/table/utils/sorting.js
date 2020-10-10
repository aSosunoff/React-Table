const getDateTimeStamp = (val) => {
	if (Date.parse(val)) {
		return Date.parse(val);
	}

	if (val instanceof Date) {
		return val.getTime();
	}

	return -1;
};

const sortStrategy = {
	number: (direction, a, b) => direction * (a - b),
	string: (direction, a, b) => direction * new Intl.Collator().compare(a, b),
	date: (direction, a, b) =>
		direction * (getDateTimeStamp(a) - getDateTimeStamp(b)),
};

export default (type, direction, a, b) => {
	const directionTransform = direction === "asc" || !direction ? 1 : -1;

	if (type in sortStrategy) {
		return sortStrategy[type](directionTransform, a, b);
	}

	return sortStrategy.number(directionTransform, a, b);
};
