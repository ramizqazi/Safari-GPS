import React, { useEffect, useState, useRef } from "react";
import Div from "../../common/Div";
import { Colors } from "../../common/Colors";
import style from "./Style";
import { Text, TouchableOpacity, Linking, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Item = ({ type, smsTypes, sendSMS }) => {
  return (
    <TouchableOpacity
      onPress={() => sendSMS(type)}
      activeOpacity={0.6}
      style={[
        style.smsGonderBtn,
        smsTypes.includes(type)
          ? style.smsGonderSuccess
          : style.smsGonderDanger,
      ]}
    >
      <Text
        style={[
          style.smsGonderText,
          smsTypes.includes(type)
            ? style.smsGonderSuccessText
            : style.smsGonderDangerText,
        ]}
      >
        SMS Gönder
      </Text>

      {smsTypes.includes(type) ? (
        <Ionicons name="checkmark-outline" size={18} color={Colors.success} />
      ) : (
        <Ionicons name="close-outline" size={18} color={Colors.danger} />
      )}
    </TouchableOpacity>
  );
};

const StepThree = (props) => {
  const { sim, setSMSTypes, smsTypes, imei } = props;

  const sendSMS = (type) => {
    let url;
    let text;

    const isImei = imei.substring(0, 2) === "86";

    if (type === "1") {
      if (isImei) {
        text = '[TR,1234,22,"37.148.212.105","10238"];;';
      } else {
        text = "SERVER,1,tr1.safari-gps.live,10215,0#";
      }

      if (Platform.OS === "android") {
        url = `sms:0${sim}?body=${text}`;
      } else {
        url = `sms:/open?addresses=0${sim}&body=${text}`;
      }
    } else if (type === "2") {
      if (isImei) {
        text = '[TN,1234,3F23,"internet","",""];;';
      } else {
        text = "APN,INTERNET#";
      }

      if (Platform.OS === "android") {
        url = `sms:0${sim}?body=${text}`;
      } else {
        url = `sms:/open?addresses=0${sim}&body=${text}`;
      }
    } else if (type === "3") {
      if (isImei) {
        text = "[TP,1234,3F2D,5,3600,1800];;";
      } else {
        text = "GMT,E,0,0#";
      }

      if (Platform.OS === "android") {
        url = `sms:0${sim}?body=${text}`;
      } else {
        url = `sms:/open?addresses=0${sim}&body=${text}`;
      }
    }
    if (!smsTypes.includes(type)) {
      setSMSTypes([...smsTypes, type]);
    }
    Linking.openURL(url);
  };

  const List = [{ type: "1" }, { type: "2" }, { type: "3" }];

  return (
    <Div>
      {List.map((item) => (
        <Item
          key={item.type}
          type={item.type}
          smsTypes={smsTypes}
          sendSMS={sendSMS}
        />
      ))}

    </Div>
  );
};

export default StepThree;
