import React, { useState, useCallback } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import Dialog from "../../common/Dialog";
import Div from "../../common/Div";
import { Colors } from "../../common/Colors";
import { Fonts } from "../../common/Fonts";
import { Ionicons } from "@expo/vector-icons";
import { translator } from "../../languages";
import {
  sendCommand,
  getSentCommands,
} from "../../actions/object_control_actions";
import { connect } from "react-redux";
import { ActivityIndicator } from "react-native";
import apiCall from "../../utils/apiCall";

const ActiveObject = (props) => {
  const { visible, onClose, imei, username } = props;

  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState(null);
  const [wrongPassword, setWrongPassword] = useState("");
  const [password, setPassword] = useState("");

  const _getData = async () => {
    const { token, language, getCommands } = props;
    const response = await getCommands(token, language);
    return response;
  };

  const sendCommand = useCallback(
    async () => {
      setLoader(true);
      const userCheck = await apiCall(
        `/fn_connect.php?cmd=react_app_blokaj_pw&username=${username}&password=${password}`
      );

      if (userCheck.username === username) {
        setWrongPassword("");
        const { sendCmd, token, language, navigation } = props;

        if (imei) {
          await sendCmd(token, language, imei, "relay,1#");

          setTimeout(async () => {
            const response = await _getData();
            const sort = response.sort(function(a, b) {
              return b.cmd_id - a.cmd_id;
            });
            setMessage(sort[0]);
            setLoader(false);
            setPassword("");
          }, 6000);
        }
      } else {
        setWrongPassword(translator.PLEASE_ENTER_PASSWORD);
        setPassword("");
        setLoader(false);
      }
    },
    [
      setLoader,
      imei,
      _getData,
      setMessage,
      username,
      password,
      setWrongPassword,
      setPassword,
    ]
  );

  const handleClose = useCallback(
    () => {
      setMessage(null);
      onClose(false);
    },
    [setMessage, onClose]
  );

  return (
    <Dialog
      visible={visible}
      onClose={() => handleClose()}
      title={translator.ACTIVATE_BLOCKAGE}
      animationType="slide"
      headerBackgroundColor={Colors.white}
      headerFontColor={Colors.danger}
    >
      {wrongPassword ? (
        <Div>
          <Text style={[style.text, style.wrongPassword]}>{wrongPassword}</Text>
        </Div>
      ) : null}

      <Div style={style.inputContainer}>
        <TextInput
          placeholder={translator.PASSWORD}
          secureTextEntry={true}
          style={style.input}
          value={password}
          onChange={(e) => setPassword(e.nativeEvent.text)}
        />
        <TouchableOpacity
          onPress={() => sendCommand()}
          activeOpacity={0.6}
          disabled={loader}
          style={[style.icon, style.size40, { borderRadius: 5 }]}
        >
          {!loader ? (
            <Image
              source={require("./img/aktifBlokaj.png")}
              style={style.size40}
            />
          ) : (
            <ActivityIndicator color={Colors.white} size={20} />
          )}
        </TouchableOpacity>
      </Div>

      {message && (
        <Div>
          <Text
            style={[
              style.text,
              style.messageText,
              message.status === "failed" && { color: Colors.danger },
              message.status === "success" && { color: Colors.success },
            ]}
          >
            {message.status === "failed" &&
              `${translator.OOPS_ERROR_MESSAGE} ${translator.TRY_AGAIN}`}

            {message.status === "success" && (
              <>
                {message.response.split(" ")[0] !== "Already"
                  ? translator.BLOCKAGE_SUCCESS
                  : translator.BLOCKAGE_ALREADY_ACTIVE}
              </>
            )}
          </Text>
        </Div>
      )}
    </Dialog>
  );
};

const style = StyleSheet.create({
  icon: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: "#B32C1C",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: Fonts.regular,
    color: Colors.white,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    borderWidth: 0.4,
    borderColor: "#727272",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: "85%",
    marginRight: 10,
  },
  wrongPassword: {
    color: Colors.danger,
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
  size40: { width: 40, height: 40 },
  messageText: {
    color: "#999",
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
});

/* map state to props
============================================================================= */
const mapStateToProps = ({ Auth, ObjectControl, Setting }) => ({
  username: Auth.user.username,
  token: Auth.user.token,
  language: Setting.language,
  commandList: ObjectControl.sentCommandsList,
});

/* map dispatch to props
============================================================================= */
const mapDispatchToProps = {
  getCommands: getSentCommands,
  sendCmd: sendCommand,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActiveObject);
