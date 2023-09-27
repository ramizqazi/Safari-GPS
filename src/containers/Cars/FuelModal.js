import React, { useCallback } from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import Dialog from "../../common/Dialog";
import Div from "../../common/Div";
import { Colors } from "../../common/Colors";
import { Fonts } from "../../common/Fonts";
import { translator } from "../../languages";
import { connect } from "react-redux";

const FuelModal = (props) => {
  const { visible, onClose, average_fuel, brand, model } = props;

  const handleClose = useCallback(
    () => {
      onClose(false);
    },
    [onClose]
  );

  return (
    <Dialog
      visible={visible}
      onClose={handleClose}
      title={`${brand} ${model}`}
      animationType="slide"
      headerBackgroundColor={Colors.white}
      headerFontColor={Colors.black}
    >
      <Div>
        <Text style={[style.text, style.averageText]}>
          {`${translator.AVG_SPEED} ${
            translator.FUEL_CONSUMPTION
          }:  ${average_fuel} lt / 100 km`}
        </Text>
        <Text style={[style.text, style.modalText]}>
          {translator.FUEL_MODAL_TEXT}
        </Text>
      </Div>
    </Dialog>
  );
};

const style = StyleSheet.create({
  text: {
    fontFamily: Fonts.regular,
    color: Colors.white,
  },
  averageText: {
    fontSize: 16,
    textAlign: "center",
    backgroundColor: Colors.primary,
    color: Colors.white,
    padding: 10,
    borderRadius: 10,
  },
  modalText: {
    marginTop: 10,
    fontSize: 12,
    textAlign: "center",
    color: Colors.black,
  },
});

const mapStateToProps = ({ Auth, Setting }) => ({
  language: Setting.language,
});

export default connect(mapStateToProps)(FuelModal);
