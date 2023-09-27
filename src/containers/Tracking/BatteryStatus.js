// @flow

import React from 'react';
import { StyleSheet } from 'react-native';
import Div from '../../common/Div';
import Text from '../../common/Text';

/* Flow types
============================================================================= */
type Props = {
  status: ?number,
};

/**
 * getting battery background color
 * @param {number} batp
 * @return {string} color
 */
const _getBatteryBackgroundColor = (batp: number) => {
  if (batp >= 50 && batp <= 100) {
    return 'green';
  }
  if (batp >= 20 && batp < 50) {
    return 'orange';
  }
  return 'red';
};

/* =============================================================================
  <CarDetailsModal />
  ============================================================================= */
const BatteryStatus = ({ status }): Props => {
  if (status) {
    return (
      <Div
        style={[
          styles.BatteryStatusContainer,
          {
            backgroundColor: _getBatteryBackgroundColor(status),
          },
        ]}
      >
        <Text style={styles.BatteryStatusText}>{status} %</Text>
      </Div>
    );
  }
  return null;
};

/* styles
============================================================================= */
const styles = StyleSheet.create({
  BatteryStatusContainer: {
    width: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  BatteryStatusText: {
    color: '#FFF',
    fontSize: 12,
  },
});

/* export
============================================================================= */
export default BatteryStatus;
