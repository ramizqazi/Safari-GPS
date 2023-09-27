// @flow

import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";
import Div from "../../common/Div";
import Text from "../../common/Text";

/* Flow types
============================================================================= */
type Props = {
  image: string,
  date: string,
  information: string,
  onPress: Function,
};

/* =============================================================================
<DriveListItem />
============================================================================= */
const DriveListItem = ({ image, date, information, onPress }): Props => (
  <TouchableOpacity onPress={onPress} style={styles.ListItem}>
    <Image source={image} style={styles.ImageStyle} />
    <Div>
      <Text>{date}</Text>
      <Text>{information}</Text>
    </Div>
  </TouchableOpacity>
);

/* Styles
============================================================================= */
const styles = StyleSheet.create({
  ListItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    paddingLeft: 10,
    paddingHorizontal: 2,
    borderWidth: 0.5,
    borderColor: "#e7e7e7",
    borderRadius: 5,
    marginHorizontal: 2,
    marginVertical: 3,
  },
  ImageStyle: { width: 20, height: 20, marginRight: 10 },
});

/* Export
============================================================================= */
export default DriveListItem;
