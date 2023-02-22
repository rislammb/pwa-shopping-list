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
