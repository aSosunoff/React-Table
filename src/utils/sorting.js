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

export default (type, order, a, b) => {
	const direction = order === "asc" || !order ? 1 : -1;

	if (type in sortStrategy) {
		return sortStrategy[type](direction, a, b);
	}

	return sortStrategy[Object.keys(sortStrategy)[0]](direction, a, b);
};
