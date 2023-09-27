// @flow

import React from "react";
import { Image, View } from "react-native";
import MapView from "react-native-maps";
import CarToolTip from "./CarToolTip";
import Marker from "../../common/Marker";

/* Flow types
============================================================================= */
type Props = {
  data: Array,
  onPress: (event: Object) => any,
};

/* =============================================================================
<CarMarkers />
============================================================================= */

const CarMarkers = ({ car, onPress }): Props => {
  return (
    <View>
      <Marker car={car} onPress={() => onPress(car)} />
      <MapView.Marker
        key={`${car.imei}-tooltip`}
        coordinate={{
          latitude: Number(car.latitude),
          longitude: Number(car.longitude),
        }}
      >
        <CarToolTip data={car} />
      </MapView.Marker>
    </View>
  );
};

/* Export
============================================================================= */
export default CarMarkers;
