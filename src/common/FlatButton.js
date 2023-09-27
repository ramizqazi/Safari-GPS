// @flow

import * as React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import type {
  ViewStyleProp,
  TextStyleProp,
} from 'react-native/Libraries/StyleSheet/StyleSheet';

/* FLow Types
============================================================================= */
type Props = {
  onPress: Function,
  paddingHorizontal?: number,
  paddingVertical?: number,
  buttonStyle?: ViewStyleProp,
  fontSize?: number,
  color?: string,
  textStyle?: TextStyleProp,
  title: string,
};

/* =============================================================================
<FlatButton />
============================================================================= */
const FlatButton = ({
  onPress,
  paddingHorizontal,
  paddingVertical,
  buttonStyle,
  fontSize,
  color,
  textStyle,
  title,
}: Props) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      {
        paddingHorizontal,
        paddingVertical,
      },
      buttonStyle,
    ]}
  >
    <Text style={[{ fontSize, color }, textStyle]}>{title}</Text>
  </TouchableOpacity>
);

/* Default Props
============================================================================= */
FlatButton.defaultProps = {
  buttonStyle: {},
  color: '#EEE',
  textStyle: {},
};

/* Exports 
============================================================================= */
export default FlatButton;
