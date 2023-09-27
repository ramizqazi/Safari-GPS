import React, { useState, useEffect, useCallback } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import Container from "../../common/Container";
import Div from "../../common/Div";
import Header from "../../common/Header";
import Span from "../../common/Span";
import InputText from "../../common/InputText";
import style from "./Style";
import { Ionicons } from "@expo/vector-icons";
import { Fonts } from "../../common/Fonts";
import SearchSelect from "../../common/SearchSelect";
import axios from "axios";
import { translator } from "../../languages";
import Toast from "react-native-toast-message";

const { width, height } = Dimensions.get("screen");

const MusteriEkle = ({ navigation }) => {
  const [firma, setFirma] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handleFirma = useCallback(
    (e) => {
        setFirma(e);
    }, [setFirma]
  );
  const handleName = useCallback(
    (e) => {
      setName(e);
    }, [setName]
  );
  const handleEmail = useCallback(
    (e) => {
      setEmail(e);
    }, [setEmail]
  );
  const handleUsername= useCallback(
    (e) => {
      setUsername(e);
    }, [setUsername]
  );
  const handlePassword = useCallback(
    (e) => {
      setPassword(e);
    }, [setPassword]
  );
  const handlePhone = useCallback(
    (e) => {
      setPhone(e);
    }, [setPhone]
  );


  const send = async () => {
    if (password === "") {
      Toast.show({
        type: "error",
        text1: "Şifre alanı boş bırakılamaz.",
        visibilityTime: 2000,
        autoHide: true,
      });
    }
    if (email === "") {
      Toast.show({
        type: "error",
        text1: "Email alanı boş bırakılamaz.",
        visibilityTime: 2000,
        autoHide: true,
      });
    }
    if (phone === "") {
      Toast.show({
        type: "error",
        text1: "Telefon alanı boş bırakılamaz.",
        visibilityTime: 2000,
        autoHide: true,
      });
    }
    if (name === "") {
      Toast.show({
        type: "error",
        text1: "Isim alanı boş bırakılamaz.",
        visibilityTime: 2000,
        autoHide: true,
      });
    }


    try {
      

      const { data } = await axios.post(
        `https://tr1.safari-gps.live/saha/saha.php?op=addCustomer`,
        {
          firma: firma,
          name: name,
          email: email,
          username: username,
          password: password,
          phone: phone
        }
      );
      

      if (data.status === "OK") {
        Toast.show({
          type: "success",
          text1: "Başarılı!",
          visibilityTime: 2000,
          autoHide: true,
        });

       //navigation.goBack();
       navigation.navigate("GeneralSettings");
      } else if (data.status === "FAILED") {
        Toast.show({
          type: "error",
          text1: "Bir Hata Meydana Geldi!",
          visibilityTime: 2000,
          autoHide: true,
        });
      } else if (data.status === "MAIL_DUPLICATE") {
        Toast.show({
          type: "error",
          text1: "Email adresi kullaniliyor!",
          visibilityTime: 2000,
          autoHide: true,
        });
      } else if (data.status === "USERNAME_DUPLICATE") {
        Toast.show({
          type: "error",
          text1: "Kullanici adi kullaniliyor!",
          visibilityTime: 2000,
          autoHide: true,
        });
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

  return (
    <Container>
      <Header
        leftIconOnPress={() => navigation.navigate("GeneralSettings")}
        leftIcon="arrow-back"
      />

      <Div style={{ zIndex: 5 }}>
        <Toast />
      </Div>


      <Div padding={15}>
        

      <Div>
          <InputText
            placeholder="Firma İsmi"
            label="Firma ismi"
            borderRadius={10}
            value={firma}
            onChangeText={handleFirma}
          />
        </Div>
        <Div>
          <InputText
            placeholder="İsim"
            label="İsim giriniz *"
            borderRadius={10}
            value={name}
            onChangeText={handleName}
          />
        </Div>
        <Div>
          <InputText
            placeholder="Cep Telefonu"
            label="Cep Telefonu giriniz *"
            borderRadius={10}
            value={phone}
            onChangeText={handlePhone}
          />
        </Div>
        <Div>
          <InputText
            placeholder="Email"
            label="Email giriniz *"
            borderRadius={10}
            value={email}
            onChangeText={handleEmail}
          />
        </Div>
        <Div>
          <InputText
            placeholder="Kullanıcı adı"
            label="Kullanıcı adı (boş = email)"
            borderRadius={10}
            value={username}
            onChangeText={handleUsername}
          />
        </Div>
        <Div>
          <InputText
            secureTextEntry={true}
            placeholder="Şifre"
            label="Şifre giriniz *"
            borderRadius={10}
            value={password}
            onChangeText={handlePassword}
          />
        </Div>


        <Text style={{
            marginTop: 20,
            marginBottom: 0,
            color: 'red',
            textAlign: 'center'
          }}>Müşteriye sözleşmeyi imzalattım.</Text>

        <Div marginVertical={10}>
          <TouchableOpacity
            style={[style.button, style.buttonSave]}
            activeOpacity={0.6}
            onPress={send}
          >
            <Text style={[style.buttonText, { color: "#fff" }]}>Hesap oluştur</Text>
            <Ionicons name="save-outline" size={20} color="#fff" />
          </TouchableOpacity>
        </Div>
      </Div>
    </Container>
  );
};

export default MusteriEkle;
