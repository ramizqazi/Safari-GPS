/**
 * convert routes object to array
 */

const changePlaceRoutesObjectToArray = response => {
  const routes = [];
  for (element in response) {
    let key = 0;
    const coordinates = [];
    let { data } = response[element];
    const coords = data.points.split(',');
    while (coords.length > key) {
      coordinates.push({
        latitude: Number(coords[key]),
        longitude: Number(coords[key + 1]),
      });
      key += 2;
    }
    data = { ...data, coordinates };
    delete data.points;
    routes.push({ ...data });
  }
  return routes;
};

export default changePlaceRoutesObjectToArray;
