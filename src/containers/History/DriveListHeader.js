// @flow

import React from 'react';
import { StyleSheet } from 'react-native';
import Div from '../../common/Div';
import Span from '../../common/Span';
import Text from '../../common/Text';
import {Fonts} from '../../common/Fonts';
import { translator } from '../../languages';

type Props = {
  routeInfo: {
    routeLength: string | number,
    topSpeed: string | number,
    avgSpeed: string | number,
  },
};


const DriveListHeader = ({ routeInfo, currency }): Props => (
  <Div style={styles.Container}>
    <Span style={styles.InfoContainer}>
      <Text style={styles.text}>{translator.ROUTE_LENGTH}</Text>
      <Text style={styles.rightText}>
        {routeInfo.route_length} {translator.KM}
      </Text>
    </Span>
    <Span style={styles.InfoContainer}>
      <Text style={styles.text}>{translator.TOP_SPEED}</Text>
      <Text style={styles.rightText}>
        {routeInfo.top_speed} {translator.KPH}
      </Text>
    </Span>
    <Span style={styles.InfoContainer}>
      <Text style={styles.text}>{translator.AVG_SPEED}</Text>
      <Text style={styles.rightText}>
        {routeInfo.avg_speed} {translator.KPH}
      </Text>
    </Span>
    {routeInfo.fuel_consumption > 0 && [
      <Span key="consumption" style={styles.InfoContainer}>
        <Text style={styles.text}>{translator.FUEL_CONSUMPTION}</Text>
        <Text style={styles.rightText}>{routeInfo.fuel_consumption} Liter</Text>
      </Span>,
      <Span key="cost" style={styles.InfoContainer}>
        <Text style={styles.text}>{translator.FUEL_COST}</Text>
        <Text style={styles.rightText}>
          {routeInfo.fuel_cost} {currency}
        </Text>
      </Span>,
    ]}
  </Div>
);

/* Styles
============================================================================= */
const styles = StyleSheet.create({
  Container: {
    marginBottom:15
  },
  InfoContainer: {
    backgroundColor: '#efefef',
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: 'space-between',
    marginBottom: 10,
    borderRadius: 7,
  },
  text:{
    fontFamily: Fonts.regular,
    fontSize: 15,
  },
  rightText:{
    fontFamily: Fonts.regular,
    fontSize: 14
  }
});

/* Export
============================================================================= */
export default DriveListHeader;
