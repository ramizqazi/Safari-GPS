// @flow

import React, { useEffect, useState } from "react";
import MapView from "react-native-maps";
import {
  Modal,
  Dimensions,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { WebView } from "react-native-webview";
import Fab from "../../common/Fab";
import Text from "../../common/Text";
import { translator } from "../../languages";

/* =============================================================================
  <StreetModal />
  ============================================================================= */

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const StreetModal = (props) => {
  const { lat, lng, onClose } = props;

  return (
      <Modal visible={true}>
        <Fab
          onPress={onClose}
          icon="close"
          style={{
            top: 50,
            right: 30,
          }}
        />

        <View style={styles.container}>
          <WebView
            source={{
              uri: `https://tr1.safari-gps.live/REACT/streetview/streetview.php?lat=${lat}&lng=${lng}`,
            }}
          />
        </View>
      </Modal>
  );
};

/* styles
============================================================================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

/* Export
============================================================================= */

export default React.memo(StreetModal);
