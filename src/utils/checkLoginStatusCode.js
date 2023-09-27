/**
 * checking the status
 * @param {*} status
 */
const checkLoginStatusCode = status => {
  let message = '';
  switch (status) {
    case 0:
      message = 'Failed - Error';
      break;
    case 1:
      message = 'Login Success';
      break;
    case 2:
      message = 'Locked Account';
      break;
    case 3:
      message = 'Unsuccessful - Wrong username/password';
      break;
    default:
      message = 'Failed - Error';
  }
  if (message !== 'Login Success') {
    throw new Error(message);
  }
};

export default checkLoginStatusCode;
