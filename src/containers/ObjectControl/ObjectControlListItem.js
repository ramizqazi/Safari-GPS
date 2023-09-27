import React from "react";
import { Alert, StyleSheet, TouchableOpacity } from "react-native";

import Div from "../../common/Div";
import { Fonts } from "../../common/Fonts";
import { Colors } from "../../common/Colors";
import Text from "../../common/Text";

/* =============================================================================
<ObjectControlListItem />
============================================================================= */
const ObjectControlListItem = ({ data }) => {
  const _handleShowResponse = () => {
    if (data.status === "success") {
      Alert.alert(data.response);
    }
  };

  let statusBackground = Colors.grey;

  if (data.status === "success") {
    statusBackground = Colors.success;
  }

  if (data.status === "failed") {
    statusBackground = Colors.danger;
  }

  return (
    <TouchableOpacity
      style={styles.List}
      key={data.cmd_id}
      onPress={_handleShowResponse}
    >
      <Div>
        <Text style={styles.text}>{data.car}</Text>
        <Text style={styles.text}>{data.name}</Text>
        <Text style={styles.text}>{data.cmd}</Text>
      </Div>
      <Div style={[styles.Status, { backgroundColor: statusBackground }]}>
        <Text style={styles.text} color="#FFF">
          {data.status}
        </Text>
      </Div>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  List: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eee",
    justifyContent: "space-between",
    marginBottom: 5,
    borderRadius: 10,
  },
  Status: {
    padding: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  text: { fontFamily: Fonts.regular },
});

/* export
============================================================================= */
export default ObjectControlListItem;
