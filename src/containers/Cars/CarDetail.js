import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
  Linking,Platform , View
} from "react-native";
import MapView  from "react-native-maps";
import { connect } from "react-redux";
import Container from "../../common/Container";
import Div from "../../common/Div";
import Span from "../../common/Span";
import { Ionicons } from "@expo/vector-icons";
import { LATITUDE_DELTA, LONGITUDE_DELTA } from "../../common/mapConstant";
import { translator } from "../../languages";
import StreetModal from "../Tracking/StreetModal";
import { Colors } from "../../common/Colors";
import { Fonts } from "../../common/Fonts";
import Marker from "../../common/Marker";
import Dialog from "../../common/Dialog";
import DeactiveObject from "./DeactiveObject";
import ActiveObject from "./ActiveObject";
import FuelModal from "./FuelModal";
import EditModal from "./EditModal";
import Plaka from "../../common/Plaka";
import moment from "moment";
import Toast from "react-native-toast-message";
import { getAddress } from '../../actions/tracking_actions';


import "moment/locale/tr";
import "moment/locale/de";
import "moment/locale/en-gb";
import "moment/locale/ru";

type Props = {
  navigation: any,
  cars: Array<Object>,
  interval: string,
  mapType: string,
  server_url: string,
  object_control: any,
  isDemo: boolean,
  language: string,
};

const { width, height } = Dimensions.get("screen");

const CarDetail = (props: Props) => {
  const {
    navigation,
    language,
    cars,
    interval,
    mapType,
    server_url,
    object_control,
    isDemo,
    route
  } = props;
  const { imei } = route.params;
  const scrollViewRef = useRef();

  useEffect(
    () => {
      if (imei) {
        scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
      }
    },
    [imei]
  );

  const timeInterval = Number(interval.substring(0, 2));
  const detail = cars.filter((item) => item.imei === imei)[0];
  const [streetModal, setStreetModal] = useState({});
  const [disableBlockModal, setDisableBlockModal] = useState(false);
  const [showFuelModal, setShowFuelModal] = useState(false);
  const [enableBlockModal, setEnableBlockModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [addressActive, setAddressActive] = useState(true);
  const [lang, setLang] = useState("tr");
  const [address, setAddress] = useState({});

  const [loading, setLoading] = useState(false);
  const [nameValue, setNameValue] = useState(detail.name);
  const [plateNumberValue, setPlateNumberValue] = useState(detail.plate_number);
  const [odometerValue, setOdometerValue] = useState(
    detail.odometer.toString()
  );

  useEffect(
    () => {
      if (language === "turkish") {
        setLang("tr");
      } else if (language === "german") {
        setLang("de");
      } else if (language === "english") {
        setLang("en-gb");
      } else if (language === "russian") {
        setLang("ru");
      } else if (language === "ukraine") {
        setLang("ru");
      } else {
        setLang("tr");
      }
    },
    [language]
  );

  useEffect(() => {
    const addressBlurHandler = navigation.addListener('blur', () => {
      setAddressActive(false)
    });

    const addressFocusHandler = navigation.addListener('focus', () => {
      setAddressActive(true)
    });

    return addressBlurHandler;
    return addressFocusHandler;
  }, [navigation]);

  useEffect(
    () => {
      if (detail) {
        if (!editModal) {
          setNameValue(detail.name);
          setPlateNumberValue(detail.plate_number);
          setOdometerValue(detail.odometer.toString());
        }

        if (detail.status === "off") {
          setDisableButton(true);
        } else {
          setDisableButton(false);
        }
      }
      _getAddress(detail);
    },
    [detail]
  );

  const _getAddress = async (car) => {
    const addressRequest = await getAddress(car, addressActive);
    setAddress(addressRequest);
  }

  const getIntervalText = (interval) => {
    if (interval === 5) {
      return translator.CARS_DETAIL_INTERVAL_FIVE;
    } else if (interval === 10) {
      return translator.CARS_DETAIL_INTERVAL_TEN;
    } else if (interval === 20) {
      return translator.CARS_DETAIL_INTERVAL_TWENTY;
    } else if (interval === 30) {
      return translator.CARS_DETAIL_INTERVAL_THIRTY;
    } else if (interval === 60) {
      return translator.CARS_DETAIL_INTERVAL_SIXTY;
    } else {
      return translator.CARS_DETAIL_INTERVAL_TEN;
    }
  };

  const getTextColor = (status) => {
    if (status === "moving") {
      return style.openText;
    } else if (status === "stopped" || status === "off") {
      return style.offText;
    } else if (status === "idle") {
      return style.iddleText;
    } else {
      return style.iddleText;
    }
  };

  const getSubTextColor = (status) => {
    if (status === "moving") {
      return style.onWayText;
    } else if (status === "stopped" || status === "off") {
      return style.offWayText;
    } else if (status === "idle") {
      return style.rolantiWayText;
    } else {
      return style.rolantiWayText;
    }
  };

  const directionLink = () => {
    Linking.openURL(
      `https://www.google.com/maps/dir//${detail.latitude},${detail.longitude}`
    );
  };

  const handleEnableBlockModal = useCallback(
    () => {
      if (detail.status === "off") {
        Toast.show({
          type: "error",
          text1: translator.THIS_VEHICLE_CANNOT_BE_ACTIVATED,
        });
      } else {
        setEnableBlockModal(true);
      }
    },
    [detail, setEnableBlockModal]
  );

  const handleDisableBlockModal = useCallback(
    () => {
      if (detail.status === "off") {
        Toast.show({
          type: "error",
          text1: translator.THIS_VEHICLE_CANNOT_BE_DEACTIVATED,
        });
      } else {
        setDisableBlockModal(true);
      }
    },
    [detail, setDisableBlockModal]
  );

  return (
    <Container backgroundColor="#f7f7f7">
      <Div style={{ zIndex: 99999 }}>
        <Toast />
      </Div>

      <Div backgroundColor={Colors.primary} style={style.header}>
        <TouchableOpacity
          activeOpacity={0.6}
          style={style.row}
          onPress={() => {
            navigation.navigate("TrackingScreen", { car: detail });
          }}
        >
          <Ionicons
            name="chevron-back-outline"
            size={24}
            color={Colors.white}
          />
          <Text style={[style.text]}>{translator.BACK}</Text>
        </TouchableOpacity>
        <Text style={[style.text, style.plakaHeader]}>{detail.name}</Text>
      </Div>

      <Div style={style.container}>
        <Div style={style.informationArea}>
          <Ionicons
            name="information-circle-outline"
            color="#8e8e8e"
            size={15}
          />
          <Text style={[style.text, style.infoText]}>
            {getIntervalText(timeInterval)}
          </Text>
        </Div>

        <Div
          backgroundColor={Colors.white}
          style={[style.shadow, { paddingHorizontal: 20 }]}
        >
          <Div style={style.mapArea}>
            <Div style={style.map}>
              <MapView
                pitchEnabled={false}
                rotateEnabled={false}
                zoomEnabled={false}
                scrollEnabled={false}
                mapType={mapType}
                showsTraffic={true}
                showsTransit
                
                region={{
                  latitude: Number(detail.latitude),
                  longitude: Number(detail.longitude),
                  latitudeDelta: LATITUDE_DELTA,
                  longitudeDelta: LONGITUDE_DELTA,
                }}
                style={{ flex: 1, borderRadius: 25 }}
              >
                <Marker car={detail} onPress={() => null} />
              </MapView>
            </Div>

            <Div style={style.streetView}>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() =>
                  setStreetModal({
                    latitude: detail?.latitude,
                    longitude: detail?.longitude,
                  })
                }
              >
                <Image
                  style={{
                    borderRadius: 10,
                    width: width * 0.4,
                    height: height * 0.2,
                  }}
                  source={{
                    uri: `https://maps.googleapis.com/maps/api/streetview?size=350x350&location=${
                      detail.latitude
                    },${
                      detail.longitude
                    }&heading=151.78&pitch=-0.76&key=AIzaSyAV6Kr6utZ5ZPNWGJWLuz7QNYKApKdK6jk`,
                  }}
                />
              </TouchableOpacity>
            </Div>
          </Div>

          <Div style={style.detailArea}>
            <Text style={style.detailLeft}>{translator.ADDRESS}</Text>
            <Text style={[style.detailRight, { width: width * 0.6 }]}>
              {address.address}
            </Text>
          </Div>
        </Div>

        <ScrollView showsVerticalScrollIndicator={false} ref={scrollViewRef}>
          <Div
            style={[style.detailArea, { paddingHorizontal: 20, marginTop: 10 }]}
          >
            <Text style={style.detailsCar}>{translator.CARS_DETAIL}</Text>
            <Plaka
              plaka={detail.plate_number}
              visible={detail.plate_number ? true : false}
            />
          </Div>

          <Div
            backgroundColor={Colors.white}
            style={[style.shadow, { paddingHorizontal: 20 }]}
          >
            <Div style={[style.detailArea, style.detailAreaBorder]}>
              <Text style={style.detailLeft}>{translator.ACC}</Text>
              <Div style={style.detailRight}>
                <Text
                  style={[
                    style.detailRight,
                    getTextColor(detail?.status),
                    { textAlign: "right" },
                  ]}
                >
                  {detail?.acc === 1 ? translator.ACC_OPEN : translator.ACC_OFF}
                </Text>
                <Text
                  style={[
                    style.detailRight,
                    getSubTextColor(detail?.status),
                    { textAlign: "right" },
                  ]}
                >
                  {detail?.status_time}
                </Text>
              </Div>
            </Div>

            <Div style={[style.detailArea, style.detailAreaBorder]}>
              <Text style={style.detailLeft}>{translator.NAME}</Text>
              <Text style={style.detailRight}>{detail.name}</Text>
            </Div>

            <Div style={[style.detailArea, style.detailAreaBorder]}>
              <Text style={style.detailLeft}>{translator.SPEED}</Text>
              <Text style={style.detailRight}>
                {detail?.speed} {translator.KPH}
              </Text>
            </Div>

            <Div style={[style.detailArea, style.detailAreaBorder]}>
              <Text style={style.detailLeft}>{translator.LAST_LOCATION}</Text>
              <Text style={style.detailRight}>
                {moment(detail.dt_tracker)
                  .locale(lang)
                  .calendar()}
              </Text>
            </Div>

            <Div style={[style.detailArea, style.detailAreaBorder]}>
              <Text style={style.detailLeft}>{translator.ODOMETER}</Text>
              <Text style={style.detailRight}>{detail.odometer} km</Text>
            </Div>

            {detail.brand &&
              detail.model && (
                <Div style={[style.detailArea, style.detailAreaBorder]}>
                  <Text style={style.detailLeft}>{translator.BRAND_MODEL}</Text>
                  <Text style={style.detailRight}>{`${detail.brand} ${
                    detail.model
                  }`}</Text>
                </Div>
              )}

            {detail.output1 && (
              <Div style={[style.detailArea, style.detailAreaBorder]}>
                <Text style={style.detailLeft}>
                  {translator.OBJECT_CONTROL}
                </Text>

                <Div>
                  <Text
                    style={[
                      style.detailRight,
                      detail.output1 == 1
                        ? { backgroundColor: Colors.danger }
                        : { backgroundColor: Colors.success },
                      detail.output1_soll == 1 && detail.output1 == 0
                        ? { backgroundColor: Colors.warning }
                        : null,
                      {
                        marginLeft: "auto",
                        padding: 5,
                        borderRadius: 5,
                        textAlign: "center",
                        color: Colors.white,
                        width: translator.PENDING.length * 10,
                      },
                    ]}
                  >
                    {detail.output1_soll == 1 && detail.output1 == 0 ? (
                      translator.PENDING
                    ) : (
                      <>
                        {detail.output1 == 1
                          ? translator.ACTIVE
                          : translator.INACTIVE}
                      </>
                    )}
                  </Text>

                  {detail.output1_soll == 1 &&
                    detail.output1 == 0 && (
                      <Text style={[style.detailRight, { fontSize: 13 }]}>
                        {
                          translator.WILL_BE_ACTIVATED_AFTER_THE_IGNITION_TURNED_OFF
                        }
                      </Text>
                    )}
                </Div>
              </Div>
            )}
          </Div>

          <Div
            style={[
              style.detailArea,
              { marginVertical: 10, paddingHorizontal: 20 },
            ]}
          >
            <Text style={style.detailsCar}>{translator.TODAY_STATS}</Text>
          </Div>

          <Div
            backgroundColor={Colors.white}
            style={[style.shadow, { paddingHorizontal: 20 }]}
          >
            <Div style={[style.detailArea, style.detailAreaBorder]}>
              <Text style={style.detailLeft}>{translator.DAILY_ODOMETER}</Text>
              <Text style={style.detailRight}>{detail?.daily_odometer} km</Text>
            </Div>

            <Div style={[style.detailArea, style.detailAreaBorder]}>
              <Text style={style.detailLeft}>{`${translator.TOP_SPEED} ${
                translator.SPEED
              }`}</Text>
              <Text style={style.detailRight}>
                {detail.daily_max_speed} {translator.KPH}
              </Text>
            </Div>

            {detail.brand &&
              detail.model && (
                <TouchableOpacity
                  onPress={() => setShowFuelModal(true)}
                  activeOpacity={0.6}
                  style={[style.detailArea, style.detailAreaBorder]}
                >
                  <Text style={style.detailLeft}>
                    {translator.FUEL_CONSUMPTION}
                  </Text>
                  <Span>
                    <Ionicons
                      name="information-circle-outline"
                      color={Colors.darkGrey}
                      size={17}
                    />
                    <Text style={[style.detailRight, { marginLeft: 5 }]}>
                      {detail.daily_fuel} lt
                    </Text>
                  </Span>
                </TouchableOpacity>
              )}

            <Div style={[style.detailArea, style.detailAreaBorder]}>
              <Text style={style.detailLeft}>{translator.WORK_START}</Text>
              <Text style={style.detailRight}>{detail.daily_start_work}</Text>
            </Div>

            {(detail.status === "stopped" || detail.status === "off") &&
              detail.daily_end_work !== "1970-01-01 00:00:00" && (
                <Div style={[style.detailArea, style.detailAreaBorder]}>
                  <Text style={style.detailLeft}>{translator.WORK_END}</Text>
                  <Text style={style.detailRight}>{detail.daily_end_work}</Text>
                </Div>
              )}

            <Div style={[style.detailArea, style.detailAreaBorder]}>
              <Text style={style.detailLeft}>{translator.IDLING}</Text>
              <Text style={style.detailRight}>
                {moment.utc(detail.daily_engine_idle * 1000).format("HH:mm:ss")}
              </Text>
            </Div>

            <Div style={[style.detailArea, style.detailAreaBorder]}>
              <Text style={style.detailLeft}>{translator.MOVING}</Text>
              <Text style={style.detailRight}>
                {moment.utc(detail.daily_move * 1000).format("HH:mm:ss")}
              </Text>
            </Div>
          </Div>

          <Div style={style.buttons}>
            <TouchableOpacity
              activeOpacity={0.6}
              style={style.buttonContent}
              onPress={() => directionLink()}
            >
              <Div style={[style.button]}>
                <Image
                  source={require("./img/yoltarifi.png")}
                  style={{ width: 50, height: 50 }}
                />
              </Div>
              <Text style={style.buttonText}>{translator.GET_DIRECTIONS}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.6}
              style={style.buttonContent}
              onPress={() =>
                setStreetModal({
                  latitude: detail?.latitude,
                  longitude: detail?.longitude,
                })
              }
            >
              <Div style={[style.button]}>
                <Image
                  source={require("./img/streetview.png")}
                  style={{ width: 50, height: 50 }}
                />
              </Div>
              <Text style={style.buttonText}>{translator.STREET_VIEW}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.4}
              style={style.buttonContent}
              onPress={handleEnableBlockModal}
            >
              <Div style={[style.button]}>
                <Image
                  source={require("./img/aktifBlokaj.png")}
                  style={[
                    { width: 50, height: 50 },
                    disableButton && style.opacity,
                  ]}
                />
              </Div>
              <Text style={style.buttonText}>
                {translator.ACTIVATE_BLOCKAGE_FOOTER}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.4}
              style={style.buttonContent}
              onPress={handleDisableBlockModal}
            >
              <Div style={[style.button]}>
                <Image
                  source={require("./img/pasifBlokaj.png")}
                  style={[
                    { width: 50, height: 50 },
                    disableButton && style.opacity,
                  ]}
                />
              </Div>
              <Text style={style.buttonText}>
                {translator.DEACTIVATE_BLOCKAGE_FOOTER}
              </Text>
            </TouchableOpacity>

            {!isDemo && (
              <TouchableOpacity
                activeOpacity={0.6}
                style={style.buttonContent}
                onPress={() => setEditModal(true)}
              >
                <Div
                  style={[style.button, { backgroundColor: Colors.primary }]}
                >
                  <Ionicons
                    name="create-outline"
                    size={35}
                    color={Colors.white}
                  />
                </Div>
                <Text style={style.buttonText}>{translator.EDIT + "\n"}</Text>
              </TouchableOpacity>
            )}
          </Div>
        </ScrollView>

        {streetModal.latitude &&
          streetModal.longitude && (
            <StreetModal
              lat={streetModal.latitude}
              lng={streetModal.longitude}
              onClose={() => setStreetModal({})}
            />
          )}

        <DeactiveObject
          visible={disableBlockModal}
          onClose={setDisableBlockModal}
          imei={detail?.imei}
        />

        <ActiveObject
          visible={enableBlockModal}
          onClose={setEnableBlockModal}
          imei={detail?.imei}
        />

        <FuelModal
          visible={showFuelModal}
          onClose={setShowFuelModal}
          average_fuel={detail.average_fuel}
          brand={detail.brand}
          model={detail.model}
        />

        <EditModal
          visible={editModal}
          onClose={setEditModal}
          loading={loading}
          name={nameValue}
          plate_number={plateNumberValue}
          odometer={odometerValue}
          imei={detail.imei}
          nameChange={(e) => setNameValue(e)}
          plateChange={(e) => setPlateNumberValue(e)}
          odometerChange={(e) => setOdometerValue(e)}
          loadingChange={(e) => setLoading(e)}
        />

        <Div style={{ marginTop: 50, backgroundColor: "transparent" }} />
      </Div>
    </Container>
  );
};

const style = StyleSheet.create({
  opacity: {
    opacity: 0.4,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 60,
    paddingHorizontal: 20,
  },
  buttonContent: {
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 11,
    fontFamily: Fonts.regular,
    marginTop: 5,
    textAlign: "center",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  header: {
    height: 50,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 15,
    color: "#fff",
    fontFamily: Fonts.regular,
  },
  plakaHeader: {
    fontFamily: Fonts.semiBold,
  },
  informationArea: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  infoText: {
    fontFamily: Fonts.regular,
    color: Colors.grey,
    fontSize: 11,
    marginLeft: 3,
  },
  container: {
    flex: 1,
  },
  mapArea: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  map: {
    width: width * 0.4,
    height: height * 0.2,
    borderRadius: 25,
  },
  streetView: {
    width: width * 0.4,
    height: height * 0.2,
    borderRadius: 10,
  },
  detailArea: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  detailAreaBorder: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#eee",
  },
  detailLeft: {
    fontSize: 15,
    fontFamily: Fonts.semiBold,
    color: Colors.grey,
  },
  detailRight: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.grey,
  },
  detailsCar: {
    fontSize: 13,
    color: Colors.darkGrey,
    fontFamily: Fonts.light,
  },
  openText: {
    fontSize: 11,
    color: Colors.success,
  },
  iddleText: {
    fontSize: 11,
    color: Colors.warning,
  },
  offText: {
    fontSize: 11,
    color: Colors.danger,
    fontFamily: Fonts.regular,
  },
  rolantiWayText: {
    fontSize: 11,
    color: Colors.darkWarning,
    fontFamily: Fonts.regular,
  },
  offWayText: {
    fontSize: 11,
    color: Colors.darkDanger,
    fontFamily: Fonts.regular,
  },
  onWayText: {
    fontSize: 11,
    color: Colors.darkSuccess,
    fontFamily: Fonts.regular,
  },
});

const mapStateToProps = ({ Tracking, Setting, Auth }) => ({
  cars: Tracking.cars,
  mapType: Setting.mapType,
  interval: Setting.interval,
  server_url: Auth.user.server_url,
  object_control: Auth.user.object_control,
  isDemo: Auth.user.demo,
  language: Setting.language,
});

export default connect(
  mapStateToProps,
  null
)(CarDetail);
