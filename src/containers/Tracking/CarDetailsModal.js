// @flow

import React from "react";
import { StyleSheet, TouchableOpacity, Image, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { connect } from "react-redux";
import Div from "../../common/Div";
import Span from "../../common/Span";
import Text from "../../common/Text";
import InputText from "../../common/InputText";
import Button from "../../common/Button";
import { Colors } from "../../common/Colors";
import BatteryStatus from "./BatteryStatus";
import { Ionicons } from "@expo/vector-icons";
import { translator } from "../../languages";
import { Fonts } from "../../common/Fonts";
import Plaka from "../../common/Plaka";

/* Flow types
============================================================================= */
type Props = {
  data: Object,
  editCarLoader: boolean,
  onCarNameSave: (imei: string, name: string) => any,
  onStreetClick: Function,
  onClose: Function,
  detailCar: Function,
  user: object,
};

const AccActive = require("./img/engine-on.png");
const AccPasive = require("./img/engine-off.png");

const { width, height } = Dimensions.get("window");

/* =============================================================================
  <CarDetailsModal />
  ============================================================================= */
class CarDetailsModal extends React.PureComponent<Props, State> {
  _getTextColor = (status) => {
    if (status === "moving") {
      return styles.openText;
    } else if (status === "stopped" || status === "off") {
      return styles.offText;
    } else if (status === "idle") {
      return styles.iddleText;
    } else {
      return styles.iddleText;
    }
  };

  _getSubTextColor = (status) => {
    if (status === "moving") {
      return styles.onWayText;
    } else if (status === "stopped" || status === "off") {
      return styles.offWayText;
    } else if (status === "idle") {
      return styles.rolantiWayText;
    } else {
      return styles.rolantiWayText;
    }
  };

  _getSpeedColor = (speedlimit, speed) => {
    if (speedlimit > 0) {
      const avg_speed_10 =
        (parseInt(speedlimit) * 10) / 100 + parseInt(speedlimit);
      const avg_speed_20 =
        (parseInt(speedlimit) * 20) / 100 + parseInt(speedlimit);

      if (speed > avg_speed_20) {
        return { color: Colors.danger };
      } else if (speed > avg_speed_10 && speed < avg_speed_20) {
        return { color: Colors.warning };
      } else {
        return { color: Colors.black };
      }
    } else {
      return { color: Colors.black };
    }
  };

  
  render() {
    const {
      data,
      onClose,
      editCarLoader,
      onStreetClick,
      user,
      detailCar,
      address,
    } = this.props;
    
    return (
      <>
        {(address.speedlimit && address.speedlimit !== "0") ? (
          <Div
            style={{
              width: 50,
              height: 50,
              borderRadius: 30,
              backgroundColor: Colors.white,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 7,
              borderColor: "red",
              position: "absolute",
              bottom: 250,
              left: 10,
            }}
          >
            <Text style={{ fontSize: 18, fontFamily: Fonts.bold }}>
              {address.speedlimit}
            </Text>
          </Div>
        ): null}
        <Div style={styles.Container}>
          <Div>
            <Div
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                position: "relative",
                bottom: 25,
                backgroundColor: "#fff",
                padding: 5,
                borderRadius: 5,
                borderWidth: 0.5,
                borderColor: "#eee",
              }}
            >
              <Div style={styles.Row}>
                <Ionicons name="person-outline" size={20} color="#999" />
                <Text style={styles.text}>{data.name}</Text>
              </Div>
              <Div style={styles.Row}>
                <Ionicons name="speedometer-outline" size={20} color="#999" />
                <Text
                  style={[
                    styles.text,
                    this._getSpeedColor(address.speedlimit, data.speed),
                  ]}
                >
                  {data?.speed} {translator.KPH}
                </Text>
              </Div>

              <Plaka
                plaka={data.plate_number}
                visible={data.plate_number ? true : false}
              />

              {!data.plate_number ? (
                <Div style={styles.Row}>
                  <Ionicons name="calendar-outline" color="#999" size={20} />
                  <Text style={styles.text}>
                    {data?.daily_odometer} {translator.KM}
                  </Text>
                </Div>
              ) : null}
            </Div>

            <Div style={[styles.Row, { justifyContent: "space-between" }]}>
              <Div style={styles.Row}>
                <Ionicons name="location-outline" size={20} color="#999" />
                <Text style={[styles.text, { width: width * 0.6 }]}>
                  {address.address}
                </Text>
              </Div>

                <Div style={styles.Row}>
                  <Ionicons name="albums-outline" size={20} color="#999" />
                  <Text style={styles.text}>
                    {data?.odometer} {translator.KM}
                  </Text>
                </Div>
            </Div>

            <Div
              style={[
                styles.Row,
                { alignItems:'center', justifyContent: "space-between", marginTop: 10 },
              ]}
            >
              <Div style={[styles.Row, { flex:1 }]}>
                <Div>
                  <Ionicons
                    name="information-circle-outline"
                    color={Colors.grey}
                    size={20}
                  />
                </Div>
                <Div style={[styles.detailRight, { flex:1, marginLeft: 5 }]}>
                  <Text
                    style={[
                      styles.detailRight,
                      { textAlign: "left" },
                      this._getTextColor(data?.status),
                    ]}
                  >
                    {data?.acc === "1" ? translator.ACC_OPEN : translator.ACC_OFF}
                  </Text>
                  <Text
                    style={[
                      styles.detailRight,
                      { textAlign: "left" },
                      this._getSubTextColor(data?.status),
                    ]}
                  >
                    {data?.status_time}
                  </Text>
                </Div>
              </Div>

              <Div style={styles.Row}>
              {data?.plate_number ? (
                <Div style={styles.Row}>
                  <Ionicons name="calendar-outline" color="#999" size={20} />
                  <Text style={styles.text}>
                    {data?.daily_odometer} {translator.KM}
                  </Text>
                </Div>
              ) : null}

              <TouchableOpacity onPress={() => detailCar(data?.imei)}>
                <Div style={styles.Row}>
                  <Text
                    style={[
                      styles.text,
                      { color: Colors.primary, fontSize: 17 },
                    ]}
                  >
                    {translator.DETAIL}
                  </Text>
                  <Ionicons
                    name="chevron-forward-outline"
                    size={18}
                    color={Colors.primary}
                  />
                </Div>
              </TouchableOpacity>
              </Div>
            </Div>
          </Div>
        </Div>
      </>
    );
  }
}
/* styles
============================================================================= */
const styles = StyleSheet.create({
  Row: {
    flexDirection: "row",
    alignItems: "center",
  },
  Container: {
    position: "absolute",
    bottom: 50,
    width: "100%",
    padding: 10,
    backgroundColor: "rgba(255,255,255,1)",
    justifyContent: "space-between",
    paddingBottom: 30,

    borderTopWidth: 0.5,
    borderTopColor: "#ddd",
  },
  plaka: {
    flexDirection: "row",
    borderWidth: 0.7,
    borderRadius: 3,
  },
  plakaTR: {
    backgroundColor: "#00329b",
    justifyContent: "flex-end",
    paddingHorizontal: 2,
  },
  plakaTRText: {
    fontSize: 8,
    fontWeight: "bold",
    color: Colors.white,
  },
  plakaContent: {
    padding: 2,
  },
  text: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.darkGrey,
    marginLeft: 5,
  },
  openText: {
    fontSize: 14,
    color: Colors.success,
  },
  iddleText: {
    fontSize: 14,
    color: Colors.warning,
  },
  offText: {
    fontSize: 14,
    color: Colors.danger,
    fontFamily: Fonts.regular,
  },
  rolantiWayText: {
    fontSize: 14,
    color: Colors.darkWarning,
    fontFamily: Fonts.regular,
  },
  offWayText: {
    fontSize: 14,
    color: Colors.darkDanger,
    fontFamily: Fonts.regular,
  },
  onWayText: {
    fontSize: 14,
    color: Colors.darkSuccess,
    fontFamily: Fonts.regular,
  },
  detailLeft: {
    fontSize: 15,
    fontFamily: Fonts.semiBold,
    color: Colors.grey,
  },
  detailRight: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: Colors.grey,
  },
});

/* Export
============================================================================= */

const mapStateToProps = (state) => ({
  user: state.Auth.user,
});

export default connect(mapStateToProps)(CarDetailsModal);
