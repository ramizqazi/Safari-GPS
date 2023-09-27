// @flow

import React from "react";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Div from "../../common/Div";
import Text from "../../common/Text";
import styles from "./EventsStyles";

/* Flow types
============================================================================= */
type Props = {
  item: Object<{ id: string, cell: Object }>,
  onPress: Function,
};

/* =============================================================================
<EventListItem />
============================================================================= */
const EventListItem = ({ item, onPress }): Props => {
  const { id, cell } = item;
  return (
    <TouchableOpacity onPress={() => onPress(id)} style={styles.ListStyle}>
      <Icon name="explicit" style={styles.ListIcon} />
      <Div style={styles.ListTextContainer}>
        <Text style={styles.text}>{cell[1]}</Text>
        <Text style={styles.textStatus}>{cell[2]}</Text>
      </Div>
      <Div>
        <Text style={styles.TextStyle1}>{cell[0]}</Text>
      </Div>
    </TouchableOpacity>
  );
};

/* Export
============================================================================= */
export default EventListItem;
