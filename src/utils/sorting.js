const getDateTimeStamp = (val) => {
  if (Date.parse(val)) {
    return Date.parse(val);
  }

  if (val instanceof Date) {
    return val.getTime();
  }

  return -1;
};

const getDirection = (directionString) =>
  directionString === "asc" || !directionString ? 1 : -1;

const sortStrategy = {
  number: (direction, a, b) => direction * (a - b),
  string: (direction, a, b) => direction * new Intl.Collator().compare(a, b),
  date: (direction, a, b) =>
    direction * (getDateTimeStamp(a) - getDateTimeStamp(b)),
  timestamp: (direction, a, b) => direction * (a - b),
};

export default (type, direction, a, b) => {
  if (type in sortStrategy) {
    return sortStrategy[type](getDirection(direction), a, b);
  }
  return null;
};
