import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../common/Colors";
import { Fonts } from "../../common/Fonts";

const { width, height } = Dimensions.get("screen");

const style = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  header: {
    height: width * 0.20,
    paddingHorizontal: 10,
    paddingTop: 15,
  },
  text: {
    fontSize: 15,
    color: Colors.white,
    fontFamily: Fonts.regular,
  },
  headContainer: {
    flexDirection: "row",
    justifyContent: "center",
    top: -(width * 0.25),
    zIndex: 1,
  },
  headTab: {
    position: "absolute",
    top: height * 0.09,
    padding: 7,
    backgroundColor: Colors.white,
    borderRadius: 10,
    width: width * 0.9,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  headContent: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "center",
    flexWrap: "wrap",
  },
  headLeft: {
    color: Colors.darkGrey,
    fontFamily: Fonts.regular,
    fontSize: 15,
  },
  headRight: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: Colors.grey,
  },
  detailButton: {
    position: "absolute",
    right: 0,
    top: 150,
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  detailButtonText: {
    fontSize: 20,
    fontFamily: Fonts.regular,
    color: Colors.white,
  },
});

export default style;
