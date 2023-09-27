// @flow

import React from "react";
import PlaceMarkers from "./PlaceMarkers";
import ZonePloyLine from "./ZonePloyLine";
import RoutePolyLines from "./RoutePolyLines";

/* flow types
============================================================================= */
type Props = {
  visible: boolean,
  markers: Array<Object>,
  zone: Array<Object>,
  routes: Array<Object>,
  lastCoords: any,
  lastCoordsVisible: Boolean,
};

/* =============================================================================
<MapPlaces />
============================================================================= */
const MapPlaces = ({ visible, markers, zone, routes }): Props => {
  return (
    <>
      {visible ? (
        <>
          <PlaceMarkers key="makers" markers={markers} />
          <ZonePloyLine key="zone" zone={zone} />
          <RoutePolyLines key="routes" routes={routes} />
        </>
      ) : (
        <></>
      )}
    </>
  );
};

/* Export
============================================================================= */
export default MapPlaces;
