/**
 * convert object to array
 */

const convertObjectToArray = object => {
  const array = [];
  for (element in object) {
    array.push(object[element]);
  }
  return array;
};

export default convertObjectToArray;
