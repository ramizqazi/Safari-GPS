// @flow

import React from 'react';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import Div from '../../common/Div';
import Span from '../../common/Span';
import Text from '../../common/Text';
import StopImage from './img/routestop.png';

import { translator } from '../../languages';

/* Flow types
============================================================================= */
type Props = {
  data: Array,
  onPress: (stop: Object) => any,
};

/* =============================================================================
<StopMarkers />
============================================================================= */
const StopMarkers = ({ data, onPress }): Props => {
  if (!data.length) return null;
  return data.map(stop => (
    <MapView.Marker
      key={stop.time}
      coordinate={stop.coords}
      image={StopImage}
      onPress={() => onPress(stop.coords)}
      anchor={{ x: 0.5, y: 0.5 }}
    >
      <MapView.Callout>
        <Div style={styles.CallOutContainer}>
          <Div style={styles.CallOutHeaderContainer}>
            <Text bold>{translator.STOP_DETAILS}</Text>
          </Div>
          <Span>
            <Div style={styles.CallOutTextLeftContainer}>
              <Text bold>{translator.STOP_TIME}</Text>
              <Text>: </Text>
            </Div>
            <Div style={styles.CallOutTextRightContainer}>
              <Text>{stop.time}</Text>
            </Div>
          </Span>
          <Span>
            <Div style={styles.CallOutTextLeftContainer}>
              <Text bold>{translator.START_TIME}</Text>
              <Text>: </Text>
            </Div>
            <Div style={styles.CallOutTextRightContainer}>
              <Text>{stop.startTime}</Text>
            </Div>
          </Span>
          <Span>
            <Div style={styles.CallOutTextLeftContainer}>
              <Text bold>{translator.STAY_TIME}</Text>
              <Text>: </Text>
            </Div>
            <Div style={styles.CallOutTextRightContainer}>
              <Text>{stop.stayTime}</Text>
            </Div>
          </Span>
        </Div>
      </MapView.Callout>
    </MapView.Marker>
  ));
};

/* Styles
============================================================================= */
const styles = StyleSheet.create({
  CallOutContainer: {
    height: 120,
    padding: 10,
  },
  CallOutHeaderContainer: {
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  CallOutTextLeftContainer: {
    width: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  CallOutTextRightContainer: {
    width: 150,
  },
});

/* Export
============================================================================= */
export default StopMarkers;
