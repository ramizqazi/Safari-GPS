// @flow

import React from "react";
import Dialog from "../../common/Dialog";
import Div from "../../common/Div";
import { Colors } from "../../common/Colors";
import DriveListHeader from "./DriveListHeader";
import DriveListItem from "./DriveListItem";
import { translator } from "../../languages";

import startRouteImage from "./img/routestart.png";
import driveRouteImage from "./img/routedrive.png";
import eventRouteImage from "./img/routeevent.png";
import stopRouteImage from "./img/routestop.png";
import endRouteImage from "./img/routeend.png";

const images = {
  start: startRouteImage,
  drive: driveRouteImage,
  event: eventRouteImage,
  stop: stopRouteImage,
  end: endRouteImage,
};

/* Flow types
============================================================================= */
type Props = {
  visible: boolean,
  data: Array,
  routeInfo: Object,
  onClose: Function,
  showDrivePolyLine: Function,
  showRouteOnMap: Function,
};

/* =============================================================================
<DriveModal />
============================================================================= */
const DriveModal = ({
  currency,
  visible,
  data,
  routeInfo,
  onClose,
  showDrivePolyLine,
  showRouteOnMap,
}): Props => (
  <Dialog
    visible={visible}
    title={translator.ROUTE_HISTORY}
    onClose={onClose}
    headerBackgroundColor={Colors.white}
    headerFontColor={Colors.primary}
    style={{ maxHeight: 400,  }}
  >
    <DriveListHeader routeInfo={routeInfo} currency={currency} />
    {data.length > 0 && (
      <Div>
        {data.map((item) => {
          if (item.route) {
            return (
              <DriveListItem
                key={Math.random() * 1000}
                image={images[item.image]}
                date={item.time}
                onPress={() => showRouteOnMap(item.coords)}
              />
            );
          }
          if (item.drive) {
            return (
              <DriveListItem
                key={Math.random() * 1000}
                onPress={() => showDrivePolyLine(item.coords)}
                image={images[item.image]}
                date={item.time}
                information={item.driveTime}
              />
            );
          }
          if (item.event) {
            return (
              <DriveListItem
                key={Math.random() * 1000}
                onPress={() => showRouteOnMap(item.coords)}
                image={images[item.image]}
                date={item.time}
                information={item.name}
              />
            );
          }
          if (item.stop) {
            return (
              <DriveListItem
                key={Math.random() * 1000}
                onPress={() => showRouteOnMap(item.coords)}
                image={images[item.image]}
                date={item.time}
                information={item.stayTime}
              />
            );
          }
          return null;
        })}
      </Div>
    )}
  </Dialog>
);

/* Export
============================================================================= */
export default DriveModal;
