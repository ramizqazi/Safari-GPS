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

const DeactiveObject = (props) => {
  const { visible, onClose, imei } = props;

  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState(null);

  const _getData = async () => {
    const { token, language, getCommands } = props;
    const response = await getCommands(token, language);
    return response;
  };

  const sendCommand = useCallback(
    async () => {
      const { sendCmd, token, language, navigation } = props;

      if (imei) {
        setLoader(true);
        await sendCmd(token, language, imei, "relay,0#");

        setTimeout(async () => {
          const response = await _getData();

          const sort = response.sort(function(a, b) {
            return b.cmd_id - a.cmd_id;
          });

          setMessage(sort[0]);
          setLoader(false);
        }, 6000);
      }
    },
    [setLoader, imei, _getData, setMessage]
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
      title={translator.DEACTIVATE_BLOCKAGE}
      animationType="slide"
      headerBackgroundColor={Colors.white}
      headerFontColor={Colors.success}
    >
      <TouchableOpacity
        style={style.inputContainer}
        activeOpacity={0.6}
        onPress={() => sendCommand()}
        disabled={loader}
      >
        <Text style={style.text}>{translator.DEACTIVATE_BLOCKAGE}</Text>
        <Div style={style.icon}>
          {!loader ? (
            <Image
              source={require("./img/pasifBlokaj.png")}
              style={style.size40}
            />
          ) : (
            <ActivityIndicator color={Colors.white} size={20} />
          )}
        </Div>
      </TouchableOpacity>

      {message && (
        <Div>
          <Text
            style={[
              style.text,
              style.messageText,
              message.status === "failed" ? { color: Colors.danger } : {},
              message.status === "success" ? { color: Colors.success } : {},
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
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#83B732",
    borderRadius: 10,
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
)(DeactiveObject);
