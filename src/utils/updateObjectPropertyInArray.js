/* ============================================================================= 
   update object property in array
============================================================================= */
const updateObjectPropertyInArray = (param, property, obj, arr) =>
  arr.map(val => {
    if (val[param] === obj[param]) {
      val[property] = obj[property];
    }
    return val;
  });

export default updateObjectPropertyInArray;
