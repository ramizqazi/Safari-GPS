import { Text } from "react-native";
import React from "react";
import Div from "../../common/Div";
import InputText from "../../common/InputText";

const StepTwo = (props) => {
  const { imei, sim, iccid } = props;

  return (
    <Div>
      <Div>
        <InputText label="IMEI" editable={false} value={imei} />
        <InputText label="SIM" editable={false} value={sim} />
        <InputText label="ICCID" editable={false} value={iccid} />
      </Div>

    </Div>
  );
};

export default StepTwo;
