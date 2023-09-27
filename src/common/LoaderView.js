// @flow

import * as React from 'react';
import { View, ActivityIndicator } from 'react-native';
import type { ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';

/* FLow Types
============================================================================= */
type Props = {
  loader: boolean,
  fullSize?: boolean,
  padding?: number,
  backgroundColor?: string,
  style?: ViewStyleProp,
  size?: number | 'small' | 'large',
  color?: string,
};

/* =============================================================================
<LoaderView />
============================================================================= */
const LoaderView = ({
  loader,
  fullSize,
  padding,
  backgroundColor,
  style,
  size,
  color,
}: Props) => {
  if (loader) {
    return (
      <View
        style={[
          {
            flex: fullSize ? 1 : 0,
            padding,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor,
          },
          style,
        ]}
      >
        <ActivityIndicator size={size} color={color} />
      </View>
    );
  }
  return null;
};

/* Default Props
============================================================================= */
LoaderView.defaultProps = {
  fullSize: false,
  padding: 20,
  backgroundColor: '#FFFFFF',
  style: {},
  size: 'large',
  color: '#0e59f7',
};

/* Exports
============================================================================= */
export default LoaderView;
