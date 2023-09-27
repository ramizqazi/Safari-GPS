import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import style from './CarsStyle';
import 'moment/locale/tr';
import { translator } from '../../languages';
import Plaka from '../../common/Plaka';
import { getAddress } from '../../actions/tracking_actions';

const Colors = {
  grey: '#8a8a8a',
  darkGrey: '#4a4a4a',
  success: '#4E9F3D',
  darkSuccess: '#1E5128',
  warning: '#e5c264',
  darkWarning: '#aa975c',
  danger: '#CA0B00',
  darkDanger: '#8a0b00',
};

const Card = ({ car, index, arr, handleCarDetail, navigation }) => {

  const [address, setAddress] = useState({ address: `${translator.LOADING}...`, speedlimit: 0 });
  const [addressActive, setAddressActive] = useState(true);


  useEffect(() => {
    const fetchAddress = async () => {
      const adres = await getAddress(car, addressActive);
      setAddress(adres);
    }
    fetchAddress();
  }, [car])

  useEffect(() => {
    const addressBlurHandler = navigation.addListener('blur', () => {
      setAddressActive(false);
    });

    const addressFocusHandler = navigation.addListener('focus', () => {
      setAddressActive(true);
    });

    return addressBlurHandler;
    return addressFocusHandler;
  }, [navigation]);


  const getIconColor = status => {
    if (status === 'moving') {
      return Colors.success;
    }
    if (status === 'stopped' || status === 'off') {
      return Colors.danger;
    }
    if (status === 'idle') {
      return Colors.warning;
    }
  };

  const getTextColor = status => {
    if (status === 'moving') {
      return style.openText;
    }
    if (status === 'stopped' || status === 'off') {
      return style.offText;
    }
    if (status === 'idle') {
      return style.iddleText;
    }
    return style.iddleText;
  };

  const getSubTextColor = status => {
    if (status === 'moving') {
      return style.onWayText;
    }
    if (status === 'stopped' || status === 'off') {
      return style.offWayText;
    }
    if (status === 'idle') {
      return style.rolantiWayText;
    }
    return style.rolantiWayText;
  };

  return (
    <TouchableOpacity
      style={[
        style.card,
        index === 0 && {
          borderTopWidth: 1,
          borderRightWidth: 1,
          borderLeftWidth: 1,
          borderColor: '#eee',
          borderTopRightRadius: 5,
          borderTopLeftRadius: 5,
        },
        index === arr.length - 1 && {
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
        },
      ]}
      activeOpacity={0.6}
      onPress={() => handleCarDetail(car)}
    >
      <View style={style.rowAlign}>
        <View style={style.row}>
          <Ionicons name="person-outline" color={Colors.grey} size={15} />
          <Text style={style.text}>{car.name}</Text>
        </View>

        <View style={style.row}>
          <Ionicons name="speedometer-outline" color={Colors.grey} size={15} />
          <Text style={style.text}>
            {car.speed} {translator.KPH}
          </Text>
        </View>

        {car.plate_number !== '' && (
          <Plaka plaka={car.plate_number} visible={!!car.plate_number} />
        )}

        {/* {!car.plate_number ? (
          <View style={style.row}>
            <Ionicons name="locate-outline" color={Colors.grey} size={15} />
            <Text style={style.text}>
              {car.odometer} {translator.KM}
            </Text>
          </View>
        ) : null} */}
      </View>

      <View style={style.rowAlign}>
        <View style={style.row}>
          <Ionicons
            name="information-circle-outline"
            color={getIconColor(car.status)}
            size={15}
          />
          <View>
            <Text style={[style.text, getTextColor(car.status)]}>
              {car.status === 'moving' || car.status === 'idle'
                ? translator.ACC_OPEN
                : translator.ACC_OFF}
            </Text>
            <Text style={[style.text, getSubTextColor(car.status)]}>
              {car.status_time}
            </Text>
          </View>
        </View>

        {/* {car.plate_number ? (
          <View style={style.row}>
            <Ionicons name="locate-outline" color={Colors.grey} size={15} />
            <Text style={style.text}>
              {car.odometer} {translator.KM}
            </Text>
          </View>
        ) : null} */}

        <View style={style.row}>
          <Ionicons name="calendar-outline" color={Colors.grey} size={15} />
          <Text style={style.text}>
            {car.daily_odometer} {translator.KM}
          </Text>
        </View>
      </View>

      <View style={style.row}>
        <Ionicons name="location-outline" size={15} color={Colors.grey} />
        <Text style={style.text}>{address.address}</Text>
      </View>
    </TouchableOpacity>
  );
};

const mapStateToProps = ({ Auth }) => ({
  token: Auth.user.token,
  server_url: Auth.user.server_url,
});

export default connect(mapStateToProps)(Card);
