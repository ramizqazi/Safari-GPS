import AsyncStorage from '@react-native-async-storage/async-storage';

/* ============================================================================= 
 Call Function for create HTTP Request 
============================================================================= */
const apiCall = async (baseUrl, method, body, excludeHeaders, credentials) => {
  /**
   * checking the response status
   * if the status is under 200 to 300 then fine
   * otherwise throw an error
   * @param {Response} response
   * @return {Response}
   */
  const checkStatus = response => {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }

    const error = new Error(response.message || response.statusText);
    error.response = response;
    throw error;
  };

  /**
   * convert response to json format
   * @param {Response} response
   * @return {Response}
   */
  const parseJSON = response => response.json();

  /**
   * config object
   */
  const config = {
    method: 'get',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
  };

  if (method) {
    config.method = method;
  }

  if (body) {
    config.body = JSON.stringify(body);
  }

  if (excludeHeaders) {
    delete config.headers.authorization;
  }

  if (credentials) {
    config.credentials = credentials;
  }

  let ROOT_URL = '';

  const SERVER_URL = await AsyncStorage.getItem('server_url');

  if (SERVER_URL) {
    ROOT_URL = `${SERVER_URL}/func`;
  }

  // console.log(`${ROOT_URL}${baseUrl}`);

  let response;
  try {
    response = await fetch(`${ROOT_URL}${baseUrl}`, config);
    response = await checkStatus(response);
    response = await parseJSON(response);
    // console.log('RESPONSE', response);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export default apiCall;
