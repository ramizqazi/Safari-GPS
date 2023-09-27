import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Fonts } from "./Fonts";
import { Colors } from "./Colors";

import { translator } from "../languages";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";

const getIndex = (routeName, index) => {
  if (index === 0 && routeName === "Cars") {
    return true;
  }
  if (index === 1 && routeName === "HistoryFront") {
    return true;
  }
  if (index === 2 && routeName === "TrackingScreen") {
    return true;
  }
  if (index === 3 && routeName === "Events") {
    return true;
  }
  if (index === 4 && routeName === "GeneralSettings") {
    return true;
  }
  return false;
};

const TabButton = ({ item, navigation }) => {
  const isSelected = getIndex(item.routeName, navigation.getState().index);
  const isTracking = item.routeName === "TrackingScreen" ? true : false;

  return (
    <TouchableOpacity
      key={item.routeName}
      onPress={() => navigation.navigate(item.routeName)}
      activeOpacity={1}
      style={styles.container}
    >
      <View style={styles.container}>
        <View style={isTracking && styles.btn}>
          {isTracking ? (
            <Image
              source={require("./img/drawer_profile.png")}
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                resizeMode: "cover",
              }}
            />
          ) : (
            <Ionicons
              name={isSelected ? item.activeIcon : item.inActiveIcon}
              size={24}
              color={
                isSelected && !isTracking
                  ? item.activeColor
                  : item.inActiveColor
              }
            />
          )}
        </View>
        <Text
          style={[
            styles.text,
            isSelected
              ? { color: "rgba(14, 89, 247, 0.9)", fontFamily: Fonts.regular }
              : { color: "#8a99ac" },
            { bottom: isTracking ? 12 : 0 },
          ]}
        >
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const FooterContent = ({ navigation }) => {
  const footerRoutes = [
    {
      name: translator.CARS,
      routeName: "Cars",
      inActiveIcon: "car-outline",
      activeIcon: "car",
      inActiveColor: "#8a99ac",
      activeColor: "rgba(14, 89, 247,0.9)",
    },
    {
      name: translator.HISTORY,
      routeName: "HistoryFront",
      inActiveIcon: "timer-outline",
      activeIcon: "timer",
      inActiveColor: "#8a99ac",
      activeColor: "rgba(14, 89, 247,0.9)",
    },
    {
      name: translator.TRACKING,
      routeName: "TrackingScreen",
      inActiveIcon: "map-outline",
      activeIcon: "map",
      inActiveColor: "#fff",
      activeColor: "rgba(14, 89, 247,0.9)",
    },
    {
      name: translator.EVENTS,
      routeName: "Events",
      inActiveIcon: "notifications-outline",
      activeIcon: "notifications",
      inActiveColor: "#8a99ac",
      activeColor: "rgba(14, 89, 247,0.9)",
    },
    {
      name: translator.MENU,
      routeName: "GeneralSettings",
      inActiveIcon: "menu-outline",
      activeIcon: "menu",
      inActiveColor: "#8a99ac",
      activeColor: "rgba(14, 89, 247,0.9)",
    },
  ];

  return (
    <View style={styles.tabBar}>
      {footerRoutes.map((item) => (
        <TabButton key={item.name} item={item} navigation={navigation} />
      ))}
    </View>
  );
};

const mapStateToProps = ({ Setting }) => ({
  language: Setting.language,
});

export default connect(
  mapStateToProps,
  null
)(FooterContent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    top: -18,
    borderRadius: 25,
    width: 50,
    height: 50,
    backgroundColor: Colors.primary,
  },
  tabBar: {
    flexDirection: "row",
    position: "absolute",
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: Colors.white,
    borderTopWidth: 0.2,
    borderTopColor: "#eee",
    height: 50,
  },
  text: {
    fontSize: 10,
    textAlign: "center",
    color: "rgba(14, 89, 247, 0.6)",
    fontFamily: Fonts.light,
  },
});
