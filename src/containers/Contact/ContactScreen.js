// @flow

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { connect } from "react-redux";
import Container from "../../common/Container";
import LoaderView from "../../common/LoaderView";
import Div from "../../common/Div";
import Fab from "../../common/Fab";
import Icon from "react-native-vector-icons/MaterialIcons";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import apiCall from "../../utils/apiCall";
import axios from "axios";
import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  ScrollView,Platform
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LATITUDE_DELTA, LONGITUDE_DELTA } from "../../common/mapConstant";
import { translator } from "../../languages";
import marker from "./img/marker.png";

type Props = {
  user: Object,
  token: string,
  language: string,
  navigation: any,
};

const ContactScreen = (props): Props => {
  const { token, language, navigation, user } = props;

  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [returnMessage, setReturnMessage] = useState({
    type: "",
    message: "",
  });

  const [social, setSocial] = useState({
    phone: "",
    facebook: "",
    whatsapp: "",
    instagram: "",
  });

  useMemo(() => {
    if (user.locate === "DE") {
      setSocial({
        phone: "0421 40893333",
        facebook: "783119981741030",
        whatsapp: "49042140893333",
        instagram: "safarigps",
      });
    } else if (user.locate === "TR") {
      setSocial({
        phone: "(0) 530 410 75 75",
        facebook: "102129101893794",
        whatsapp: "905304107575",
        instagram: "safarigps.tr",
      });
    } else if (user.locate === "UA") {
      setSocial({
        phone: "+38",
        facebook: "safarigpsua",
        whatsapp: "38",
        instagram: "safarigps.ua",
      });
    }
  }, []);

  const sendContact = useCallback(async () => {
    setLoading(true);
    setReturnMessage({
      type: "",
      message: ""
    })

    if (text.length > 20) {
      try {
        const response = await axios.get(
          `https://tr1.safari-gps.live/REACT/appcontact/send.php?token=${token}&username=${user.username}&message=${text}`,
          {
            headers: { "content-type": "application/x-www-form-urlencoded" },
          }
        );
        setReturnMessage({
          type: "success",
          message: "Mesajınız Başarılı Bir Şekilde Gönderildi!"
        })
      } catch (e) {
        //console.log(e);
      } finally {
        setText("");
      }
    } else {
      setReturnMessage({
        type: "error",
        message: "Mesajınız 20 karakterden uzun olmalıdır!"
      })
    }
    setLoading(false);
  }, [setText, setLoading, setReturnMessage, text, token, user]);

  return (
    <Container>

      <Fab
        onPress={() => navigation.navigate("GeneralSettings")}
        icon="arrow-back"
        xPosition="left"
        yPosition="top"
      />

      <ScrollView
        style={styles.container}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Div style={styles.inputContainer}>
          <Text style={styles.description}>
            {translator.CONTACT_DESCRIPTION}
          </Text>

          {returnMessage.message!=="" && (
            <View style={{ backgroundColor: returnMessage.type==="success" ? '#42ba96' : '#df4759' , paddingVertical: 10, borderRadius: 25, marginVertical: 15 }}>
              <Text style={{ textAlign: 'center', textAlignVertical: 'center', fontSize: 15, color: '#fff' }}>{returnMessage.message}</Text>
            </View>
          )}

          <TextInput
            multiline={true}
            numberOfLines={5}
            style={styles.input}
            placeholder={translator.LIVE_PLACEHOLDER}
            value={text}
            onChange={(e) => setText(e.nativeEvent.text)}
          />
        </Div>

        <TouchableOpacity
          style={styles.sendBtn}
          activeOpacity={0.5}
          onPress={sendContact}
          disabled={loading}
        >
          <LoaderView
            loader={loading}
            backgroundColor="rgba(255,255,255,0)"
            color="#fff"
            size={18}
            padding={0}
          />
          <Text style={styles.sendText}>{translator.SEND}</Text>
        </TouchableOpacity>

        <Div
          style={{
            flex: 3,
            height: "100%",
            marginVertical: 20,
            backgroundColor: "#fff",
            borderRadius: 25,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.27,
            shadowRadius: 4.65,
            elevation: 7,
          }}
        >
          <MapView
            region={{
              latitude: 38.7268351632215,
              longitude: 35.490608358565936,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}
            style={{ flex: 1, borderRadius: 25 }}
            
          >
            <MapView.Marker
              image={marker}
              coordinate={{
                latitude: 38.7268351632215,
                longitude: 35.490608358565936,
              }}
              anchor={{ x: 0.5, y: 0.5 }}
            />
          </MapView>
        </Div>

        <Div style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 12, color: "#999" }}>
          Sahabiye, B1 Güney, Başak Sk D: 91
          </Text>
          <Text style={{ fontSize: 12, color: "#999", fontWeight: "bold" }}>
          38010 Kocasinan/Kayseri
          </Text>
        </Div>

        <Div flex={1} style={{ justifyContent: "flex-end" }}>
          <TouchableOpacity
            style={[
              styles.socialBtn,
              { backgroundColor: "#0e59f7", justifyContent: "center" },
            ]}
            onPress={() => Linking.openURL(`tel: ${social.phone} `)}
          >
            <Icon
              name="phone"
              size={20}
              style={[styles.socialIcon]}
              color="#fff"
            />
            <Text style={[styles.socialText, { textAlign: "center" }]}>
              {social.phone}
            </Text>
          </TouchableOpacity>

          <Div style={styles.socialContainer}>
            <TouchableOpacity
              style={[styles.socialBtn, { backgroundColor: "#2BB741" }]}
              onPress={() =>
                Linking.openURL(
                  `whatsapp://send?text=SafariGPS&phone=${social.whatsapp}`
                )
              }
            >
              <Image
                source={require("./img/whatsapp.png")}
                style={styles.socialIcon}
              />
              <Text style={styles.socialText}>WhatsApp</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.socialBtn, { backgroundColor: "#E1306C" }]}
              onPress={() => {
                Linking.openURL(
                  `instagram://user?username=${social.instagram}`
                ).catch(() => {
                  Linking.openURL(
                    `https://www.instagram.com/${social.instagram}`
                  );
                });
              }}
            >
              <Image
                source={require("./img/instagram.png")}
                style={styles.socialIcon}
              />
              <Text style={styles.socialText}>Instagram</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity
              style={[styles.socialBtn, { backgroundColor: "#1877F2" }]}
              onPress={() => {
                Linking.openURL(`fb://page/${social.facebook}`).catch(() => {
                  Linking.openURL(
                    `https://www.facebook.com/page/${social.facebook}`
                  );
                });
              }}
            >
              <Icon
                name="facebook"
                size={20}
                style={styles.socialIcon}
                color="#fff"
              />
              <Text style={styles.socialText}>Facebook</Text>
            </TouchableOpacity> */}
          </Div>
        </Div>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 70,
  },
  inputContainer: {
    marginTop: 10,
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 17,
    height: 120,
    textAlignVertical: "top",
  },
  socialContainer: {
    width: "100%",
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  socialBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 25,
  },
  socialText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginRight: 3,
  },
  callUs: {
    fontSize: 45,
    textAlign: "center",
  },
  sendBtn: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0e59f7",
    borderRadius: 5,
    marginTop: 20,
  },
  sendText: {
    fontSize: 17,
    color: "#fff",
  },
  description: {
    marginBottom: 20,
    fontSize: 16,
    textAlign: "center",
  },
});

const mapStateToProps = ({ Auth, Setting }) => ({
  token: Auth.user.token,
  language: Setting.language,
  user: Auth.user,
});

export default connect(mapStateToProps)(ContactScreen);
