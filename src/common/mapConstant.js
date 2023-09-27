import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0110;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

/* Export
========================================================== */
export { ASPECT_RATIO, LATITUDE_DELTA, LONGITUDE_DELTA };