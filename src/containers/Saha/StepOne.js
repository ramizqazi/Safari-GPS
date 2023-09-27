import { Text, Switch } from "react-native";
import React from "react";
import Div from "../../common/Div";
import Span from "../../common/Span";
import InputText from "../../common/InputText";

const StepOne = (props) => {
  const {
    ticket,
    setTicket,
    accAsk,
    setAccAsk,
    setBlokajAsk,
    blokajAsk,
  } = props;

  return (
    <Div>
      <InputText
        label="T Numarası Giriniz"
        placeholder="1234"
        onChangeText={(e) => setTicket(e)}
        value={ticket}
      />

      <Span justifyContent="space-between">
        <Text>Kontak test edilecek mi?</Text>
        <Switch
          onTintColor="#CECECE"
          thumbTintColor="#0e59f7"
          value={accAsk}
          onValueChange={() => setAccAsk(!accAsk)}
        />
      </Span>

      <Span justifyContent="space-between" marginVertical={10}>
        <Text>Blokaj test edilecek mi?</Text>
        <Switch
          onTintColor="#CECECE"
          thumbTintColor="#0e59f7"
          value={blokajAsk}
          onValueChange={() => setBlokajAsk(!blokajAsk)}
        />
      </Span>

      
    </Div>
  );
};

export default StepOne;
