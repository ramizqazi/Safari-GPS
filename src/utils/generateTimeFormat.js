/**
 * generate time format
 * @param {string} string
 */
const generateTimeFormat = (string: Array) => {
  const time = string.split('  ').reverse();
  const sec = time[0] ? `${time[0]} s` : '';
  const min = time[1] ? `${time[1]} min` : '';
  const hour = time[2] ? `${time[2]} h` : '';
  return `${hour} ${min} ${sec}`;
};

export default generateTimeFormat;
