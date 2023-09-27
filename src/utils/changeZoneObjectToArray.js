/**
 * convert zone object to array
 */

const changeZoneObjectToArray = response => {
  const zone = [];
  for (element in response) {
    let key = 0;
    const coordinates = [];
    let { data } = response[element];
    const { visible } = response[element];
    const coords = data.vertices.split(',');
    while (coords.length > key) {
      coordinates.push({
        latitude: Number(coords[key]),
        longitude: Number(coords[key + 1]),
      });
      key += 2;
    }
    data = { ...data, coordinates };
    zone.push({ data, visible });
  }
  return zone;
};

export default changeZoneObjectToArray;
