import dayjs from 'dayjs';

/**
 * Generate a unique id string
 * @returns {string} unique id
 */
export const generateId = () => {
  const v4 = () => {
    return Math.floor((1 + Math.random()) * 0x1000).toString(16);
  };
  return v4() + v4() + '-' + v4() + '-' + v4() + '-' + v4() + v4();
};

/**
 * Deeply clone a object and return fully new object
 * @param {object} obj
 * @returns {object} new object
 */
export const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

/**
 * Receive a date and return formated date string
 * @param {object | string} date
 * @returns {string}
 */
export const getDate = (date) => dayjs(date).format('DD MMM YYYY');

/**
 * Receive day list and return sorted list as month
 * @param {object[]} dayList
 * @returns {object[]}
 */
export const getSortedlistAsMonth = (dayList) => {
  const sortedList = dayList.sort(function (a, b) {
    const keyA = a.date;
    const keyB = b.date;

    if (keyA > keyB) return -1;
    if (keyA < keyB) return 1;
    return 0;
  });

  return sortedList.reduce((acc, cur) => {
    const index = acc.findIndex((mon) => mon.name === cur.month);

    if (index > -1) {
      acc[index].days.push(cur);
    } else {
      acc.push({
        name: cur.month,
        days: [cur],
      });
    }

    return acc;
  }, []);
};

/**
 * Receive a list of day and return total price
 * @param {object[]} dayList
 * @returns {number}
 */
export const totalFromDays = (dayList) => {
  let grossTotal = 0;

  dayList.length > 0 &&
    dayList.map((day) => {
      return day.items.map(
        (item) => +item.price > 0 && (grossTotal += +item.price)
      );
    });

  return grossTotal.toFixed(2);
};
