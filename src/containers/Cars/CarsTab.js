import React from "react";
import { Text, ScrollView } from "react-native";
import Div from "../../common/Div";
import style from "./CarsStyle";
import Card from "./Card";

type Props = {
  cars: Array<Object>,
  handleCarDetail: Function,
};

const CarsTab = (props: Props) => {
  const { cars, handleCarDetail, navigation } = props;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Div style={{ marginTop: 50 }} />
      {cars?.map((car, index, arr) => (
        <Card
          key={car.imei}
          index={index}
          arr={arr}
          car={car}
          navigation={navigation}
          handleCarDetail={handleCarDetail}
        />
      ))}
      <Div style={{ marginBottom: 200 }} />
    </ScrollView>
  );
};

export default CarsTab;
