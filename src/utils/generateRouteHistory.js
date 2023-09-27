import moment from 'moment';
import generateTimeFormat from './generateTimeFormat';
/**
 *  generate route history
 * @param {Response} response
 */

const generateRouteHistory = response => {
  let history = [];
  let routes = [];
  let polyline = [];
  let events = [];
  let stops = [];
  let drives = [];
  let details = {};
  /**
   * routes
   */
  if (response.route) {
    routes = response.route.map(route => {
      const time = route[0];
      const latitude = Number(route[1]);
      const longitude = Number(route[2]);
      const speed = Number(route[5]);
      const coords = { latitude, longitude };
      return { route: true, image: 'route', time, speed, coords };
    });
  }
  /**
   * route polyline
   */
  if (response.route) {
    polyline = routes.map(route => ({ ...route.coords }));
  }
  /**
   * events
   */
  if (response.events) {
    events = response.events.map(event => {
      const name = event[0];
      const time = event[1];
      const latitude = Number(event[2]);
      const longitude = Number(event[3]);
      const speed = Number(event[6]);
      const coords = { latitude, longitude };
      return {
        event: true,
        image: 'event',
        name,
        time,
        speed,
        coords,
      };
    });
  }
  /**
   * stops
   */
  if (response.stops) {
    stops = response.stops.map(stop => {
      const stayTime = generateTimeFormat(stop[8]);
      const startTime = stop[7];
      const time = stop[6];
      const latitude = Number.parseFloat(stop[2]);
      const longitude = Number.parseFloat(stop[3]);
      const coords = { latitude, longitude };
      return {
        stop: true,
        image: 'stop',
        time,
        stayTime,
        startTime,
        coords,
      };
    });
  }
  /**
   * drives
   */
  if (response.drives) {
    drives = response.drives.map(drive => {
      const coords = [];
      routes.forEach(route => {
        if (
          moment(route.time) >= moment(drive[3]) &&
          moment(route.time) <= moment(drive[5])
        ) {
          coords.push({ ...route.coords });
        }
      });
      const time = drive[4];
      const driveTime = generateTimeFormat(drive[6]);
      return { drive: true, image: 'drive', time, driveTime, coords };
    });
  }

  /**
   * merge all routes
   */
  history = [
    { ...routes[0], image: 'start' },
    ...events,
    ...stops,
    ...drives,
    { ...routes[routes.length - 1], image: 'end' },
  ];

  /**
   * sort by time
   */
  history = history.sort((a, b) => {
    if (a.time > b.time) {
      return 1;
    }
    if (b.time > a.time) {
      return -1;
    }
    return 0;
  });

  /**
   * route details
   */
  delete response.route;
  delete response.events;
  delete response.stops;
  delete response.events;
  details = response;

  return { history, routes, polyline, events, stops, drives, details };
};

export default generateRouteHistory;
