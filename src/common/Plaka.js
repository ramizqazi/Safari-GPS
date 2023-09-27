import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "./Colors";
import { Fonts } from "./Fonts";

export default function Plaka({ plaka, visible }) {
  if (visible) {
    return (
      <View style={style.plaka}>
        <View style={style.plakaTR}>
          <Text style={style.plakaTRText}>TR</Text>
        </View>
        <View style={style.plakaContent}>
          <Text>{plaka}</Text>
        </View>
      </View>
    );
  }
  return <View />;
}

const style = StyleSheet.create({
  plaka: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  plakaTR: {
    backgroundColor: "#00329b",
    justifyContent: "flex-end",
    paddingHorizontal: 2,
  },
  plakaTRText: {
    fontSize: 8,
    color: Colors.white,
    fontFamily: Fonts.bold,
  },
  plakaContent: {
    backgroundColor: Colors.white,
    padding: 2,
  },
});
