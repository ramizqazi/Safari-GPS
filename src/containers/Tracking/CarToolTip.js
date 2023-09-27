// @flow

import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import Text from '../../common/Text';
import Div from '../../common/Div';

import { translator } from '../../languages';
/* Flow types
============================================================================= */
type Props = {
  data: Object,
};

/* =============================================================================
<CarToolTip />
============================================================================= */
const CarToolTip = ({ data }): Props => (
  <Div
    style={{
      ...Platform.select({
        ios: {
          position: 'relative',
          left: 3,
          marginLeft: data.name.length * 3 + 120,
          opacity: 0.85,
        },
        android: {
          position: 'relative',
          paddingLeft: 8,
          marginLeft: data.name.length * 3 + 120,
          opacity: 0.85,
        },
      }),
    }}
  >
    <Div style={styles.TooltipPin} />
    <Div style={styles.TooltipInnerContainer}>
      <Div style={[styles.TooltipTextContainer]}>
        <Text fontSize={10}>
          {data.name} ({data.speed} {translator.KPH})
        </Text>
      </Div>
    </Div>
  </Div>
);

/* Styles
============================================================================= */
const styles = StyleSheet.create({
  TooltipInnerContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 3,
    borderRadius: 4,
    paddingLeft: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#ddd',
    shadowColor: '#1e1e1e',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    elevation: 1,
  },
  TooltipTextContainer: {
    paddingHorizontal: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TooltipPin: {
    position: 'absolute',
    ...Platform.select({
      ios: {
        left: -8,
      },
    }),
    top: 6,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderBottomWidth: 8,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    transform: [{ rotate: '-90deg' }],
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#FFF',
    zIndex: 99,
  },
});

/* Export
============================================================================= */
export default CarToolTip;
