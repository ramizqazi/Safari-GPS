import React, { useEffect, useState } from "react";
import Div from "../../common/Div";
import Span from "../../common/Span";
import { Colors } from "../../common/Colors";
import style from "./Style";
import { Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { connect } from "react-redux";
import Toast from "react-native-toast-message";
import { Audio } from "expo-av";

const StepFour = (props) => {
  const { imei, setStep, blokajAsk, accAsk, token } = props;

  const [sound, setSound] = useState(null);
  const [blokajFirst, setBlokajFirst] = useState(false);
  const [accFirst, setAccFirst] = useState(false);
  const [blokaj, setBlokaj] = useState(null);
  const [blokajStatus, setBlokajStatus] = useState("kapali");
  const [kontak, setKontak] = useState("kapali");
  const [ses, setSes] = useState("kontak");

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("./audio/kilit.mp3")
    );
    setSound(sound);
    await sound.playAsync();
  }

  useEffect(() => {
    if(ses === "kontak"){
      playSound();
      setSes("kapali");
    }
  }, [ses])

  useEffect(
    () => {
      return sound
        ? () => {
            sound.unloadAsync();
          }
        : undefined;
    },
    [sound]
  );

  useEffect(
    () => {
      if (accAsk) {
        let interval;
        if (kontak !== "bitti") {
          interval = setInterval(getAcc, 1000);
        } else {
          clearInterval(interval);
        }
        return () => clearInterval(interval);
      }
    },
    [kontak]
  );

  useEffect(

    () => {
      if (blokajStatus === "bitti") {
        setStep(5);
      }
      if (kontak === "bitti" && !blokajAsk) {
        setStep(5);
      }
      if (!accAsk && blokajStatus === "bitti") {
        setStep(5);
      }
      if (!accAsk && !blokajAsk) {
        setStep(5);
      }
    },
    [blokajStatus, kontak]
  );

  const getAcc = async () => {
    const { data } = await axios.get(
      `https://tr1.safari-gps.live/saha/saha.php?op=check&parameter=acc&imei=${imei}`
    );

    if (data.acc == 1) {
      setKontak("acik");
    } else if (data.acc == 0 && accFirst) {
      setKontak("bitti");
    } else if (data.acc == 0 && !accFirst) {
      setAccFirst(true);
      setKontak("kapali");
      if(ses !== "kontak" && kontak==="acik" ){
        setSes('kontak')
      }
      
    }
  };

  const sendBlokaj = async (type) => {
    let command;
    if (type === "ac") {
      command = "relay,1";
    } else {
      command = "relay,0";
    }

    const { data } = await axios.get(
      `https://tr1.safari-gps.live/func/react_cmd.php?cmd=react_send_commands&token=${token}&lng=turkish&imei=${imei}&command=${command}`
    );

    if (data.status === "OK") {
      setBlokaj(true);
      Toast.show({
        type: "success",
        text1: "Komut Gönderildi! Lütfen Bekleyiniz.",
        visibilityTime: 2000,
        autoHide: true,
      });
    }
  };

  const getBlokaj = async () => {
    const { data } = await axios.get(
      `https://tr1.safari-gps.live/saha/saha.php?op=check&parameter=output1&imei=${imei}`
    );

    if (data.output1 == 1) {
      setBlokajStatus("acik");
    } else if (data.output1 == 0 && blokajFirst) {
      setBlokajStatus("bitti");
    } else if (data.output1 == 0 && !blokajFirst) {
      setBlokajFirst(true);
      setBlokajStatus("kapali");
    }

  };

  useEffect(
    () => {
      if (blokajAsk) {
        let interval;
        if (blokajStatus !== "bitti") {
          interval = setInterval(getBlokaj, 1000);
        } else {
          clearInterval(interval);
        }
        return () => clearInterval(interval);
      }
    },
    [blokajStatus]
  );

  return (
    <Div>
      <Div style={{ zIndex: 50 }}>
        <Toast />
      </Div>

      {accAsk && (
        <>
          {kontak === "kapali" && <Text>Lütfen Aracın Kontağını Açınız!</Text>}
          {kontak == "acik" && <Text>Lütfen Aracın Kontağını Kapatınız!</Text>}
        </>
      )}

      {blokajAsk &&
        (kontak === "bitti" || !accAsk) &&
        blokajStatus !== "bitti" && (
          <Div>
            <Span justifyContent="space-between">
              <Text>Blokaj</Text>

              {blokajStatus === "kapali" && (
                <TouchableOpacity
                  activeOpacity={0.6}
                  style={[style.accButton, style.accButtonDanger]}
                  onPress={() => sendBlokaj("ac")}
                >
                  <Text
                    style={[style.accButtonText, style.accButtonDangerText]}
                  >
                    Etkinleştir
                  </Text>
                </TouchableOpacity>
              )}
              
              {blokajStatus === "acik" && (
                <TouchableOpacity
                  activeOpacity={0.6}
                  style={[style.accButton, style.accButtonSuccess]}
                  onPress={() => sendBlokaj("kapat")}
                >
                  <Text
                    style={[style.accButtonText, style.accButtonSuccessText]}
                  >
                    Devre dışı bırak
                  </Text>
                </TouchableOpacity>
              )}
            </Span>
          </Div>
        )}
    </Div>
  );
};

const mapStateToProps = ({ Auth }) => ({
  token: Auth.user.token,
});

export default connect(mapStateToProps)(StepFour);
