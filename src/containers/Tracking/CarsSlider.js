/*import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import Div from "../../common/Div";
import Span from "../../common/Span";
import { Fonts } from "../../common/Fonts";
import { Colors } from "../../common/Colors";
import { translator } from "../../languages";

const { width, height } = Dimensions.get("screen");
const AccActive = require("./img/engine-on.png");
const AccPasive = require("./img/engine-off.png");

const CarsSlider = (props) => {
  const { cars, selectedCar, onPress } = props;
  const [currentIndex, setCurrentIndex] = useState(null);

  const scrollViewRef = useRef(null);

  const handleOnScroll = useCallback(
    (e) => {
      setCurrentIndex(parseInt(e.nativeEvent.contentOffset.x / (width * 0.97)));
    },
    [setCurrentIndex]
  );

  useEffect(
    () => {
      if (selectCarIndex || selectCarIndex === 0) {

        scrollViewRef?.current.scrollTo({
          x: selectCarIndex * width,
          y: 0,
          animated: true,
        });
      }
    },
    [selectCarImei]
  );

  useEffect(
    () => {
      cars?.map((item, index) => {
        if (index === currentIndex) {
          onPress(item);
        }
      });
    },
    [currentIndex]
  );

  const handleCarDetail = useCallback(
    (car, index) => {
      onPress(car);
      setCurrentIndex(index);
    },
    [setCurrentIndex, onPress]
  );

  return (
    <Div style={style.content}>
      <ScrollView
        contentContainerStyle={style.scroll}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        scrollEventThrottle={5}
        ref={scrollViewRef}
      >
        {cars?.map((car, index) => (
          <TouchableOpacity
            key={index}
            style={[style.card, selectedCar === car && style.cardActive]}
            activeOpacity={0.6}
            onPress={() => handleCarDetail(car, index)}
          >
            <Div>
              <Text style={[style.text, { fontFamily: Fonts.bold }]}>
                {car.name}
              </Text>
              <Text style={[style.text, style.statusText]}>
                {car.status_time}
              </Text>
              <Text
                style={[
                  style.text,
                  style.statusText,
                  car.status === "moving" || car.status === "idle"
                    ? style.successText
                    : style.dangerText,
                ]}
              >
                {car.status === "moving" || car.status === "idle"
                  ? translator.ACC_OPEN
                  : translator.ACC_OFF}
              </Text>
            </Div>
            <Span>
              <Text style={style.text}>
                {car.speed} {translator.KPH}
              </Text>
              <Image
                source={
                  car.status === "moving" || car.status === "idle"
                    ? AccActive
                    : AccPasive
                }
                style={{ width: 25, height: 25, marginLeft: 10 }}
              />
            </Span>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Div>
  );
};

const style = StyleSheet.create({
  content: {
    position: "absolute",
    top: 30,
  },
  scroll: {
    margin: 5,
  },
  card: {
    flexDirection: "row",
    width: width,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    //marginHorizontal: 5,
    marginVertical: 10,
    borderWidth: 0.7,
    borderColor: "#e7e7e7",
  },
  cardActive: {
    //borderColor: Colors.success,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontFamily: Fonts.regular,
    fontSize: 14,
  },
  statusText: {
    fontSize: 11,
  },
  dangerText: {
    color: Colors.danger,
  },
  successText: {
    color: Colors.success,
  },
});

export default CarsSlider;
*/