// @flow

import React from 'react';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import Text from '../../common/Text';
import Div from '../../common/Div';
import Span from '../../common/Span';

import { translator } from '../../languages';

/* Flow types
============================================================================= */
type Props = {
  data: Object,
};

/* =============================================================================
<CarCallOut />
============================================================================= */
const CarCallOut = ({ data }): Props => (
  <MapView.Callout>
    <Div style={styles.CallOutContainer}>
      <Span>
        <Div style={styles.CallOutTextLeftContainer}>
          <Text bold>{translator.VEHICLE}</Text>
          <Text>: </Text>
        </Div>
        <Div style={styles.CallOutTextRightContainer}>
          <Text>{data.name}</Text>
        </Div>
      </Span>
      <Span>
        <Div style={styles.CallOutTextLeftContainer}>
          <Text bold numberOfLines={1}>
            {translator.ADDRESS}
          </Text>
          <Text>: </Text>
        </Div>
        {/* <Div style={styles.CallOutTextRightContainer}>
        <Text>{data.address}</Text>
      </Div> */}
      </Span>
      <Span>
        <Div style={styles.CallOutTextLeftContainer}>
          <Text bold>{translator.POSITION}</Text>
          <Text>: </Text>
        </Div>
        <Div style={styles.CallOutTextRightContainer}>
          <Text>
            {data.latitude}, {data.longitude}
          </Text>
        </Div>
      </Span>
      <Span>
        <Div style={styles.CallOutTextLeftContainer}>
          <Text bold>{translator.SPEED}</Text>
          <Text>: </Text>
        </Div>
        <Div style={styles.CallOutTextRightContainer}>
          <Text>
            {data.speed} {translator.KPH}
          </Text>
        </Div>
      </Span>
      <Span>
        <Div style={styles.CallOutTextLeftContainer}>
          <Text bold>{translator.TIME}</Text>
          <Text>: </Text>
        </Div>
        <Div style={styles.CallOutTextRightContainer}>
          <Text>{data.dt_tracker}</Text>
        </Div>
      </Span>
      <Span>
        <Div style={styles.CallOutTextLeftContainer}>
          <Text bold>{translator.ODOMETER}</Text>
          <Text>: </Text>
        </Div>
        <Div style={styles.CallOutTextRightContainer}>
          <Text>{data.odometer} km</Text>
        </Div>
      </Span>
      <Span>
        <Div style={styles.CallOutTextLeftContainer}>
          <Text bold>{translator.BATTERY}</Text>
          <Text>: </Text>
        </Div>
        {/* <Div style={styles.CallOutTextRightContainer}>
        <Text>{data.battery}</Text>
      </Div> */}
      </Span>
    </Div>
  </MapView.Callout>
);

/* Styles
============================================================================= */
const styles = StyleSheet.create({
  CallOutContainer: {
    padding: 5,
  },
  CallOutTextLeftContainer: {
    width: 120,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  CallOutTextRightContainer: {},
});

/* Export
============================================================================= */
export default CarCallOut;
