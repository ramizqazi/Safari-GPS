import React from "react";
import { Image } from "react-native";
import MapView from "react-native-maps";
import CarImages from "../containers/Tracking/CarImages";

function Marker({ car, onPress }) {
  return (
    <MapView.Marker
      coordinate={{
        latitude: Number(car.latitude),
        longitude: Number(car.longitude),
      }}
      onPress={() => onPress()}
      //rotation={Number(car.angle)}
      anchor={{ x: 0.5, y: 0.5 }}
    >
      <Image
        source={CarImages[car.arrow_icon]}
        style={{
          width: 30,
          height: 30,
          resizeMode: "contain",
          transform: [
            {
              rotate: `${Number(car.angle)}deg`,
            },
          ],
        }}
      />
    </MapView.Marker>
  );
}

export default Marker;