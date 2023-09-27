import React, { useEffect, useState, useRef, useCallback } from "react";
import { Text, TouchableOpacity, Dimensions, ScrollView } from "react-native";
import Container from "../../common/Container";
import Div from "../../common/Div";
import { Fonts } from "../../common/Fonts";
import { Colors } from "../../common/Colors";
import { translator } from "../../languages";
import { connect } from "react-redux";
import style from "./Style";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import CameraScreen from "./Camera";
import StepFive from "./StepFive";
import ControlButtons from "./ControlButtons";
import axios from "axios";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";

const SahaScreen = (props) => {
  const { navigation, language } = props;

  const [cameraType, setCameraType] = useState("");
  const [step, setStep] = useState(1);
  const [ticket, setTicket] = useState(""); //1236
  const [imei, setIMEI] = useState("");
  const [sim, setSIM] = useState("");
  const [iccid, setICCID] = useState("");
  const [kmInput, setKmInput] = useState("0");
  const [plakaInput, setPlakaInput] = useState("");
  const [status, setStatus] = useState("");
  const [ruhsatBase64, setRuhsatBase64] = useState("");
  const [loading, setLoading] = useState(false);
  const [accAsk, setAccAsk] = useState(true);
  const [blokajAsk, setBlokajAsk] = useState(true);
  const [smsTypes, setSMSTypes] = useState([]);
  const [smsStatus, setSMSStatus] = useState(false);
  const [customer, setCustomer] = useState(null);
  const [customers, setCustomers] = useState(null);


  useEffect(
    () => {
      let interval;

      getCustomers();
      if (smsTypes.length === 3 && !smsStatus) {
        interval = setInterval(getSmsMessages, 2000);
      } else if (smsTypes.length === 3 && smsStatus) {
        clearInterval(interval);
      }
      return () => {
        clearInterval(interval);
      };
    },[smsTypes, smsStatus]
  );

  const getCustomers = useCallback(
    async () => {
      const { data } = await axios.get(
        "https://tr1.safari-gps.live/saha/saha.php?op=getCustomers"
      );
      setCustomers(data);
    },
    [setCustomers]
  );

  const handlePlateChange = (e) => {
    if (e.length > 11) {
      Toast.show({
        type: "error",
        text1: "Plakayı doğru giriniz!",
        visibilityTime: 2000,
        autoHide: true,
      });
    } else {
      setPlakaInput(e.toUpperCase());
    }
  };

  const saveAll = async () => {

    if (plakaInput.length == "") {
      Toast.show({
        type: "error",
        text1: "Plaka alanı boş olamaz!",
        visibilityTime: 2000,
        autoHide: true,
      });
      return;
    }

    try {
      const { data } = await axios.post(
        `https://tr1.safari-gps.live/saha/sendmail.php`,
        {
          t_number: ticket,
          imei: imei,
          sim_number: sim,
          sim_iccid: iccid,
          plate_number: plakaInput,
          km: kmInput,
          customer_id: customer?.ID || 0,
          ruhsat: ruhsatBase64,
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (data.status == "ok") {
        Toast.show({
          type: "success",
          text1: "Kayıt başarılı! Yönlendiriliyorsunuz...",
          visibilityTime: 2000,
          autoHide: true,
        });
        setTimeout(() => {
          navigation.navigate("GeneralSettings");
        }, 2000);
      } else if (data.status == "imei") {
        Toast.show({
          type: "error",
          text1: "IMEI kontrol edilmedi!",
          visibilityTime: 2000,
          autoHide: true,
        });
      }

    } catch {
      Toast.show({
        type: "error",
        text1: "Bir Hata Meydana Geldi!",
        visibilityTime: 2000,
        autoHide: true,
      });
    }
  };

  const handleStep = (e) => {
    if (e === 2) {
      checkTicket();
    } else if (e === 4) {
      if (accAsk || blokajAsk) {
        setStep(4);
      } else {
        checkSMS();
      }
    } else if (e === 6) {
      saveAll();
    } else if (e === 3) {
      checkSMS();
    } else {
      setStep(e);
    }
  };

  const checkSMS = async () => {
    const { data } = await axios.get(
      `https://tr1.safari-gps.live/saha/saha.php?op=check&parameter=dt_server&imei=${imei}`
    );


    if (data.online === 1 && status == 1) {
      setStep(4);
    } else {
      setStep(3);
    }
  };

  const checkTicket = useCallback(
    async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `https://tr1.safari-gps.live/saha/saha.php?op=activate&t_number=${ticket}`
        );

        if (!data.imei && !data.sim_number) {
          Toast.show({
            type: "error",
            text1: "Ticket bulunamadı",
            visibilityTime: 2000,
            autoHide: true,
          });
        } else {
          setIMEI(data.imei);
          setSIM(data.sim_number);
          setICCID(data.sim_iccid);
          setStatus(data.status);
          setSMSStatus(false);
          setSMSTypes([]);

          setStep(2);
        }
      } catch (e) {
        Toast.show({
          type: "error",
          text1: "Bir Hata Meydana Geldi!",
          visibilityTime: 2000,
          autoHide: true,
        });
      } finally {
        setLoading(false);
      }
    },
    [
      setLoading,
      setIMEI,
      setSIM,
      setICCID,
      setStatus,
      setStep,
      ticket,
      setSMSStatus,
      setSMSTypes,
    ]
  );

  const getSmsMessages = async () => {
    try {
      const { data } = await axios.get(
        `https://tr1.safari-gps.live/saha/saha.php?op=check&parameter=dt_server&imei=${imei}`
      );

      if (data.online === 1) {
        setSMSStatus(true);
        if (accAsk || blokajAsk) {
          setStep(4);
        } else {
          setStep(5);
        }
      }
    } catch (e) {
      Toast.show({
        type: "error",
        text1: "Bir Hata Meydana Geldi!",
        visibilityTime: 2000,
        autoHide: true,
      });
    }
  };

  const handleCancel = () => {
    navigation.navigate("GeneralSettings");
  };

  return (
    <Container padding={10} backgroundColor="#efefef">
      <Div style={{ zIndex: 9 }}>
        <Toast />
      </Div>

      <Div
        style={[
          style.header,
          {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          },
        ]}
      >
        <Text style={style.headerText}>
          {step === 1 && "Lütfen Ticket Numarasını Giriniz!"}
          {step === 2 && "Lütfen Bilgileri Kontrol Ediniz!"}
          {step === 3 && "Aktivasyon için SMS Gönderiniz!"}
          {step === 4 && "Aracı Kontrol Ediniz!"}
          {step === 5 && "Aracın Ruhsatını, KM Sayacını ve Plakasını Giriniz!"}
        </Text>

        <TouchableOpacity style={style.cancelBtn} onPress={handleCancel}>
          <Text style={{ color: Colors.danger }}>İptal</Text>
          <Ionicons name="close-outline" size={16} color={Colors.danger} />
        </TouchableOpacity>
      </Div>

      <ScrollView style={style.container}>
        {step === 1 && (
          <StepOne
            ticket={ticket}
            setTicket={(e) => setTicket(e)}
            accAsk={accAsk}
            blokajAsk={blokajAsk}
            setAccAsk={setAccAsk}
            setBlokajAsk={setBlokajAsk}
          />
        )}

        {step === 2 && <StepTwo imei={imei} sim={sim} iccid={iccid} />}

        {step === 3 && (
          <StepThree
            sim={sim}
            imei={imei}
            setSMSTypes={setSMSTypes}
            smsTypes={smsTypes}
            smsStatus={smsStatus}
            setSMSStatus={setSMSStatus}
          />
        )}

        {step === 4 && (
          <StepFour
            imei={imei}
            setStep={setStep}
            blokajAsk={blokajAsk}
            accAsk={accAsk}
          />
        )}

        {step === 5 && (
          <StepFive
            setCameraType={setCameraType}
            ruhsatBase64={ruhsatBase64}
            setPlakaInput={handlePlateChange}
            plakaInput={plakaInput}
            setKmInput={setKmInput}
            kmInput={kmInput}
            setRuhsatBase64={setRuhsatBase64}

            customer={customer}
            setCustomer={setCustomer}
            customers={customers}
            setCustomers={setCustomers}
          />
        )}

        <ControlButtons
          step={step}
          handleStep={(e) => handleStep(e)}
          loading={loading}
        />
      </ScrollView>

      {cameraType === "ruhsat" && (
        <CameraScreen
          type="ruhsat"
          setRuhsat={(e) => setRuhsatBase64(e)}
          onClose={() => setCameraType("")}
        />
      )}
    </Container>
  );
};

const mapStateToProps = ({ Setting }) => ({
  language: Setting.language,
});

export default connect(mapStateToProps)(SahaScreen);
