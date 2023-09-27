// @flow

import * as React from "react";
import { View, Text, TextInput } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Colors } from "./Colors";
import { Fonts } from "./Fonts";

/* FLow Types
============================================================================= */
type State = {
  active: boolean,
};

type KeyboardType = "default" | "email-address" | "numeric" | "phone-pad";
type KeyboardTypeIOS =
  | "ascii-capable"
  | "numbers-and-punctuation"
  | "url"
  | "number-pad"
  | "name-phone-pad"
  | "decimal-pad"
  | "twitter"
  | "web-search";
type KeyboardTypeAndroid = "visible-password";
type KeyboardTypeOptions = KeyboardType | KeyboardTypeAndroid | KeyboardTypeIOS;

type ReturnKeyType =
  // Cross Platform
  | "done"
  | "go"
  | "next"
  | "search"
  | "send"
  // Android-only
  | "none"
  | "previous"
  // iOS-only
  | "default"
  | "emergency-call"
  | "google"
  | "join"
  | "route"
  | "yahoo";

type Props = {
  marginVertical?: number,
  labelSize: number,
  labelColor?: string,
  label?: ?string,
  backgroundColor?: string,
  iconName?: ?string,
  reference?: ?Function,
  placeholder?: string,
  placeholderTextColor: string,
  value?: ?string,
  onChange: Function,
  onChangeText: Function,
  onSubmitEditing?: Function,
  secureTextEntry?: boolean,
  multiline?: boolean,
  editable?: boolean,
  returnKeyType?: ReturnKeyType,
  keyboardType?: KeyboardTypeOptions,
  borderRadius?: number,
  autoFocus?: boolean,
  autoCapitalize?: string,
  color: string,
  style?: Object,
};

/* =============================================================================
<InputText />
============================================================================= */
class InputText extends React.PureComponent<Props, State> {
  /**
   * Default Props
   */
  static defaultProps = {
    marginVertical: 5,
    labelColor: "#696969",
    backgroundColor: "transparent",
    label: null,
    iconName: null,
    iconType: "default",
    reference: null,
    placeholder: "",
    value: "",
    onSubmitEditing: () => {},
    secureTextEntry: false,
    multiline: false,
    autoCapitalize: "sentences",
    editable: true,
    returnKeyType: "default",
    keyboardType: "default",
    borderRadius: 50,
    autoFocus: false,
  };

  /**
   * State Here
   */
  state = { active: false };

  /**
   * Start render method
   */
  render() {
    const { active } = this.state;
    const {
      autoCapitalize,
      marginVertical,
      labelSize,
      labelColor,
      label,
      backgroundColor,
      iconName,
      iconText,
      reference,
      placeholder,
      placeholderTextColor,
      value,
      onChange,
      onChangeText,
      onSubmitEditing,
      secureTextEntry,
      multiline,
      editable,
      returnKeyType,
      keyboardType,
      borderRadius,
      autoFocus,
      color,
      style,
    } = this.props;
    return (
      <View style={{ marginVertical }}>
        {label ? (
          <Text
            style={{
              fontSize: labelSize,
              color: labelColor,
              fontFamily: Fonts.regular,
            }}
          >
            {label}
          </Text>
        ) : null}
        <View
          style={{
            backgroundColor: editable ? backgroundColor : "#eee",
            borderWidth: 1,
            borderRadius: borderRadius,
            borderColor: active ? Colors.primary : "#ddd",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {iconName ? (
            <View
              style={{
                padding: 8,
                paddingLeft: 15,
              }}
            >
              {!iconText ? (
                <Icon name={iconName} style={{ fontSize: 20, color }} />
              ) : (
                <Text style={{ fontSize: 20, fontFamily: Fonts.bold }}>{iconText}</Text>
              )}
            </View>
          ) : null}
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              paddingHorizontal: 15,
            }}
          >
            <TextInput
              ref={reference}
              placeholder={placeholder}
              placeholderTextColor={editable ? placeholderTextColor : "#727272"}
              value={value}
              onChange={onChange}
              onChangeText={onChangeText}
              onSubmitEditing={onSubmitEditing}
              onFocus={() => this.setState({ active: true })}
              onBlur={() => this.setState({ active: false })}
              autoCorrect={false}
              secureTextEntry={secureTextEntry}
              underlineColorAndroid="transparent"
              multiline={multiline}
              editable={editable}
              returnKeyType={returnKeyType}
              keyboardType={keyboardType}
              autoFocus={autoFocus}
              autoCapitalize={autoCapitalize}
              style={[
                {
                  fontSize: 17,
                  paddingVertical: 8,
                  fontFamily: Fonts.regular,
                  color,
                },
                style && style,
              ]}
            />
          </View>
        </View>
      </View>
    );
  }
}

/* Exports
============================================================================= */
export default InputText;
