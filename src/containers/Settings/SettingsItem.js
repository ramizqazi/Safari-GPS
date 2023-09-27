import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Div from "../../common/Div";
import { Fonts } from "../../common/Fonts";
import { Ionicons } from "@expo/vector-icons";
import { translator } from "../../languages";
import { connect } from "react-redux";

function SettingsItem({ user, item, navigation, language }) {
  /* if (item.route === "ObjectControlList" && !user?.object_control) {
    return <View />;
  }
  if (item.route === "WebVersion" && user?.LOCATE === "TR") {
    return <View />;
  }*/

  if (
    item.route === "Aboutus" &&
   ( user.locate !== "TR" ||
    language !== "turkish")
  ) {
    return <View />;
  }
  
  return (
    <Div style={style.section}>
      <TouchableOpacity
        activeOpacity={0.6}
        style={style.content}
        onPress={() => navigation.navigate(item.route)}
      >
        <View style={style.row}>
          <Ionicons name={item.icon} size={24} color="rgba(14, 89, 247, 0.8)" />
          <Text style={style.name}>{item.text}</Text>
        </View>
        <View>
          <Ionicons
            name={item.rightIcon}
            size={20}
            color="rgba(14, 89, 247, 0.8)"
          />
        </View>
      </TouchableOpacity>
    </Div>
  );
}

const mapStateToProps = ({ Auth }) => ({
  user: Auth.user,
});

export default connect(mapStateToProps)(SettingsItem);

const style = StyleSheet.create({
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
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});
