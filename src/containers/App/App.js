// @flow

import React from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  LogBox,
  Alert,
} from "react-native";
import { connect } from "react-redux";
import Constants from "expo-constants";
import { UnAuthenticatedRoutes, AuthenticatedRoutes } from "../../navigation";
import NavigationService from "../../common/NavigationService";
import Notification from "../../common/Notification";
import * as Font from "expo-font";
import NetInfo from "@react-native-community/netinfo";
import { translator } from "../../languages";

/* Import Actions
============================================================================= */
import { changeLanguage, setAppVersion } from "../../actions/setting_actions";
import { checkLoginStatus } from "../../actions/auth_actions";
import { savePushNotificationToken } from "../../actions/push_notification";
import { Colors } from "../../common/Colors";

/* Flow types
============================================================================= */
type Props = {
  isLoggedIn: boolean,
  statusLoader: boolean,
  language: string,
  checkUserLoginStatus: () => any,
};

/* =============================================================================
<App />
============================================================================= */
class App extends React.Component<Props> {
  state = {
    fontsLoaded: false,
  };

  componentDidMount() {
    const {
      language,
      changeAppLanguage,
      checkUserLoginStatus,
      registerPushNotification,
    } = this.props;

    this.connectionStatus = NetInfo.addEventListener((state) => {
      if (!state.isConnected) {
        Alert.alert(
          translator.NO_INTERNET_CONNECTION,
          translator.CHECK_YOUR_CONNECTION
        );
      }
    });

    changeAppLanguage(language);
    checkUserLoginStatus();
    registerPushNotification(language);
    this.loadFonts();
    LogBox.ignoreAllLogs();
  }

  async loadFonts() {
    await Font.loadAsync({
      SourceRegular: require("../../common/fonts/ProductSansRegular.ttf"),
      SourceBold: require("../../common/fonts/ProductSansBold.ttf"),
      SourceSemiBold: require("../../common/fonts/SourceSansPro-SemiBold.ttf"),
      SourceLight: require("../../common/fonts/SourceSansPro-Light.ttf"),
      SourceItalic: require("../../common/fonts/ProductSansItalic.ttf"),
    });
    this.setState({ fontsLoaded: true });
  }
  /**
   * update language
   */
   UNSAFE_componentWillReceiveProps(nextProps) {
    const { language, changeAppLanguage } = this.props;
    if (nextProps.language && nextProps.language !== language) {
      changeAppLanguage(nextProps.language);
    }
  }

  /**
   * move to another route
   * @param {string} route
   * @param {object} params
   */
  _handleRoute = (route: string, params: Object) => {
    NavigationService.navigate(route, params);
  };

  render() {
    const { statusLoader, isLoggedIn } = this.props;

    if (statusLoader || !this.state.fontsLoaded) {
      return <></>
    }

    return (
      <>
        <SafeAreaView style={{ flex: 0, backgroundColor: Colors.primary }} />
        <SafeAreaView style={{ flex: 1, backgroundColor: isLoggedIn ? "#fff" : Colors.primary }}>
          <StatusBar
            barStyle="light-content"
            backgroundColor={Colors.primary}
          />

          <View style={{ backgroundColor: Colors.primary }} />

          {!isLoggedIn ? (
            <UnAuthenticatedRoutes />
          ) : (
            <AuthenticatedRoutes
              refs={(navigatorRef) => {
                NavigationService.setTopLevelNavigator(navigatorRef);
              }}
            />
          )}

          <Notification handleRoute={this._handleRoute} />
        </SafeAreaView>
      </>
    );
  }
}

/* map state to props
============================================================================= */
const mapStateToProps = ({ Auth, Setting }) => ({
  isLoggedIn: Auth.isLoggedIn,
  statusLoader: Auth.statusLoader,
  language: Setting.language,
});

/* map dispatch to props
============================================================================= */
const mapDispatchToProps = (dispatch) => ({
  checkUserLoginStatus: () => dispatch(checkLoginStatus()),
  changeAppLanguage: (language: string) => dispatch(changeLanguage(language)),
  registerPushNotification: (language: string) =>
    dispatch(savePushNotificationToken(language)),
});
/* export
============================================================================= */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
