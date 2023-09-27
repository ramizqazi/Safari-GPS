import React, {useState, useEffect, useCallback } from "react";
import Div from "../../common/Div";
import InputText from "../../common/InputText";
import { Colors } from "../../common/Colors";
import style from "./Style";
import {
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Keyboard,
  View, Picker
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Fonts } from "../../common/Fonts";
import SearchSelect from "../../common/SearchSelect";




const StepFive = (props) => {
  const {
    setCameraType,
    ruhsatBase64,
    setRuhsatBase64,
    kmInput,
    setKmInput,
    plakaInput,
    setPlakaInput,
    customer,
    setCustomer,
    customers,
    setCustomers,
  } = props;

  
  


  return (
    <Div>
      <InputText
        placeholder="38 XX 123"
        label="Plaka"
        onChangeText={setPlakaInput}
        value={plakaInput}
        autoFocus={true}
      />
      <InputText
        placeholder="0"
        label="KM"
        keyboardType="number-pad"
        onChangeText={setKmInput}
        value={kmInput}
      />


      <Div marginVertical={0}>
          <SearchSelect
            data={customers}
            title="Müşteri Seç"
            selectedItem={setCustomer}
          />
        </Div>

      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
          Keyboard.dismiss();
          setCameraType("ruhsat");
          setRuhsatBase64("");
        }}
        style={[style.controlButton, style.buttonPhoto]}
      >
      <Ionicons name="camera-outline" size={18} color={Colors.white} />
        <Text style={style.photoText}>Ruhsatı yükle</Text>
      </TouchableOpacity>

      
      
      {ruhsatBase64 != "" && (
        <Div style={{ height: 300 }}>
          <Div
            style={{
              flexDirection: "row",
              height: 150,
              marginTop: 20,
            }}
          >
            <Image
              source={{ uri: ruhsatBase64 }}
              style={{
                width: "100%",
                height: 150,
                resizeMode: "cover",
                borderRadius: 10,
              }}
            />
          </Div>
          <TouchableOpacity
            onPress={() => setRuhsatBase64("")}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              padding: 10,
              borderRadius: 20,
              backgroundColor: Colors.danger,
              marginTop: 10,
            }}
          >
            <Text style={{ color: Colors.white, fontFamily: Fonts.semiBold }}>
              Sil
            </Text>
            <Ionicons name="close-outline" size={20} color={Colors.white} />
          </TouchableOpacity>
        </Div>
      )}
    </Div>
  );
};

export default StepFive;
