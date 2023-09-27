import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { WebView } from "react-native-webview";
import Container from "../../common/Container";
import Header from "../../common/Header";
import { translator } from "../../languages";
import style from "./Style";
import {
  TextInput,
  Image,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import apiCall from "../../utils/apiCall";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import { ActivityIndicator } from "react-native";
import { Colors } from "../../common/Colors";
import { Fonts } from "../../common/Fonts";
import Toast from "react-native-toast-message";

type Props = {
  language: string,
  navigation: any,
};

const ForgotPassword = (props): Props => {
  const { language, navigation } = props;

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [loader, setLoader] = useState(false);

  useEffect(
    () => {
      if (status == "success") {
        Toast.show({
          type: "success",
          text1: translator.FORGOT_PASSWORD_EMAIL_SENDED,
        });
      } else if (status == "error") {
        Toast.show({
          type: "error",
          text1: translator.FORGOT_PASSWORD_EMAIL_NOT_FOUND,
        });
      }
    },
    [status]
  );

  const sendBtn = async () => {
    if (email != "") {
      setLoader(true);

      let server2 = await apiCall(
        `https://s2.safari-gps.live/func/reset_password.php?email=${email}`
      );
      if (server2.status === "not_found") {
        let server1 = await apiCall(
          `https://safari-gps.live/func/reset_password.php?email=${email}`
        );
        if (server1.status === "not_found") {
          let serverTr = await apiCall(
            `https://tr1.safari-gps.live/func/reset_password.php?email=${email}`
          );
          if (serverTr.status === "not_found") {
            /*let serverUa = await apiCall(`https://ua1.safari-gps.live/func/reset_password.php?email=${email}`);
            if (serverUa.status === "not_found") {
              setStatus('not_found');
            } else if (serverUa.status === "success") {
              setStatus('success');
            } else {
              setStatus('error');
            }*/
            setStatus("error");
          } else if (serverTr.status === "success") {
            setStatus("success");
          } else {
            setStatus("error");
          }
        } else if (server1.status === "success") {
          setStatus("success");
        } else {
          setStatus("error");
        }
      } else if (server2.status === "success") {
        setStatus("success");
      } else {
        setStatus("error");
      }

      setEmail("");
      setLoader(false);
    }
  };

  return (
    <Container>
      <Header
        title={translator.FORGOT_PASSWORD}
        leftIcon="arrow-back"
        leftIconOnPress={() => navigation.goBack()}
      />

      <View style={{ zIndex: 9999 }}>
        <Toast />
      </View>

      <ScrollView>
        <View style={style.container}>
          <Text style={style.headerText}>{translator.FORGOT_PASSWORD}</Text>

          <Text style={style.headerParapgraph}>
            {translator.FORGOT_PASSWORD_LNG_TEXT}
          </Text>

          <Image source={require("./img/mailbox.jpg")} style={style.image} />

          <TextInput
            placeholder={translator.USERNAME_OR_EMAIL}
            placeholderTextColor="#999"
            value={email}
            onChange={setEmail}
            onChangeText={setEmail}
            autoCorrect={false}
            multiline={false}
            autoCompleteType="email"
            style={style.input}
          />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 20,
              marginBottom: 40,
            }}
          >
            <Text style={style.rememberText}>
              {translator.FORGOT_PASSWORD_REMEMBER_TEXT}
            </Text>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => navigation.goBack()}
            >
              <Text style={style.rememberTextLogin}>{translator.LOGIN}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={sendBtn}
            activeOpacity={0.6}
            style={style.button}
          >
            {(!loader && (
              <Text style={style.buttonText}>{translator.SEND}</Text>
            )) || <ActivityIndicator size="small" color="#fff" />}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Container>
  );
};

const mapStateToProps = ({ Setting }) => ({
  language: Setting.language,
});

export default connect(mapStateToProps)(ForgotPassword);
