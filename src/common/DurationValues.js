import moment from 'moment';


/* =============================================================================
   DURATION VALUES
============================================================================= */
const DurationValues = (type) => {

  if(type==="LastHour"){
    return {
      dtf: moment(Date.now())
      .subtract(1, 'hours')
      .format('YYYY-MM-DD HH:mm'),
    dtt: moment()
      .endOf('day')
      .format('YYYY-MM-DD HH:mm'),
    }
  }else if(type==="Today"){
    return {
      dtf: moment()
    .startOf('day')
    .format('YYYY-MM-DD HH:mm'),
  dtt: moment()
    .endOf('day')
    .format('YYYY-MM-DD HH:mm'),
    }
  }else if(type==="Yesterday"){
    return {
      dtf: moment()
      .subtract(1, 'day')
      .startOf('day')
      .format('YYYY-MM-DD HH:mm'),
    dtt: moment()
      .subtract(1, 'day')
      .endOf('day')
      .format('YYYY-MM-DD HH:mm'),
    }
  }else if(type==="TwoDayAgo"){
    return {
      dtf: moment()
      .subtract(2, 'day')
      .startOf('day')
      .format('YYYY-MM-DD HH:mm'),
    dtt: moment()
      .subtract(2, 'day')
      .endOf('day')
      .format('YYYY-MM-DD HH:mm'),
    }
  }else if(type==="ThreeDayAgo"){
    return {
      dtf: moment()
      .subtract(3, 'day')
      .startOf('day')
      .format('YYYY-MM-DD HH:mm'),
    dtt: moment()
      .subtract(3, 'day')
      .endOf('day')
      .format('YYYY-MM-DD HH:mm'),
    }
  }else if(type==="ThisWeek"){
    return {
      dtf: moment()
      .startOf('week')
      .format('YYYY-MM-DD HH:mm'),
    dtt: moment().format('YYYY-MM-DD HH:mm'),
    }
  }else if(type==="LastWeek"){
    return {
      dtf: moment()
      .subtract(1, 'week')
      .startOf('week')
      .format('YYYY-MM-DD HH:mm'),
    dtt: moment()
      .subtract(1, 'week')
      .endOf('week')
      .format('YYYY-MM-DD HH:mm'),
    }
  }else if(type==="ThisMonth"){
    return {
      dtf: moment()
      .startOf('month')
      .format('YYYY-MM-DD HH:mm'),
    dtt: moment()
      .endOf('day')
      .format('YYYY-MM-DD HH:mm'),
    }
  }else if(type==="LastMonth"){
    return {
      dtf: moment()
      .subtract(1, 'month')
      .startOf('month')
      .format('YYYY-MM-DD HH:mm'),
    dtt: moment()
      .subtract(1, 'month')
      .endOf('month')
      .format('YYYY-MM-DD HH:mm'),
    }
  }

};
export default DurationValues;
