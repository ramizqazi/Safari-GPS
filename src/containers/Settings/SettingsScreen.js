import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch } from "react-native";
import Container from "../../common/Container";
import Content from "../../common/Content";
import Header from "../../common/Header";
import Picker from "../../common/Picker";
import Div from "../../common/Div";
import Span from "../../common/Span";
import Text from "../../common/Text";
import styles from "./SettingsStyles";
import { APP_VERSION } from '../../config';

import { translator } from "../../languages";

/* import actions
============================================================================= */
import {
  changeValue,
  updateNotificationSetting,
} from "../../actions/setting_actions";
import AsyncStorage from "@react-native-async-storage/async-storage";

/* Flow types
============================================================================= */
type Props = {
  token: string,
  interval: string,
  language: string,
  mapType: string,
  events: string,
  navigation: any,
};

/* =============================================================================
<SettingScreen />
============================================================================= */
class SettingScreen extends Component<Props> {
  
  constructor() {
    super();
    this.state = {
      device_id: '',
      push_token: '',
    };
  }

  componentDidMount() {
    this._getDeviceId();
  }

  _getDeviceId = async () => {
    const deviceId = await AsyncStorage.getItem('device_id');
    const push_token = await AsyncStorage.getItem('push_token');
    this.setState({ device_id: deviceId, push_token });
  };


  /**
   * update notification setting
   */
  _handleNotificationValue = (name, value) => {
    const {
      token,
      events,
      language,
      onChangeNotificationSetting,
    } = this.props;
    if (name === "events") {
      const event_push = value ? 1 : 0;
      onChangeNotificationSetting(token, event_push, language);
    } else {
      const event_push = events ? 1 : 0;
      onChangeNotificationSetting(token, event_push, language);
    }
  };

  render() {
    const trackingIntervals = [
      { key: 1, label: translator.FIVE_SECOND, value: "05 sec" },
      { key: 2, label: translator.TEN_SECOND, value: "10 sec" },
      { key: 3, label: translator.TWENTY_SECOND, value: "20 sec" },
      { key: 4, label: translator.THIRTY_SECOND, value: "30 sec" },
      { key: 5, label: translator.SIXTY_SECOND, value: "60 sec" },
    ];
    const languages = [
      { key: 1, label: translator.ENGLISH, value: "english" },
      { key: 2, label: translator.GERMAN, value: "german" },
      { key: 3, label: translator.TURKISH, value: "turkish" },
      { key: 3, label: translator.UKRAINE, value: "ukraine" },
      { key: 3, label: translator.RUSSIAN, value: "russian" },
    ];
    const mapTypes = [
      { key: 1, label: `Google ${translator.STANDARD}`, value: "standard" },
      { key: 2, label: `Google ${translator.SATELLITE}`, value: "satellite" },
      { key: 3, label: `Google ${translator.HYBRID}`, value: "hybrid" },
    ];
    const { ListItem, ListHeading } = styles;

    const {
      navigation,
      interval,
      language,
      mapType,
      mapTraffic,
      events,
      last_location,
      onChangeValue,
    } = this.props;
    return (
      <Container>
        <Header
          title={translator.SETTINGS}
          leftIconOnPress={() => navigation.navigate("GeneralSettings")}
          leftIcon="arrow-back"
        />

        <Content padding={10}>
          <Div>
            <Span style={ListItem}>
              <Text>{translator.TRACKING_INTERVAL} </Text>
              <Picker
                data={trackingIntervals}
                selectedValue={interval}
                cancelText={translator.CANCEL}
                onChange={(value) => onChangeValue("interval", value)}
                style={{ width: "60%" }}
              />
            </Span>
            <Span style={ListItem}>
              <Text>{translator.LANGUAGE}</Text>
              <Picker
                data={languages}
                selectedValue={language}
                cancelText={translator.CANCEL}
                onChange={(value) => onChangeValue("language", value)}
                style={{ width: "60%" }}
              />
            </Span>
            <Span style={ListItem}>
              <Text>{translator.MAP_TYPE}</Text>
              <Picker
                data={mapTypes}
                selectedValue={mapType}
                cancelText={translator.CANCEL}
                onChange={(value) => onChangeValue("mapType", value)}
                style={{ width: "60%" }}
              />
            </Span>
            {/* <Span style={ListItem}>
              <Text>{translator.MAP_TRAFFIC}</Text>
              <Switch
                onTintColor="#CECECE"
                thumbTintColor="#0e59f7"
                value={mapTraffic}
                onValueChange={() => onChangeValue('mapTraffic', !mapTraffic)}
              />
            </Span> */}

            <Span style={ListHeading}>
              <Text>{translator.PUSH_NOTIFICATION}</Text>
            </Span>
            <Span style={ListItem}>
              <Text>{translator.EVENTS}</Text>
              <Switch
                onTintColor="#CECECE"
                thumbTintColor="#0e59f7"
                value={events}
                onValueChange={() =>
                  this._handleNotificationValue("events", !events)
                }
              />
            </Span>
          </Div>
          <Div style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
             <Text color="#999" fontSize={12}>{this.state.device_id}</Text>
             <Text color="#999" fontSize={12}>v{APP_VERSION}</Text>
           </Div>
        </Content>
      </Container>
    );
  }
}

/* map state to props
============================================================================= */
const mapStateToProps = ({ Auth, Setting }) => ({
  token: Auth.user.token,
  interval: Setting.interval,
  language: Setting.language,
  mapType: Setting.mapType,
  mapTraffic: Setting.mapTraffic,
  events: Setting.events,
  tracking: Setting.tracking,
});

/* map dispatch to props
============================================================================= */
const mapDispatchToProps = (dispatch) => ({
  onChangeValue: (name: string, value: string) =>
    dispatch(changeValue(name, value)),
  onChangeNotificationSetting: (
    token: string,
    events: string,
    language: string
  ) => dispatch(updateNotificationSetting(token, events, language)),
});

/* Exports
============================================================================= */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingScreen);
