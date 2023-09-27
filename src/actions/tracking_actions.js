import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  GET_CARS_LOADER,
  GET_CARS_SUCCESS,
  GET_CARS_REJECTED,
  CHANGE_CAR_NAME_LOADER,
} from "../actionTypes";
import apiCall from "../utils/apiCall";
import convertObjectToArray from "../utils/convertObjectToArray";

export const getAddress = async (car, active) => {

  if(!active){
    return { address: 'Yükleniyor...', speedlimit: 0 };
  }
  
  const server_url = await AsyncStorage.getItem('server_url');
  let url;
  if (car.speed != 0) {
    url = `${server_url}/tools/gc_post.php?cmd=latlng&lat=${car.latitude}&lng=${car.longitude}&angle=${car.angle}&api=true`;
  } else {
    url = `${server_url}/tools/gc_post.php?cmd=latlng&lat=${car.latitude}&lng=${car.longitude}&api=true`;
  }

  //console.log(url);

  const response = await fetch(url);
  const json = await response.json();
  return json;
};

export const getCars = (token, language, server_url) => async (dispatch) => {
  try {
    dispatch({ type: GET_CARS_LOADER, payload: true });

    const response = await apiCall(
      `/fn_objects.php?cmd=load_object_data&api=true&token=${token}&lng=${language}&address=false`
    );
    const cars = convertObjectToArray(response);

    /*const new_cars = [];

    await Promise.all(cars?.map(async (item) => {
      const adress = await getAdress(item, server_url);
      item['adres'] = adress.address;
      item['speedlimit'] = adress.speedlimit;
      new_cars.push(item);
      return item;
    }));*/


    dispatch({ type: GET_CARS_SUCCESS, payload: cars });
  } catch (e) {
    dispatch({ type: GET_CARS_REJECTED, payload: e.message });
  }finally {
    dispatch({ type: GET_CARS_LOADER, payload: false });
  }
};

export const changeCarName = (name, plate, odometer, imei, token) => async (
  dispatch
) => {
  try {
    dispatch({ type: CHANGE_CAR_NAME_LOADER, payload: true });
    const response = await apiCall(
      `/fn_objects.php?&api=true&token=${token}&imei=${imei}&newname=${name}&plate_number=${plate}&km=${odometer}`
    );

    if (response.status !== 1) throw new Error("Car Name Not Updated");
    dispatch({ type: CHANGE_CAR_NAME_LOADER, payload: false });

    return response;
  } catch (e) {
    dispatch({ type: CHANGE_CAR_NAME_LOADER, payload: false });
  }
};
