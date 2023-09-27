import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Dimensions, Text, TouchableOpacity } from "react-native";
import Div from "../../common/Div";
import { Colors } from "../../common/Colors";
import { Fonts } from "../../common/Fonts";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { translator } from "../../languages";
import moment from "moment";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import "moment/locale/tr";
import "moment/locale/de";
import "moment/locale/en-gb";
import "moment/locale/ru";

const { width } = Dimensions.get("window");

const Slider = (props) => {
  const {
    routes,
    language,
    server_url,
    onChange,
    setSliderPlay,
    sliderPlay,
    routeIndex,
    setRouteIndex,
  } = props;

  const [lang, setLang] = useState("tr");
  const [loop, setLoop] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoop(Math.random());
      handlePlayChange();
    }, 1000);
    return () => {
      clearInterval(interval);
      setRouteIndex(0);
      setSliderPlay(false);
    };
  }, []);

  useEffect(
    () => {
      handlePlayChange();
    },
    [loop]
  );

  const handlePlayChange = () => {
    if (sliderPlay) {
      if (typeof routes[routeIndex] !== "undefined") {
        onChange(routes[routeIndex].coords);
      } else {
        setSliderPlay(false);
      }
      setRouteIndex(routeIndex + 1);
    }
  };

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

  const handleSliderChange = (e) => {
    if (sliderPlay) {
      setSliderPlay(false);
    }

    if (typeof routes[e] !== "undefined") {
      onChange(routes[e].coords);
    }
    setRouteIndex(Number(e));
  };

  return (
    <Div style={style.container}>
      <TouchableOpacity
        onPress={() => setSliderPlay(!sliderPlay)}
        style={style.playBtn}
        activeOpacity={0.6}
      >
        <Ionicons
          name={sliderPlay ? "stop-outline" : "play-outline"}
          size={30}
          color={Colors.white}
        />
      </TouchableOpacity>

      <Div style={style.content}>
        <Div>
          <Text style={style.textBig}>{routes[routeIndex]?.speed}</Text>
          <Text style={style.textSmall}>{translator.KPH}</Text>
        </Div>
        <Div>
          <Text style={style.textBig}>
            {moment(routes[routeIndex]?.time)
              .locale(lang)
              .format("LT")}
          </Text>
          <Text style={style.textSmall}>
            {moment(routes[routeIndex]?.time)
              .locale(lang)
              .format("MMMM D")}
          </Text>
        </Div>
      </Div>

      <Div style={style.slider}>
        <MultiSlider
          min={0}
          values={[routeIndex]}
          max={routes.length}
          sliderLength={width * 0.8}
          onValuesChange={handleSliderChange}
        />
      </Div>
    </Div>
  );
};

const style = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 80,
    width: "95%",
    backgroundColor: Colors.white,
    padding: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "#ddd",
  },
  playBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    zIndex: 5,
    top: -10,
    right: 0,
  },
  slider: {
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 10,
  },
  textBig: {
    fontSize: 22,
    fontFamily: Fonts.semiBold,
    textAlign: "center",
  },
  textSmall: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    textAlign: "center",
  },
});

const mapStateToProps = ({ Setting, Auth }) => ({
  language: Setting.language,
  server_url: Auth.user,
});

export default connect(
  mapStateToProps,
  null
)(Slider);
