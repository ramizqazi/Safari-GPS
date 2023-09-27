// @flow

import React from "react";
import MapView from "react-native-maps";
import { View, Text, Image } from "react-native";
import { markerPlaceImages } from "./CommonValues";
import { Fonts } from "./Fonts";
/* flow types
============================================================================= */
type Props = {
  markers: Array<Object>,
};

/* =============================================================================
<PlaceMarkers />
============================================================================= */
const PlaceMarkers = ({ markers }): Props => {
  if (!markers.length) {
    return null;
  }
  return markers.map((marker) => {
    const { data, visible } = marker;
    if (visible) {
      const coordinate = {
        latitude: Number(data.lat),
        longitude: Number(data.lng),
      };
      return (
        <MapView.Marker
          key={marker.data.lat}
          coordinate={coordinate}
          //image={markerPlaceImages[data.icon]}
          //anchor={{ x: 0.5, y: 0.5 }}
        >
          <Image
            style={{ width: 35, height: 35, resizeMode: "contain" }}
            source={markerPlaceImages[data.icon]}
          />
          <MapView.Callout>
            <View
              style={{
                width: 150,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontFamily: Fonts.bold }}>{data.name}</Text>
              <Text style={{ fontFamily: Fonts.regular }}>{data.desc}</Text>
            </View>
          </MapView.Callout>
        </MapView.Marker>
      );
    }
    return null;
  });
};

/* export
============================================================================= */
export default PlaceMarkers;
