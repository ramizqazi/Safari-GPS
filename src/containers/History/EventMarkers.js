import React from 'react';
import { Image, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import Div from '../../common/Div';
import Span from '../../common/Span';
import Text from '../../common/Text';
import EventImage from './img/routeevent.png';

import { translator } from '../../languages';

/* Flow types
============================================================================= */
type Props = {
  data: Array,
  onPress: (event: Object) => any,
};

/* =============================================================================
<EventMarkers />
============================================================================= */
const EventMarkers = ({ data, onPress }): Props => {
  if (!data.length) return null;
  return data.map((event, key) => (
    <MapView.Marker
      key={key}
      coordinate={event.coords}
      image={EventImage}
      onPress={() => onPress(event.coords)}
      anchor={{ x: 0.5, y: 0.5 }}
    >
      <MapView.Callout>
        <Div style={styles.CallOutContainer}>
          <Div style={styles.CallOutHeaderContainer}>
            <Text bold>{translator.EVENT_DETAILS} </Text>
          </Div>
          <Span>
            <Div style={styles.CallOutTextLeftContainer}>
              <Text bold>{translator.NAME}</Text>
              <Text>: </Text>
            </Div>
            <Div style={styles.CallOutTextRightContainer}>
              <Text>{event.name}</Text>
            </Div>
          </Span>
          <Span>
            <Div style={styles.CallOutTextLeftContainer}>
              <Text bold>{translator.TIME}</Text>
              <Text>: </Text>
            </Div>
            <Div style={styles.CallOutTextRightContainer}>
              <Text>{event.time}</Text>
            </Div>
          </Span>
          <Span>
            <Div style={styles.CallOutTextLeftContainer}>
              <Text bold>{translator.SPEED}</Text>
              <Text>: </Text>
            </Div>
            <Div style={styles.CallOutTextRightContainer}>
              <Text>
                {event.speed} {translator.KPH}
              </Text>
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
    width: 120,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  CallOutTextRightContainer: {
    width: 150,
  },
});

/* Export
============================================================================= */
export default EventMarkers;
