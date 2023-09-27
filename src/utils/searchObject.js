function searchObject(arr, searchKey) {
  return arr.filter(obj => Object.keys(obj).some(key => obj["name"].toLowerCase().includes(searchKey.toLowerCase())));
}

export default searchObject