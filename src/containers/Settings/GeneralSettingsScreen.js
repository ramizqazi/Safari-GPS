import React from "react";
import { Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { connect } from "react-redux";
import Container from "../../common/Container";
import { translator } from "../../languages";
import { logout } from "../../actions/auth_actions";
import moment from "moment";
import { Fonts } from "../../common/Fonts";
import { Colors } from "../../common/Colors";
import Div from "../../common/Div";
import { Ionicons } from "@expo/vector-icons";
import SettingsItem from "./SettingsItem";
import { APP_VERSION } from '../../config';

const logo = require("../../common/img/logo.png")

const getDateString = () => {
  const hours = new Date().getHours();

  if (hours >= 6 && hours < 12) {
    return translator.GOOD_MORNING;
  } else if (hours >= 12 && hours < 18) {
    return translator.GOOD_AFTERNOON;
  } else if (hours >= 18 && hours < 22) {
    return translator.GOOD_EVENING;
  } else if (hours >= 22) {
    return translator.GOOD_NIGHT;
  } else {
    return translator.GOOD_NIGHT;
  }
};

const GeneralSettingsScreen = (props) => {
  const { user, language, navigation, userLogout } = props;

  const CardItem = [
    {
      route: "Setting",
      icon: "settings-outline",
      text: translator.SETTINGS,
      rightIcon: "chevron-forward-outline",
    },
    {
      route: "ObjectControlList",
      icon: "build-outline",
      text: translator.OBJECT_CONTROL,
      rightIcon: "chevron-forward-outline", //user?.object_control
    },
    {
      route: "Aboutus",
      icon: "information-circle-outline",
      text: translator.ABOUT_US,
      rightIcon: "chevron-forward-outline",
    },
    /*{
      route: "WebVersion",
      icon: "earth-outline",
      text: translator.WEBVERSION,
      rightIcon: "chevron-forward-outline", // user?.server_url !== "https://tr1.safari-gps.live"
    },*/
  ];

  const logout = async () => {
    await userLogout();
  };

  return (
    <Container>
      <Div style={style.header} padding={10} margin={10}>
        <Image
          source={logo}
          style={style.logo}
        />

        <Div style={style.person}>
          <Div>
            <Text style={style.personText}>{getDateString()}</Text>
            <Text style={style.personSubText}>{user.username}</Text>
          </Div>
          <Div style={style.personIcon}>
            <Ionicons name="person-outline" size={28} color="#999" />
          </Div>
        </Div>
      </Div>

      <Div padding={10} flex={1} backgroundColor="rgba(14, 89, 247, 0.01)">
        <Div style={style.cards}>
        {/*<TouchableOpacity
            onPress={() => navigation.navigate("Changelog")}
            activeOpacity={0.6}
            style={[style.card, style.cardActive]}
          >
            {APP_VERSION > user.version && (
              <Div style={style.cardNotification}>
                <Text style={style.cardNotificationText}>1</Text>
              </Div>
            )}

            <Ionicons
              name="leaf-outline"
              color="rgba(14, 89, 247, 0.8)"
              size={24}
            />
            <Text style={[style.cardText, style.cardTextActive, { fontSize: 8 } ]}>
              {translator.CHANGELOG}
            </Text>
          </TouchableOpacity>*/}

          {user.locate === "TR" && (
            <>
              <TouchableOpacity
                onPress={() => navigation.navigate("Contact")}
                activeOpacity={0.6}
                style={style.card}
              >
                <Ionicons
                  name="call-outline"
                  color="rgba(14, 89, 247, 0.8)"
                  size={24}
                />
                <Text style={style.cardText}>{translator.CONTACT}</Text>
              </TouchableOpacity>

              {user.saha && (
                <TouchableOpacity
                  onPress={() => navigation.navigate("Saha")}
                  activeOpacity={0.6}
                  style={[style.card, style.cardActive]}
                >
                  <Image
                    source={require("../../common/img/drawer_profile.png")}
                    style={{ width: 30, height: 30, borderRadius: 15 }}
                  />
                  <Text style={[style.cardText, style.cardTextActive]}>
                    Safari Saha
                  </Text>
                </TouchableOpacity>
              )}

              {user.isAdmin && (
                <TouchableOpacity
                  onPress={() => navigation.navigate("SahaEkle")}
                  activeOpacity={0.6}
                  style={[style.card, style.cardActive]}
                >
                  <Image
                    source={require("../../common/img/drawer_profile.png")}
                    style={{ width: 30, height: 30, borderRadius: 15 }}
                  />
                  <Text style={[style.cardText, style.cardTextActive]}>
                    Cihaz ekle
                  </Text>
                </TouchableOpacity>
              )}


              {user.isAdmin && (
                <TouchableOpacity
                  onPress={() => navigation.navigate("MusteriEkle")}
                  activeOpacity={0.6}
                  style={[style.card, style.card_long, style.cardActive]}
                >
                  <Image
                    source={require("../../common/img/drawer_profile.png")}
                    style={{ width: 30, height: 30, borderRadius: 15 }}
                  />
                  <Text style={[style.cardText, style.cardTextActive]}>
                    Müsteri ekle
                  </Text>
                </TouchableOpacity>
              )}
            </>
          )}
        </Div>

        {CardItem.map((item, index) => (
          <SettingsItem
            key={index}
            item={item}
            navigation={navigation}
            language={language}
          />
        ))}

        <Div style={style.section}>
          <TouchableOpacity
            activeOpacity={0.6}
            style={style.content}
            onPress={logout}
          >
            <Div style={style.row}>
              <Ionicons
                name="log-out-outline"
                size={28}
                color={Colors.danger}
              />
              <Text style={[style.name, { color: Colors.danger }]}>
                {translator.LOGOUT}
              </Text>
            </Div>
            <Div>
              <Ionicons
                name="chevron-forward-outline"
                size={20}
                color={Colors.danger}
              />
            </Div>
          </TouchableOpacity>
        </Div>
      </Div>
    </Container>
  );
};

const mapStateToProps = ({ Auth, Setting }) => ({
  user: Auth.user,
  language: Setting.language,
});

const mapDispatchToProps = (dispatch) => ({
  userLogout: () => dispatch(logout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GeneralSettingsScreen);

const style = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(14, 89, 247, 0.04)",
    borderRadius: 50,
  },
  person: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  personText: {
    fontSize: 11,
    textAlign: "right",
    color: "rgba(14, 89, 247, 0.5)",
    fontFamily: Fonts.regular,
  },
  personSubText: {
    fontSize: 12,
    textAlign: "right",
    color: "rgba(14, 89, 247, 0.8)",
    fontFamily: Fonts.bold,
  },
  personIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  section: {
    marginBottom: 10,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderRadius: 10,
  },
  name: {
    fontSize: 11,
    color: "rgba(14, 89, 247, 0.8)",
    marginLeft: 10,
    fontFamily: Fonts.regular,
  },
  logo: {
    width: 150,
    height: 50,
    resizeMode: "contain",
  },

  cards: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
  },
  card: {
    width: '22%',
    height: 60,
    borderRadius: 10,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    marginRight: '4%',
    borderWidth: 0.7,
    borderColor: "#ddd",
  },
  cardActive: {
    borderWidth: 1.5,
    borderColor: "#167cef",
  },
  card_long: {
  },
  cardTextActive: {
    fontFamily: Fonts.bold,
    flexWrap: "wrap",
    width: "80%",
    textAlign: "center",
  },
  cardText: {
    marginTop: 5,
    fontSize: 10,
    color: "rgba(14, 89, 247, 0.8)",
  },
  cardNotification: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  cardNotificationText: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: Colors.white,
  },
});
