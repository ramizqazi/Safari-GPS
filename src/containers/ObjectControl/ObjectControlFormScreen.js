import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Alert } from "react-native";
import Container from "../../common/Container";
import Content from "../../common/Content";
import Fab from "../../common/Fab";
import Button from "../../common/Button";
import Picker from "../../common/Picker";
import Span from "../../common/Span";
import Text from "../../common/Text";
import { Fonts } from "../../common/Fonts";
import { translator } from "../../languages";
import { getCommands, sendCommand } from "../../actions/object_control_actions";

/* =============================================================================
<ObjectControlFormScreen />
============================================================================= */
const ObjectControlFormScreen = (props) => {
  const [imei, setImei] = useState("");
  const [command, setCommand] = useState("");

  useEffect(() => {
    const { token, language, getCommandsData } = props;
    getCommandsData(token, language);
  }, []);

  const _handleSubmit = async () => {
    const { sendCmd, token, language, navigation } = props;

    if (imei && command) {
      const done = await sendCmd(token, language, imei, command);
      if (done) {
        navigation.navigate("ObjectControlList");
      }
    } else if (imei == "") {
      Alert.alert(translator.PLEASE_SELECT_CAR);
    } else if (command == "") {
      Alert.alert(translator.PLEASE_SELECT_COMMAND);
    }
  };

  const _moveBack = () => {
    navigation.navigate("ObjectControlList");
  };

  const { cars, commands, loader, navigation } = props;

  return (
    <Container>
      <Fab
        onPress={_moveBack}
        icon="arrow-back"
        xPosition="left"
        yPosition="top"
      />

      <Content padding={20} paddingVertical={100}>
        <Span justifyContent="space-between" marginVertical={5}>
          <Text style={style.text}>{translator.CAR}</Text>
          <Picker
            data={cars}
            selectedValue={imei}
            cancelText={translator.CANCEL}
            onChange={(value) => setImei(value)}
          />
        </Span>

        <Span justifyContent="space-between" marginVertical={5}>
          <Text style={style.text}>{translator.COMMAND}</Text>
          <Picker
            data={commands}
            selectedValue={command}
            cancelText={translator.CANCEL}
            onChange={(value) => setCommand(value)}
          />
        </Span>

        <Button
          loader={loader}
          marginVertical={20}
          title={translator.SEND}
          onPress={_handleSubmit}
        />
      </Content>
    </Container>
  );
};

const style = {
  text: {
    fontFamily: Fonts.regular,
    marginBottom: 5,
  }
};

const mapStateToProps = ({ Auth, Tracking, ObjectControl, Setting }) => ({
  token: Auth.user.token,
  language: Setting.language,
  loader: ObjectControl.loader,
  commands: ObjectControl.commands,
  cars: Tracking.cars.map((item) => ({
    key: item.imei,
    label: item.name,
    value: item.imei,
  })),
});

/* map dispatch to props
============================================================================= */
const mapDispatchToProps = {
  getCommandsData: getCommands,
  sendCmd: sendCommand,
};

/* export
============================================================================= */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ObjectControlFormScreen);
