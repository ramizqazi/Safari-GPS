// @flow

import * as React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

/* FLow Types
============================================================================= */
type Props = {
  width?: Number,
  height?: number,
  backgroundColor?: string,
  shadow?: boolean,
  title?: string,
  color?: string,
  leftIcon?: string,
  leftIconOnPress: Function,
  rightIcon?: ?string,
  rightIconOnPress: Function,
};

/* =============================================================================
<Header />
============================================================================= */
const Header = ({
  width,
  height,
  backgroundColor,
  shadow,
  title,
  color,
  leftIcon,
  leftIconOnPress,
  rightIcon,
  rightIconOnPress,
}: Props) => (
  <View
    style={[
      {
        backgroundColor: 'transparent',
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'space-between',
        zIndex: 10
      },
      shadow ? shadowObj : null,
    ]}
  >
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <TouchableOpacity
        style={{
          width,
          height,
          margin: 20,
          backgroundColor: "#f9f9f9",
          borderRadius: 50,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={leftIconOnPress}
      >
        <Icon name={leftIcon} size={30} color={color} />
      </TouchableOpacity>
    </View>
    {rightIcon ? (
      <TouchableOpacity
        style={{
          width,
          height,
          margin: 20,
          backgroundColor: "#f9f9f9",
          borderRadius: 50,
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'flex-end'
        }}
        onPress={rightIconOnPress}
      >
        <Icon name={rightIcon} size={30} color={color} />
      </TouchableOpacity>
    ) : null}
  </View>
);

/* FLow Types
============================================================================= */
const shadowObj = {
  shadowColor: '#1e1e1e',
  shadowOffset: { width: 2, height: 2 },
  shadowOpacity: 0.2,
  elevation: 2,
};

/* Default Props
============================================================================= */
Header.defaultProps = {
  width: 60,
  height: 60,
  backgroundColor: 'transparent',
  shadow: false,
  title: '',
  leftIcon: 'subject',
  color: '#707070',
  rightIcon: undefined,
};

/* Exports
============================================================================= */
export default Header;
