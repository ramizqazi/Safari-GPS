// @flow

import React from "react";
import MapView from "react-native-maps";
import { Colors } from "./Colors";
import Div from "./Div";

type Props = {
  routes: any,
};

const LastPolyLines = ({ routes }): Props => {
  if (!routes) {
    return <Div />;
  }

  const routeLine = Object.values(routes).map((route) => (
    <MapView.Polyline
      coordinates={route}
      strokeColor="rgba(14, 89, 247, 0.8)"
      strokeWidth={2}
      lineDashPattern={[0]}
      lineCap="round"
    />
  ));

  return routeLine;
};

export default LastPolyLines;
