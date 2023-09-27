// @flow

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Dialog from "../../common/Dialog";
import MessageView from "../../common/MessageView";
import Div from "../../common/Div";
import Span from "../../common/Span";
import Text from "../../common/Text";
import {Colors} from "../../common/Colors";
import BatteryStatus from "./BatteryStatus";
import searchObject from "../../utils/searchObject";

import { translator } from "../../languages";
import InputText from "../../common/InputText";

/* Flow types
============================================================================= */
type Props = {
  data: Array,
  visible: boolean,
  onClose: Function,
  onShowCar: (car: Object) => any,
};

/* connection icon color
============================================================================= */
const _selectConnectionIconColor = (connection_icon) => {
  switch (connection_icon) {
    case 0:
      return "grey";
    case 1:
      return "orange";
    case -1:
      return "orange";
    case 2:
      return "#9cc602";
    case -2:
      return "#9cc602";
    default:
      return "grey";
  }
};

const AccActive = require("./img/engine-on.png");
const AccPasive = require("./img/engine-off.png");

/* =============================================================================
<CarsDisplayModal />
============================================================================= */
const CarsDisplayModal = ({ data, visible, onClose, onShowCar }): Props => {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(null);

  useEffect(
    () => {
      if (data) {
        setFilteredData(data);
        const result = searchObject(data, search);
        setFilteredData(result || null);
      }
    },
    [data]
  );

  useEffect(
    () => {
      if (search && data) {
        const result = searchObject(data, search);
        setFilteredData(result || null);
      }
      if (search === "") {
        setFilteredData(data);
      }
    },
    [search]
  );

  return (
    <Dialog
      visible={visible}
      title={translator.AVAILABLE_CARS}
      onClose={onClose}
      headerBackgroundColor={Colors.white}
      headerFontColor={Colors.primary}
      style={{ maxHeight: 400 }}
    >
      {filteredData && (
        <View>
          <View>
            <InputText
              onChangeText={setSearch}
              value={search}
              returnKeyType="search"
              iconName="search"
              placeholder={translator.SEARCH}
            />
          </View>

          {filteredData.map((car) => {
            const connection_icon_color = _selectConnectionIconColor(
              car.connection_icon
            );
            return (
              <TouchableOpacity
                onPress={() => car.status !== false && onShowCar(car)}
                key={car.imei}
                style={styles.List}
              >
                <Div style={styles.ListLeftContainer}>
                  <Text bold fontSize={12} numberOfLines={1}>
                    {car.name}
                  </Text>
                  {data.batp && (
                    <Span>
                      <Text fontSize={12}>{translator.BATTERY}: </Text>
                      <BatteryStatus status={data.batp} />
                    </Span>
                  )}
                  <Text fontSize={12}>{car.dt_tracker}</Text>
                  <Text fontSize={12}>{car.status_time}</Text>
                  <Text fontSize={12}>
                    {car.status === "moving" || car.status === "idle"
                      ? translator.ACC_OPEN
                      : translator.ACC_OFF}
                  </Text>
                </Div>
                <Span>
                  <Div marginHorizontal={10}>
                    <Text bold>
                      {car.speed} {translator.KPH}
                    </Text>
                  </Div>
                  <Image
                    source={
                      car.status === "moving" || car.status === "idle"
                        ? AccActive
                        : AccPasive
                    }
                    style={{ width: 25, height: 25, marginRight: 10 }}
                  />
                  <Icon name="wifi" size={25} color={connection_icon_color} />
                </Span>
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      {data.length === 0 && <ActivityIndicator color="#0e59f7" size={30} />}
    </Dialog>
  );
};
/* Style Sheet
============================================================================= */
const styles = StyleSheet.create({
  List: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.2,
    borderColor: "#CECECE",
    borderRadius: 5,
  },
  ListLeftContainer: {
    flex: 1,
  },
});

/* Export
============================================================================= */
export default CarsDisplayModal;
