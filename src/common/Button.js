import * as React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Platform,
} from 'react-native';
import type {
  ViewStyleProp,
  TextStyleProp,
} from 'react-native/Libraries/StyleSheet/StyleSheet';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Fonts } from './Fonts'
import { Colors } from './Colors'

/* Flow types
========================================================================= */
type Props = {
  disabled?: boolean,
  width?: number | string,
  height?: number,
  minWidth?: number,
  backgroundColor?: string,
  paddingVertical?: number,
  paddingHorizontal?: number,
  marginVertical?: number,
  marginHorizontal?: number,
  rounded?: boolean,
  borderRadius: number,
  onPress: Function,
  buttonStyle?: ViewStyleProp,
  iconName?: string,
  loader?: Boolean,
  color?: string,
  fontSize?: number,
  bold?: Boolean,
  title: string,
  textStyle?: TextStyleProp,
};

/* =============================================================================
<Button />
============================================================================= */
const Button = ({
  disabled,
  width,
  height,
  minWidth,
  backgroundColor,
  paddingVertical,
  paddingHorizontal,
  marginVertical,
  marginHorizontal,
  rounded,
  borderRadius,
  onPress,
  buttonStyle,
  iconName,
  loader,
  color,
  fontSize,
  bold,
  title,
  textStyle,
}: Props) => (
  <TouchableOpacity
    disabled={loader || disabled}
    style={[
      {
        minWidth,
        width,
        height,
        flexDirection: 'row',
        backgroundColor,
        paddingVertical,
        paddingHorizontal,
        marginVertical,
        marginHorizontal,
        borderRadius: rounded ? 50 : borderRadius,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: { height: 2, width: 2 },
        shadowOpacity: 0.5,
        shadowColor: '#1E1E1E',
        elevation: 3,
      },
      buttonStyle || null,
    ]}
    onPress={onPress}
    activeOpacity={0.8}
  >
    {iconName && !loader ? (
      <Icon name={iconName} style={{ color, fontSize: 20 }} />
    ) : null}
    {loader ? (
      <ActivityIndicator
        size={Platform.OS === 'android' && fontSize + 5}
        color={color}
      />
    ) : (
      <Text
        style={[
          {
            color,
            fontSize,
            fontFamily: bold ? Fonts.bold : Fonts.regular,
            marginLeft: 5,
          },
          textStyle,
        ]}
      >
        {title}
      </Text>
    )}
  </TouchableOpacity>
);

Button.defaultProps = {
  disabled: false,
  minWidth: 60,
  height: 40,
  width: null,
  backgroundColor: Colors.primary,
  paddingVertical: 10,
  paddingHorizontal: 12,
  marginVertical: null,
  marginHorizontal: null,
  rounded: true,
  buttonStyle: {},
  iconName: null,
  loader: false,
  color: Colors.white,
  fontSize: 15,
  bold: false,
  textStyle: {},
};

export default Button;
