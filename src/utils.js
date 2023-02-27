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
 * Receive a list of day and return total
 * @param {object[]} dayList
 * @returns number
 */
export const calculateMonthTotal = (dayList) => {
  let grossTotal = 0;
  dayList.map((day) => {
    return day.items.map((item) => (grossTotal += +item.price));
  });

  return grossTotal.toFixed(2);
};
