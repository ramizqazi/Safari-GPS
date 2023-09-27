import * as React from "react";
import {Picker} from '@react-native-picker/picker';
import { View } from "react-native";

/* flow types
============================================================================= */
type Props = {
  selectedValue: string | number,
  onChange: Function,
  data: Array<Object>,
  width?: number,
  style?: object,
};

/* ============================================================================
  <AndroidPicker />
 ============================================================================= */
const AndroidPicker = ({
  selectedValue,
  onChange,
  data,
  width,
  style,
}: Props) => (
  <View
    style={[
      {
        width: "100%",
        maxWidth: "100%",
        borderWidth: 0.5,
        borderColor: "#CECECE",
        backgroundColor: "#fff",
        color: "#999",
        borderRadius: 10,
      },
      style,
    ]}
  >
    <Picker
      selectedValue={selectedValue}
      onValueChange={(value) => {
        setTimeout(() => {
          onChange(value);
        }, 10);
      }}
    >
      {data?.map((item) => (
        <Picker.Item key={item.key} label={item.label} value={item.value} />
      ))}
    </Picker>
  </View>
);

/* default props
============================================================================= */
AndroidPicker.defaultProps = {
  width: 150,
};

/* export
============================================================================= */
export default AndroidPicker;
