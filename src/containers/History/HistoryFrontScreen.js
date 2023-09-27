import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Container from "../../common/Container";
import Div from "../../common/Div";
import Picker from "../../common/Picker";
import { Fonts } from "../../common/Fonts";
import { Colors } from "../../common/Colors";
import DurationValues from "../../common/DurationValues";
import DatePicker from "react-native-datepicker";
import { translator } from "../../languages";
import { connect } from "react-redux";
import moment from "moment";
import { Ionicons } from "@expo/vector-icons";

import { getRouteHistory } from "../../actions/history_actions";

const { width, height } = Dimensions.get("screen");

const HistoryFrontScreen = (props) => {
  const { cars: carList } = props;

  const [loading, setLoading] = useState(false);
  const [imei, setImei] = useState("");
  const [error, setError] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("today");
  const [dtf, setDtf] = useState(DurationValues("Today").dtf);
  const [dtt, setDtt] = useState(DurationValues("Today").dtt);
  const [stop, setStop] = useState(1);
  const [firstTimeCarSelected, setFirstTimeCarSelected] = useState(false);

  /**
   * car array
   */
  const cars = [];
  carList.forEach((item) => {
    cars.push({ key: item.imei, label: item.name, value: item.imei });
  });

  /**
   * select car first time
   */
  if (cars.length > 0 && !firstTimeCarSelected) {
    setImei(cars[0].value);
    setFirstTimeCarSelected(true);
  }

  const _handleDurationValue = (value: string) => {
    switch (value) {
      case "last hour":
        setDtf(DurationValues("LastHour").dtf);
        setDtt(DurationValues("LastHour").dtt);
        setSelectedDuration(value);

        break;
      case "today":
        setDtf(DurationValues("Today").dtf);
        setDtt(DurationValues("Today").dtt);
        setSelectedDuration(value);

        break;
      case "yesterday":
        setDtf(DurationValues("Yesterday").dtf);
        setDtt(DurationValues("Yesterday").dtt);
        setSelectedDuration(value);
        break;
      case "two days ago":
        setDtf(DurationValues("TwoDayAgo").dtf);
        setDtt(DurationValues("TwoDayAgo").dtt);
        setSelectedDuration(value);
        break;
      case "three days ago":
        setDtf(DurationValues("ThreeDayAgo").dtf);
        setDtt(DurationValues("ThreeDayAgo").dtt);
        setSelectedDuration(value);
        break;
      case "this week":
        setDtf(DurationValues("ThisWeek").dtf);
        setDtt(DurationValues("ThisWeek").dtt);
        setSelectedDuration(value);
        break;
      case "last week":
        setDtf(DurationValues("LastWeek").dtf);
        setDtt(DurationValues("LastWeek").dtt);
        setSelectedDuration(value);
        break;
      default:
        setDtf(DurationValues("Today").dtf);
        setDtt(DurationValues("Today").dtt);
        setSelectedDuration(value);
        break;
    }
  };

  /**
   * duration array
   */
  const durations = [
    { key: 1, label: translator.LAST_HOUR, value: "last hour" },
    { key: 2, label: translator.TODAY, value: "today" },
    { key: 3, label: translator.YESTERDAY, value: "yesterday" },
    {
      key: 4,
      label: translator.TWO_DAYS_AGO,
      value: "two days ago",
    },
    {
      key: 5,
      label: translator.THREE_DAYS_AGO,
      value: "three days ago",
    },
    { key: 6, label: translator.THIS_WEEK, value: "this week" },
    { key: 7, label: translator.LAST_WEEK, value: "last week" },
  ];

  /**
   * stops values
   */
  const stops = [
    { key: 1, label: `1 ${translator.MIN}`, value: 1 },
    { key: 2, label: `2 ${translator.MIN}`, value: 2 },
    { key: 3, label: `3 ${translator.MIN}`, value: 3 },
  ];

  /**
   * on search values
   */
  const _handleSubmit = async () => {
    setLoading(true);
    setError("");
    const data = { imei, dtf, dtt, duration: stop };

    const { token, fetchRouteHistory, navigation } = props;
    const searched = await fetchRouteHistory(token, data);
    if (
      searched.polyline.length === 0 &&
      searched.routes.length === 0 &&
      searched.stops.length === 0
    ) {
      setError(translator.NO_RECORD_FOUND);
    } else {
      const carName = carList.filter((item) => item.imei === imei)[0].name;
      navigation.navigate("History", { first: true, carName, dtf, dtt });
    }

    setLoading(false);
  };

  return (
    <Container>
      <ScrollView>
        <Div style={style.header}>
          <Div style={style.headerContent}>
            <Text style={style.headerText}>{translator.HISTORY}</Text>
          </Div>
        </Div>

        <Div paddingHorizontal={10}>
          <Div
            style={[
              {
                position: "absolute",
                top: -(width * 0.05),
                left: 0,
                right: 0,
                alignItems: "center",
                justifyContent: "center",
                zIndex: 3,
              },
            ]}
          >
            <Div
              style={[
                style.content,
                {
                  width: "90%",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowOpacity: 0.29,
                  shadowRadius: 4.65,
                  elevation: 7,
                },
              ]}
            >
              <Text style={style.contentText}>{translator.CAR}</Text>
              <Picker
                data={cars}
                selectedValue={imei}
                style={{ width: width * 0.5 }}
                onChange={(value) => setImei(value)}
                cancelText={translator.CANCEL}
              />
            </Div>
          </Div>

          <ScrollView showsVerticalScrollIndicator={false}>
            <Div style={style.container}>
              <Div style={[style.content, { marginTop: 10 }]}>
                <Text style={style.contentText}>{translator.DURATION}</Text>
                <Picker
                  data={durations}
                  selectedValue={selectedDuration}
                  style={{ width: width * 0.4 }}
                  onChange={(value) => _handleDurationValue(value)}
                  cancelText={translator.CANCEL}
                />
              </Div>

              <Div style={style.content}>
                <Text style={style.contentText}>{translator.TIME_FROM}</Text>
                <DatePicker
                  style={{ maxWidth: width * 0.5 }}
                  showIcon={false}
                  date={
                    selectedDuration === translator.LAST_HOUR
                      ? moment()
                          .subtract(1, "hours")
                          .format("YYYY-MM-DD HH:mm")
                      : dtf
                  }
                  mode="datetime"
                  placeholder={translator.SELECT_DATE}
                  format="YYYY-MM-DD HH:mm"
                  confirmBtnText="Confirm"
                  cancelBtnText={translator.CANCEL}
                  customStyles={datePickerStyles.DatePickerStyles}
                  onDateChange={(date) => setDtf(date)}
                />
              </Div>

              <Div style={style.content}>
                <Text style={style.contentText}>{translator.TIME_TO}</Text>
                <DatePicker
                  style={{ maxWidth: width * 0.5 }}
                  showIcon={false}
                  date={dtt}
                  mode="datetime"
                  placeholder={translator.SELECT_DATE}
                  format="YYYY-MM-DD HH:mm"
                  confirmBtnText="Confirm"
                  cancelBtnText={translator.CANCEL}
                  customStyles={datePickerStyles.DatePickerStyles}
                  onDateChange={(date) => setDtt(date)}
                />
              </Div>

              <Div style={[style.content, { marginBottom: 60 }]}>
                <Text style={style.contentText}>
                  {translator.SELECT_STOP_TIME}
                </Text>
                <Picker
                  data={stops}
                  selectedValue={stop}
                  onChange={(value) => setStop(value)}
                  cancelText={translator.CANCEL}
                  style={{ width: width * 0.4 }}
                />
              </Div>
            </Div>

            <Div
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 100,
              }}
            >
              {error ? <Text style={style.errorText}>{error}!</Text> : null}

              <TouchableOpacity
                activeOpacity={0.6}
                style={style.button}
                onPress={() => _handleSubmit()}
                disabled={loading}
              >
                {!loading ? (
                  <Ionicons name="eye-outline" size={20} color={Colors.white} />
                ) : (
                  <ActivityIndicator size="small" color={Colors.white} />
                )}
                <Text style={style.buttonText}>{translator.SEE_RESULT}</Text>
              </TouchableOpacity>

              <Div
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 30,
                  flexWrap: "wrap",
                }}
              >
                <Ionicons
                  name="information-circle-outline"
                  size={18}
                  color={Colors.danger}
                />
                <Text style={style.infoText}>
                  {translator.HISTORY_FRONT_TEXT}
                </Text>
              </Div>
            </Div>
          </ScrollView>
        </Div>
      </ScrollView>
    </Container>
  );
};

const datePickerStyles = {
  DatePickerStyles: {
    dateInput: {
      backgroundColor: "rgba(255,255,255,0.8)",
      borderWidth: 0.5,
      borderColor: "#CECECE",
      borderRadius: 10,
      paddingVertical: 0,
      height: 35,
    },
    datePickerCon: {
      backgroundColor: "#fff",
    },
    datePicker: {
      backgroundColor: "#333",
      justifyContent: "center",
    },
  },
};

const style = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  header: {
    height: width * 0.25,
    backgroundColor: Colors.primary,
    paddingHorizontal: 10,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  headerText: {
    color: "#fff",
    fontSize: 24,
    marginLeft: 10,
    fontFamily: Fonts.regular,
  },
  container: {
    position: "relative",
    top: width * 0.15,
    backgroundColor: Colors.white,
    borderRadius: 5,
    marginHorizontal: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  contentText: {
    fontSize: 15,
    fontFamily: Fonts.regular,
    color: Colors.darkGrey,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.primary,
    borderRadius: 5,
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.4,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: Fonts.bold,
    marginLeft: 10,
  },
  infoText: {
    color: Colors.danger,
    fontSize: 12,
    fontFamily: Fonts.regular,
    marginLeft: 5,
    textAlign: "center",
  },
  errorText: {
    backgroundColor: Colors.danger,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 10,
    color: Colors.white,
    fontSize: 15,
    fontFamily: Fonts.regular,
    marginLeft: 5,
    textAlign: "center",
  },
});

/* map state to props
============================================================================= */
const mapStateToProps = ({ Tracking, Auth }) => ({
  cars: Tracking.cars,
  token: Auth.user.token,
  user: Auth.user,
});

const mapDispatchToProps = (dispatch) => ({
  fetchRouteHistory: (token: string, data: Object) =>
    dispatch(getRouteHistory(token, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HistoryFrontScreen);
