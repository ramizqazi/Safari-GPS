// @flow

import React from 'react';
import MapView from 'react-native-maps';
import Div from '../../common/Div';
import Span from '../../common/Span';
import Text from '../../common/Text';
import styles from './EventDetailsStyles';

import { translator } from '../../languages';

/* Flow types
============================================================================= */
type DetailsPropsType = {
  latitude: number,
  longitude: number,
  name: string,
  dt_tracker: string,
  speed: string | number,
  event_desc: string,
};
type Props = {
  details: DetailsPropsType,
};

/* =============================================================================
<EventToolTip />
============================================================================= */
const EventToolTip = ({ details }): Props => {
  const { latitude, longitude, name, dt_tracker, speed, event_desc } = details;
  return (
    <MapView.Marker
      coordinate={{
        latitude,
        longitude,
      }}
    >
      <Div style={styles.TooltipContainer}>
        <Div style={styles.TooltipInnerContainer}>
          <Span>
            <Div style={styles.Left}>
              <Text bold>{translator.NAME}</Text>
            </Div>
            <Div style={styles.Right}>
              <Text>{name}</Text>
            </Div>
          </Span>
          <Span>
            <Div style={styles.Left}>
              <Text bold>{translator.TIME}</Text>
            </Div>
            <Div style={styles.Right}>
              <Text>{dt_tracker}</Text>
            </Div>
          </Span>
          <Span>
            <Div style={styles.Left}>
              <Text bold>{translator.SPEED}</Text>
            </Div>
            <Div style={styles.Right}>
              <Text>{speed}</Text>
            </Div>
          </Span>
          <Span>
            <Div style={styles.Left}>
              <Text bold>{translator.EVENTS_DESCRIPTION}</Text>
            </Div>
            <Div style={styles.Right}>
              <Text>{event_desc}</Text>
            </Div>
          </Span>
        </Div>
        <Div style={styles.TooltipPin} />
      </Div>
    </MapView.Marker>
  );
};

/* Export
============================================================================= */
export default EventToolTip;
