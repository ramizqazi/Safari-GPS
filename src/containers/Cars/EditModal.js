import React, { useState, useCallback, useEffect } from "react";
import { Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Dialog from "../../common/Dialog";
import Div from "../../common/Div";
import { Colors } from "../../common/Colors";
import { Fonts } from "../../common/Fonts";
import InputText from "../../common/InputText";
import { Ionicons } from "@expo/vector-icons";
import { translator } from "../../languages";
import Toast from "react-native-toast-message";

import { connect } from "react-redux";
import { ActivityIndicator } from "react-native";
import { changeCarName } from "../../actions/tracking_actions";

const EditModal = (props) => {
  const {
    loading,
    visible,
    onClose,
    name,
    plate_number,
    odometer,
    imei,
    onEdit,
    token,
    nameChange,
    plateChange,
    odometerChange,
    loadingChange,
  } = props;

  const [status, setStatus] = useState(null);

  useEffect(
    () => {
      if (imei) {
        setStatus(null);
      }
    },
    [imei]
  );

  const save = useCallback(
    async () => {
      setStatus(null);
      loadingChange(true);
      try {
        const data = await onEdit(name, plate_number, odometer, imei, token);
        if (data.status === 1) {
          Alert.alert(translator.INFORMATION_SUCCESS, "", [
            {
              text: "Ok",
              onPress: () => handleClose(),
            },
          ]);
        }
      } catch (e) {
        setStatus({
          type: "error",
          message: translator.INFORMATION_FAILED,
        });
      } finally {
        loadingChange(false);
      }
    },
    [loadingChange, handleClose, name, plate_number, odometer, imei, token]
  );

  const handleClose = useCallback(
    () => {
      onClose(false);
    },
    [onClose]
  );

  const handlePlateChange = (e) => {
    if (e.length > 11) {
      Alert.alert(translator.PLATE_NUMBER_MAX_LENGTH);
    } else {
      plateChange(e);
    }
  };

  return (
    <Dialog
      visible={visible}
      onClose={() => handleClose()}
      title={`${translator.CAR} ${translator.EDIT}`}
      animationType="slide"
      headerBackgroundColor={Colors.white}
      headerFontColor={Colors.black}
    >
      <Div>
        {status && (
          <Text
            style={[
              style.text,
              status.type === "success" ? style.successText : style.errorText,
            ]}
          >
            {status.message}
          </Text>
        )}

        <InputText
          placeholder={translator.NAME}
          label={translator.NAME}
          returnKeyType="next"
          value={name}
          borderRadius={10}
          onChangeText={(value) => nameChange(value)}
          style={style.input}
        />

        <InputText
          placeholder={translator.PLATE}
          label={translator.PLATE}
          returnKeyType="next"
          value={plate_number}
          borderRadius={10}
          onChangeText={(value) => handlePlateChange(value)}
          style={style.input}
        />

        <InputText
          placeholder={translator.ODOMETER}
          label={translator.ODOMETER}
          returnKeyType="next"
          value={odometer}
          borderRadius={10}
          onChangeText={(value) => odometerChange(value)}
          style={style.input}
        />

        <TouchableOpacity
          activeOpacity={0.6}
          style={style.button}
          onPress={() => save()}
        >
          <Text style={style.buttonText}>{translator.SAVE}</Text>
          {(loading && (
            <ActivityIndicator size={20} color={Colors.white} />
          )) || <Ionicons name="save-outline" color={Colors.white} size={17} />}
        </TouchableOpacity>
      </Div>
    </Dialog>
  );
};

const style = StyleSheet.create({
  text: {
    fontFamily: Fonts.regular,
    color: Colors.white,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 50,
    textAlign: "center",
    marginBottom: 15,
    fontSize: 16,
  },
  successText: {
    backgroundColor: Colors.success,
  },
  errorText: {
    backgroundColor: Colors.danger,
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    marginTop: 20,
    paddingHorizontal: 10,
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontFamily: Fonts.regular,
    color: Colors.white,
    marginRight: 10,
    fontSize: 16,
  },
  input: {
    fontSize: 15,
    fontFamily: Fonts.regular,
    paddingVertical: 5,
  },
});

const mapStateToProps = ({ Auth, Setting }) => ({
  language: Setting.language,
  token: Auth.user.token,
});

const mapDispatchToProps = (dispatch) => ({
  onEdit: (name, plate, odometer, imei, token) =>
    dispatch(changeCarName(name, plate, odometer, imei, token)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditModal);
