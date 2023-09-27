import React from "react";
import { View, Text, Modal, ScrollView, TouchableOpacity } from "react-native";
import { translator } from "../../languages";

const FilterItem = ({ name, type, handleSelect }) => {
  return (
    <TouchableOpacity
      style={[
        {
          padding: 10,
          justifyContent: "center",
          alignItems: "center",
        },
        type !== "daily_km_azalan" && {
          borderBottomWidth: 1,
          borderBottomColor: "#CECECE",
        },
      ]}
      activeOpacity={0.6}
      onPress={() => handleSelect(type)}
    >
      <Text numberOfLines={1}>{name}</Text>
    </TouchableOpacity>
  );
};

function FilterModal({ visible, handleSelect, handleCloseModal }) {
  const List = [
    { name: translator.ALL, type: "all" },
    { name: translator.FILTER_KM_ARTAN, type: "km_artan" },
    { name: translator.FILTER_KM_AZALAN, type: "km_azalan" },
    {
      name: `${translator.DAILY} ${translator.FILTER_KM_ARTAN}`,
      type: "daily_km_artan",
    },
    {
      name: `${translator.DAILY} ${translator.FILTER_KM_AZALAN}`,
      type: "daily_km_azalan",
    },
  ];

  return (
    <Modal visible={visible} transparent onRequestClose={() => null}>
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.8)",
          paddingHorizontal: 30,
          paddingVertical: 150,
          justifyContent: "center",
        }}
      >
        <View style={{ backgroundColor: "transparent", flex: 1 }}>
          <View style={{ backgroundColor: "#FFF", borderRadius: 10 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              {List.map((item, index) => (
                <FilterItem
                  key={index}
                  name={item.name}
                  type={item.type}
                  handleSelect={(e) => handleSelect(e)}
                />
              ))}
            </ScrollView>
          </View>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              padding: 15,
              borderRadius: 10,
              marginTop: 20,
              backgroundColor: "#FFF",
            }}
            activeOpacity={0.6}
            onPress={handleCloseModal}
          >
            <Text>{translator.CANCEL}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export default FilterModal;
