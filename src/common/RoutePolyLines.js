// @flow

import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import MapView from 'react-native-maps';
import Div from './Div';
import Text from './Text';

/* flow types
============================================================================= */
type Props = {
  routes: Array<Object>,
};

/* =============================================================================
<RoutePolyLines />
============================================================================= */
const RoutePolyLines = ({ routes }): Props => {
  if (!routes.length) {
    return null;
  }

  return routes.map(route => {
    const { visible, name_visible, name, coordinates, color } = route;
    if (visible) {
      return [
        <MapView.Polyline
          key={name}
          coordinates={coordinates}
          strokeColor={color}
          strokeWidth={6}
          lineDashPattern={[1]}
        />,
        name_visible && (
          <MapView.Marker key={`${name}-toolTip`} coordinate={coordinates[0]}>
            <Div style={styles.TooltipContainer}>
              <Div style={styles.TooltipInnerContainer}>
                <Div
                  style={[
                    styles.TooltipTextContainer,
                    { width: name.length * 2 + 80, maxWidth: 200 },
                  ]}
                >
                  <Text>{name}</Text>
                </Div>
              </Div>
              <Div style={styles.TooltipPin} />
            </Div>
          </MapView.Marker>
        ),
      ];
    }
    return null;
  });
};

/*  styles
=========================================================================== */
const styles = StyleSheet.create({
  TooltipContainer: {
    ...Platform.select({
      ios: {
        position: 'absolute',
        paddingBottom: 10,
        bottom: 0,
        left: -52,
      },
      android: {
        position: 'relative',
        paddingBottom: 10,
      },
    }),
  },
  TooltipInnerContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#1e1e1e',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
  },
  TooltipTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  TooltipPin: {
    position: 'absolute',
    bottom: 0,
    left: '40%',
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderBottomWidth: 15,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    transform: [{ rotate: '180deg' }],
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#FFF',
  },
});

/* export
============================================================================= */
export default RoutePolyLines;
