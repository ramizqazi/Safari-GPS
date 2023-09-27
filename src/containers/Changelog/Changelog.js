import React, { useEffect, useState } from "react";
import {
  Text,
  ScrollView,
  Alert,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Div from "../../common/Div";
import Span from "../../common/Span";
import Container from "../../common/Container";
import style from "./Style";
import axios from "axios";
import moment from "moment";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import "moment/locale/tr";
import "moment/locale/de";
import "moment/locale/en-gb";
import "moment/locale/ru";
import { APP_VERSION } from "../../config";
import { changeUserVersion } from "../../actions/auth_actions";
import { translator } from "../../languages";

const { width } = Dimensions.get("window");

const Changelog = (props) => {
  const { navigation, user, language, changeVersion } = props;

  const [changeLogs, setChangeLogs] = useState(null);
  const [lang, setLang] = useState("tr");

  useEffect(() => {
    getChanges();
    changeVersion(user.token);
  }, []);

  useEffect(() => {
    if (language === "turkish") {
      setLang("tr");
    } else if (language === "german") {
      setLang("de");
    } else if (language === "english") {
      setLang("en-gb");
    } else if (language === "russian") {
      setLang("ru");
    } else if (language === "ukraine") {
      setLang("ru");
    } else {
      setLang("tr");
    }
  }, [language]);

  const getChanges = async () => {
    try {

      let requestLng;

      if(language==="english" || language==="ukraine" || language==="russian" || language==="german"){
        requestLng = "german";
      }else{
        requestLng = "turkish";
      }

      const { data } = await axios.get(
        `https://tr1.safari-gps.live/func/changelog.php?cmd=get&lng=${requestLng}`
      );
      
      const datas = Object.values(data).sort((a,b) => {
        return a[3] - b[3];
      }).reverse()

      //console.log(datas)
      setChangeLogs(datas);

    } catch (e) {
      Alert.alert("Error", "Try again!");
    }
  };

  const emoji = (text) => {
    let result;

    result = text.replace("*1*", "🗺");
    result = result.replace("*2*", "🎉");
    result = result.replace("*3*", "🌎");
    result = result.replace("*4*", "⚡");
    result = result.replace("*5*", "✨");
    result = result.replace("*6*", "🚀");
    result = result.replace("*7*", "⚙️");
    result = result.replace("*8*", "📊");
    result = result.replace("*9*", "📍");
    result = result.replace("*10*", "📌");
    result = result.replace("*11*", "🔗");
    result = result.replace("*12*", "🔵");
    result = result.replace("*13*", "🔴");
    result = result.replace("*14*", "📣");
    result = result.replace("*15*", "🧭");
    result = result.replace("*16*", "🚧");
    result = result.replace("*17*", "🛰");
    result = result.replace("*18*", "⛽");
    result = result.replace("*19*", "🔔");

    return result;
  };

  return (
    <Container>
      <Div style={style.header}>
        <Span justifyContent="space-between" marginVertical={10}>
          <TouchableOpacity
            style={style.backBtn}
            onPress={() => navigation.navigate("GeneralSettings")}
            activeOpacity={0.6}
          >
            <Ionicons name="ios-arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={style.headerText}>{translator.CHANGELOG} 📬</Text>
        </Span>
        <Text style={style.subtitle}>
          {translator.CHANGELOG_DESCRIPTION}
        </Text>
      </Div>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20}}
      >
        {changeLogs && changeLogs.map((item) => (
            <Div style={style.item} key={item.version}>
              <Span justifyContent="space-between">
                <Text style={style.date}>
                  {moment(item.date)
                    .locale(lang)
                    .format("LL")}
                </Text>
                {user.version === item.version && (
                  <Div style={style.badge}>
                    <Text style={style.badgeText}>{translator.UPDATED}</Text>
                  </Div>
                )}
              </Span>

              <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ marginVertical: 10 }}
              >
                {item.photos.map((photo, index) => (
                  <Image
                    key={index}
                    source={{
                      uri: photo,
                    }}
                    style={{ width, height: 200, resizeMode: "cover" }}
                  />
                ))}
              </ScrollView>

              <Div>
                {item.changes.map((change) => (
                  <Text key={change} style={style.listText}>
                    {emoji(change)}
                  </Text>
                ))}
              </Div>
            </Div>
          ))}
      </ScrollView>
    </Container>
  );
};

const mapStateToProps = ({ Auth, Setting }) => ({
  user: Auth.user,
  language: Setting.language,
});

const mapDispatchToProps = (dispatch) => ({
  changeVersion: (token: string) =>  dispatch(changeUserVersion(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Changelog);