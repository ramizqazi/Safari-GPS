// @flow

import React from 'react';
import MapView from 'react-native-maps';

/* flow types
============================================================================= */
type Props = {
  zone: Array<Object>,
};

/* =============================================================================
<ZonePloyLine />
============================================================================= */
const ZonePloyLine = ({ zone }): Props => {
  if (!zone.length) {
    return null;
  }
  return zone.map(item => {
    const { data } = item;
    if (data.visible) {
      return (
        <MapView.Polygon
          key={data.name}
          fillColor={data.colorRGB}
          strokeWidth={1}
          strokeColor={data.color}
          coordinates={data.coordinates}
          lineDashPattern={[1]}
        />
      );
    }
    return null;
  });
};

/* Export
============================================================================= */
export default ZonePloyLine;
