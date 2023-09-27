import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import React from "react";
import Div from "../../common/Div";
import style from "./Style";
import { Ionicons } from "@expo/vector-icons";

const ControlButtons = ({ step, handleStep, loading }) => {
  return (
    <Div style={style.controlContainer}>
      {step !== 1 &&
        step !== 4 && step !== 5 && (
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => handleStep(step - 1)}
            style={[style.controlButton, style.controlButtonLeft]}
          >
            <Ionicons name="ios-arrow-back" size={20} color="#000" />
            <Text style={[style.buttonText, style.buttonTextBack]}>Geri</Text>
          </TouchableOpacity>
        )}

      {step !== 3 &&
        step !== 4 && (
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => handleStep(step + 1)}
            style={[style.controlButton, style.controlButtonRight,
            step === 5 && { width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}
            ]}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Ionicons
                name={step !== 5 ? "ios-arrow-forward" : "save-outline"}
                size={20}
                color="#fff"
              />
            )}
            
            <Text style={style.buttonText}>
              {step !== 5 ? "İleri" : "Bitir"}
            </Text>
            
          </TouchableOpacity>
        )}
    </Div>
  );
};

export default ControlButtons;
