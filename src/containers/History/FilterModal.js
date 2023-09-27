// @flow

import React, { PureComponent } from 'react';
import DatePicker from 'react-native-datepicker';
import { Appearance } from 'react-native-appearance';
import moment from 'moment';
import Dialog from '../../common/Dialog';
import Button from '../../common/Button';
import Picker from '../../common/Picker';
import Div from '../../common/Div';
import Span from '../../common/Span';
import Text from '../../common/Text';

import DurationValues from '../../common/DurationValues';
import { translator } from '../../languages';

/* Flow types
============================================================================= */
type State = {
  imei: string,
  selectedDuration: string,
  dtf: string,
  dtt: string,
  stop: string,
  firstTimeCarSelected: boolean,
};

type Props = {
  visible: boolean,
  buttonLoader: boolean,
  markers: Array<Object>,
  onClose: Function,
  onSearch: (imei: string, dtf: string, dtt: string, stop: number) => any,
};


/* =============================================================================
<FilterModal />
============================================================================= */
class FilterModal extends PureComponent<Props, State> {



  state = {
    imei: '',
    selectedDuration: 'today',
    dtf: DurationValues("Today").dtf,
    dtt: DurationValues("Today").dtt,
    stop: 1,
    firstTimeCarSelected: false,
  };

  /**
   * handle duration values
   * @param {string} value
   */
  _handleDurationValue = (value: string) => {
    switch (value) {
      case 'last hour':
        this.setState({
          dtf: DurationValues("LastHour").dtf,
          dtt: DurationValues("LastHour").dtt,
          selectedDuration: value,
        });
        break;
      case 'today':
        this.setState({
          dtf: DurationValues("Today").dtf,
          dtt: DurationValues("Today").dtt,
          selectedDuration: value,
        });
        
        break;
      case 'yesterday':
        this.setState({
          dtf: DurationValues("Yesterday").dtf,
          dtt: DurationValues("Yesterday").dtt,
          selectedDuration: value,
        });
        break;
      case 'two days ago':
        this.setState({
          dtf: DurationValues("TwoDayAgo").dtf,
          dtt: DurationValues("TwoDayAgo").dtt,
          selectedDuration: value,
        });
        break;
      case 'three days ago':
        this.setState({
          dtf: DurationValues("ThreeDayAgo").dtf,
          dtt: DurationValues("ThreeDayAgo").dtt,
          selectedDuration: value,
        });
        break;
      case 'this week':
        this.setState({
          dtf: DurationValues("ThisWeek").dtf,
          dtt: DurationValues("ThisWeek").dtt,
          selectedDuration: value,
        });
        break;
      case 'last week':
        this.setState({
          dtf: DurationValues("LastWeek").dtf,
          dtt: DurationValues("LastWeek").dtt,
          selectedDuration: value,
        });
        break;
      case 'this month':
        this.setState({
          dtf: DurationValues("ThisMonth").dtf,
          dtt: DurationValues("ThisMonth").dtt,
          selectedDuration: value,
        });
        break;
      case 'last month':
        this.setState({
          dtf: DurationValues("LastMonth").dtf,
          dtt: DurationValues("LastMonth").dtt,
          selectedDuration: value,
        });
        break;
      default:
        this.setState({
          dtf: DurationValues("Today").dtf,
          dtt: DurationValues("Today").dtt,
          selectedDuration: value,
        });
        break;
    }
  };

  /**
   * handle date values
   * @param {string} name
   * @param {string} value
   */
  _handleChangeValue = (name: string, value: string) => {
    this.setState({ [name]: value });
  };

  /**
   * on search values
   */
  _handleSubmit = () => {
    const { onSearch } = this.props;
    const { imei, dtf, dtt, stop } = this.state;
    onSearch({ imei, dtf, dtt, duration: stop });
  };

  render() {
    const { DatePickerStyles, ButtonStyle } = styles;
    const { visible, onClose, markers, buttonLoader } = this.props;
    const {
      imei,
      firstTimeCarSelected,
      selectedDuration,
      dtf,
      dtt,
      stop,
    } = this.state;


    /**
     * car array
     */
    const cars = [];
    markers.forEach(item => {
      cars.push({ key: item.imei, label: item.name, value: item.imei });
    });

    /**
     * select car first time
     */
    if (cars.length > 0 && !firstTimeCarSelected) {

      this.setState({
        imei: cars[0].value,
        firstTimeCarSelected: true,
      });
    }

    /**
     * duration array
     */
    const durations = [
      { key: 1, label: translator.LAST_HOUR, value: 'last hour' },
      { key: 2, label: translator.TODAY, value: 'today' },
      { key: 3, label: translator.YESTERDAY, value: 'yesterday' },
      {
        key: 4,
        label: translator.TWO_DAYS_AGO,
        value: 'two days ago',
      },
      {
        key: 5,
        label: translator.THREE_DAYS_AGO,
        value: 'three days ago',
      },
      { key: 6, label: translator.THIS_WEEK, value: 'this week' },
      { key: 7, label: translator.LAST_WEEK, value: 'last week' },
      { key: 8, label: translator.THIS_MONTH, value: 'this month' },
      { key: 9, label: translator.LAST_MONTH, value: 'last month' },
    ];
    /**
     * stops values
     */
    const stops = [
      { key: 1, label: `1 ${translator.MIN}`, value: 1 },
      { key: 2, label: `2 ${translator.MIN}`, value: 2 },
      { key: 3, label: `3 ${translator.MIN}`, value: 3 },
    ];

    return (
      <Dialog visible={visible} title={translator.FILTER} onClose={onClose}>
        <Div padding={20}>
          <Span justifyContent="space-between" marginVertical={5}>
            <Text>{translator.CAR}</Text>
            <Picker
              data={cars}
              selectedValue={imei}
              cancelText={translator.CANCEL}
              onChange={value => this._handleChangeValue('imei', value)}
              style={{ width: '60%' }}
            />
          </Span>

          <Span justifyContent="space-between" marginVertical={5}>
            <Text>{translator.DURATION}</Text>
            <Picker
              data={durations}
              selectedValue={selectedDuration}
              cancelText={translator.CANCEL}
              onChange={value => this._handleDurationValue(value)}
              style={{ width: '60%' }}
            />
          </Span>

          <Span justifyContent="space-between" marginVertical={5}>
            <Text>{translator.TIME_FROM} </Text>
            <DatePicker
              style={{ maxWidth: '60%', flex: 1 }}
              showIcon={false}
              date={
                selectedDuration === translator.LAST_HOUR
                  ? moment()
                      .subtract(1, 'hours')
                      .format('YYYY-MM-DD HH:mm')
                  : dtf
              }
              mode="datetime"
              placeholder={translator.SELECT_DATE}
              format="YYYY-MM-DD HH:mm"
              confirmBtnText="Confirm"
              cancelBtnText={translator.CANCEL}
              customStyles={DatePickerStyles}
              onDateChange={date => this._handleChangeValue('dtf', date)}
            />
          </Span>

          <Span justifyContent="space-between" marginVertical={5}>
            <Text>{translator.TIME_TO}</Text>
            <DatePicker
              style={{ maxWidth: '60%', flex: 1 }}
              showIcon={false}
              date={dtt}
              mode="datetime"
              placeholder={translator.SELECT_DATE}
              format="YYYY-MM-DD HH:mm"
              confirmBtnText="Confirm"
              cancelBtnText={translator.CANCEL}
              customStyles={DatePickerStyles}
              onDateChange={date => this._handleChangeValue('dtt', date)}
            />
          </Span>

          <Span justifyContent="space-between" marginVertical={5}>
            <Text>{translator.STOP__TIME}</Text>
            <Picker
              data={stops}
              selectedValue={stop}
              cancelText={translator.CANCEL}
              onChange={value => this._handleChangeValue('stop', value)}
              style={{ width: '60%' }}
            />
          </Span>

          <Button
            title={translator.SEE_RESULT}
            loader={buttonLoader}
            onPress={this._handleSubmit}
            buttonStyle={ButtonStyle}
          />
        </Div>
      </Dialog>
    );
  }
}

/* Styles
============================================================================= */
const colorScheme = Appearance.getColorScheme();

const styles = {
  DatePickerStyles: {
    dateInput: {
      backgroundColor: 'rgba(255,255,255,0.8)',
      borderWidth: 0,
      borderBottomWidth: 1,
      borderBottomColor: '#CECECE',
      paddingVertical: 0,
    },
    datePickerCon: {
      backgroundColor: colorScheme === 'dark' ? '#000' : '#fff',
    },
  },
  ButtonStyle: {
    marginTop: 20,
  },
};

/* Export
============================================================================= */
export default FilterModal;
