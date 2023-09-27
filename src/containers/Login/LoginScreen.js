import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Image,
  Platform,
  KeyboardAvoidingView,
  View,
  Text,
  ScrollView,
  StatusBar,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Container from "../../common/Container";
import Div from "../../common/Div";
import InputText from "../../common/InputText";
import Button from "../../common/Button";
import FlatButton from "../../common/FlatButton";
import LanguageModal from "./LanguageModal";
import Fab from "../../common/Fab";
import Picker from "../../common/Picker";
import logoImage from "../../common/img/logo.png";
import { translator } from "../../languages";
import styles from "./LoginStyle";
import Toast from "react-native-toast-message";
import { deviceId } from '../../utils/deviceId';

import { login, demoLogin } from "../../actions/auth_actions";
import { Colors } from "../../common/Colors";

type Props = {
  loginLoader: boolean,
  demoLoginLoader: boolean,
  loginFailed: boolean,
  userLogin: Function,
  demoUserLogin: Function,
};
/* =============================================================================
<LoginScreen />
============================================================================= */
class LoginScreen extends Component<Props> {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      server: "",
      languageModalVisible: false,
    };
    this.InputText1 = null;
    this.InputText2 = null;
  }

  componentDidMount() {
    this._isLanguageAskedBefore();
  }

  _isLanguageAskedBefore = async () => {
    const languageAskedBefore = await AsyncStorage.getItem(
      "languageAskedBefore"
    );
    //await AsyncStorage.removeItem('languageAskedBefore');
    if (!languageAskedBefore) {
      this.setState({ languageModalVisible: true });
      await AsyncStorage.setItem("languageAskedBefore", "true");
    } else {
      this.setState({ languageModalVisible: false });
    }
  };

  /**
   * changing the input values
   */
  _handleChangeValue = (name: string, value: string) => {
    this.setState({ [name]: value });
  };

  /**
   * handle login
   */
  _handleLogin = () => {
    const { username, password, server } = this.state;
    const { userLogin } = this.props;
    if (username && password && server) {
      userLogin({ username, password, server });
    } else if (!username) {
      Toast.show({
        type: "error",
        text1: translator.PLEASE_ENTER_USERNAME,
      });
    } else if (!password) {
      Toast.show({
        type: "error",
        text1: translator.PLEASE_ENTER_PASSWORD,
      });
    } else if (!server) {
      Toast.show({
        type: "error",
        text1: translator.PLEASE_SELECT_SERVER,
      });
    }
  };

  /**
   * handle demo login
   */
  _handleDemoLogin = () => {
    const { server } = this.state;
    const { demoUserLogin } = this.props;

    if (server) {
      demoUserLogin({ server });
    } else {
      Toast.show({
        type: "error",
        text1: translator.PLEASE_SELECT_SERVER,
      });
    }
  };

  /**
   * handle forgot password
   */
  _handleForgotPassword = () => {
    const { navigation } = this.props;
    navigation.navigate("ForgotPassword");
  };

  _handleOpenLanguageModal = () => {
    this.setState({ languageModalVisible: true });
  };

  _handleCloseLanguageModal = () => {
    this.setState({ languageModalVisible: false });
  };

  render() {
    const { LogoImgStyle, ContainerStyle, ButtonStyle, ContainerBox } = styles;
    const { username, password, languageModalVisible, server } = this.state;
    const { loginLoader, demoLoginLoader, loginFailed } = this.props;
    const {
      USER_NAME,
      PASSWORD,
      LOGIN,
      LOGIN_WITH_DEMO_ACCOUNT,
      FORGOT_PASSWORD,
    } = translator;

    const servers = [
      { key: 0, label: translator.PLEASE_SELECT_SERVER, value: "" },
      { key: 1, label: `DE Server 🇩🇪`, value: "de" },
      { key: 2, label: `TR Server 🇹🇷`, value: "tr" }
    ];

    if(loginFailed) {
      Toast.show({
        type: "error",
        text1: translator.PLEASE_ENTER_PASSWORD_CORRECT,
      });
    }

    return (
      <Container style={ContainerStyle}>
        <Div style={{ zIndex: 9999 }}>
          <Toast />
        </Div>

        <StatusBar backgroundColor={Colors.primary} />
        <View style={ContainerBox}>
          <Image source={logoImage} style={LogoImgStyle} resizeMode="contain" />
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >


            <Picker
              data={servers}
              selectedValue={server}
              cancelText={translator.CANCEL}
              onChange={(value) => this._handleChangeValue("server", value)}
              style={{
                width: "100%",
                borderWidth: 1,
                borderColor: "#eee",
                borderBottomWidth: 0.2,
                marginBottom: 5,
              }}
            />

            <InputText
              reference={(input) => {
                this.InputText1 = input;
              }}
              color="#727272"
              iconName="person"
              placeholder={USER_NAME}
              placeholderTextColor="#727272"
              value={username}
              onChangeText={(value) =>
                this._handleChangeValue("username", value)
              }
              returnKeyType="next"
              autoCapitalize="none"
              onSubmitEditing={() => {
                this.InputText2.focus();
              }}
            />
            <InputText
              reference={(input) => {
                this.InputText2 = input;
              }}
              color="#727272"
              iconName="lock"
              placeholder={PASSWORD}
              placeholderTextColor="#727272"
              secureTextEntry
              value={password}
              onChangeText={(value) =>
                this._handleChangeValue("password", value)
              }
              returnKeyType="done"
              autoCapitalize="none"
              onSubmitEditing={this._handleLogin}
            />

            <Button
              title={LOGIN}
              disabled={loginLoader || demoLoginLoader}
              loader={loginLoader}
              onPress={this._handleLogin}
              buttonStyle={[ButtonStyle, {}]}
            />

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Button
                title={LOGIN_WITH_DEMO_ACCOUNT}
                disabled={loginLoader || demoLoginLoader}
                loader={demoLoginLoader}
                onPress={this._handleDemoLogin}
                fontSize={12}
                buttonStyle={{
                  width: "50%",
                  backgroundColor: "#0e59f7",
                  marginRight: 5,
                }}
              />

              <FlatButton
                title={FORGOT_PASSWORD}
                onPress={this._handleForgotPassword}
                color="#0e59f7"
                buttonStyle={{
                  borderWidth: 1,
                  borderColor: "#0e59f7",
                  padding: 10,
                  borderRadius: 20,
                  width: "50%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
            </View>
          </KeyboardAvoidingView>

          <Fab
            yPosition="top"
            icon="translate"
            style={{ top: 30, borderWidth: 1, borderColor: "#0e59f7" }}
            onPress={this._handleOpenLanguageModal}
          />

          <LanguageModal
            visible={languageModalVisible}
            onClose={this._handleCloseLanguageModal}
          />
        </View>
      </Container>
    );
  }
}
/* Map State to Props
============================================================================= */
const mapStateToProps = ({ Auth, Setting }) => ({
  language: Setting.language,
  loginLoader: Auth.loginLoader,
  demoLoginLoader: Auth.demoLoginLoader,
  loginFailed: Auth.loginFailed,
});

/* Map Dispatch to Props
============================================================================= */
const mapDispatchToProps = (dispatch) => ({
  userLogin: (user) => dispatch(login(user)),
  demoUserLogin: (server) => dispatch(demoLogin(server)),
});

/* Exports
============================================================================= */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);
