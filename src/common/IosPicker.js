// @flow

import React from "react";
import { Modal, ScrollView, View, TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

/* flow type
============================================================================= */

type Props = {
  selectedValue: string | number,
  data: Array<Object>,
  onChange: (value: string | number) => any,
  cancelText?: string,
  width?: number,
  style?: object,
};

/* =============================================================================
<IosPicker />
============================================================================= */
class IosPicker extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  _handleOpenModal = () => {
    this.setState({ visible: true });
  };

  _handleCloseModal = () => {
    this.setState({ visible: false });
  };

  /**
   * when user select option
   */
  _handleSelect = (value: string | number) => {
    const { onChange } = this.props;
    onChange(value);
    this._handleCloseModal();
  };

  render() {
    const { visible } = this.state;
    const { selectedValue, data, cancelText, width, style } = this.props;
    const value = data.filter((item) => item.value === selectedValue)[0];
    if (visible) {
      return (
        <Modal visible={visible} transparent onRequestClose={() => null}>
          <View
            style={{
                flex: 1,
                backgroundColor: "rgba(0,0,0,0.8)",
                paddingHorizontal: 30,
                paddingVertical: 100,
                justifyContent: "center",
              }}
          >
            <View style={{ backgroundColor: "transparent", flex: 1 }}>
              <View
                style={{ backgroundColor: "#FFF", flex: 1, borderRadius: 10 }}
              >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                  {data.map((item) => (
                    <TouchableOpacity
                      style={{
                        padding: 10,
                        justifyContent: "center",
                        alignItems: "center",
                        borderBottomWidth: 1,
                        borderBottomColor: "#CECECE",
                      }}
                      key={item.key}
                      onPress={() => this._handleSelect(item.value)}
                    >
                      <Text numberOfLines={1}>{item.label}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 15,
                  borderRadius: 10,
                  marginTop: 20,
                  backgroundColor: "#FFF",
                }}
                onPress={this._handleCloseModal}
              >
                <Text>{cancelText}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      );
    }
    return (
      <TouchableOpacity
        style={[
          {
            width: "100%",
            paddingVertical: 8,
            paddingLeft: 20,
            paddingHorizontal: 10,
            marginVertical: 5,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#CECECE",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          },
          style
        ]}
        onPress={this._handleOpenModal}
      >
        <Text>{value && value.label}</Text>
        <Icon color="#CECECE" size={22} name="arrow-drop-down" />
      </TouchableOpacity>
    );
  }
}

/* default props
============================================================================= */
IosPicker.defaultProps = {
  cancelText: "CANCEL",
  width: 200,
};

/* export
============================================================================= */
export default IosPicker;
