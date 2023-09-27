import apiCall from '../utils/apiCall';

/**
 * get maintenance
 */
export const getMaintenanceStatus = () => async dispatch => {
  let response;
  try {
    response = await apiCall(`/react_maintenance.php`);
    if (response.status === 1) return response;
    return null;
  } catch (e) {
    return null;
  }
};
