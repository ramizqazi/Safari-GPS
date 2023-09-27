// @flow

import React from 'react';
import { Platform } from 'react-native';
import AndroidPicker from './AndroidPicker';
import IosPicker from './IosPicker';

/* flow type
============================================================================= */
type Props = {
  selectedValue: string | number,
  data: Array<Object>,
  onChange: (value: string | number) => any,
  cancelText?: string,
  width?: number,
  style?: object
};

/* =============================================================================
<Picker />
============================================================================= */
const Picker = (props: Props) => {
  const PickerComponent = Platform.OS === 'ios' ? IosPicker : AndroidPicker;
  return <PickerComponent {...props}  />;
};

/* default props
============================================================================= */
Picker.defaultProps = {
  cancelText: 'CANCEL',
  width: 200,
};

/* export
============================================================================= */
export default Picker;
