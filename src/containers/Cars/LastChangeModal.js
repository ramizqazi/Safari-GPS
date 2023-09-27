import React, { useEffect, useState } from "react";
import { Text, Alert, Image, ScrollView, Dimensions } from "react-native";
import Span from "../../common/Span";
import Div from "../../common/Div";
import Dialog from "../../common/Dialog";
import { translator } from "../../languages";
import axios from "axios";
import { Fonts } from "../../common/Fonts";
import { APP_VERSION } from "../../config";
import { connect } from "react-redux";

const { width } = Dimensions.get("window");

function LastChangeModal({ visible, handleCloseModal, language, token }) {
  const [changes, setChanges] = useState({
    changes: [],
    date: "",
    photos: [],
    version: "",
  });

  const getData = async () => {
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

      const lastVersion = Object.keys(data)
        .sort()
        .reverse()[0];
      setChanges(data[lastVersion]);

    } catch (e) {
      Alert.alert("Hata", "Hata oluştu. Lütfen tekrar deneyiniz.");
    }
  };

  useEffect(() => {
    getData();
  }, []);

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
    <Dialog
      visible={visible}
      title={translator.NEW_UPDATE}
      onClose={handleCloseModal}
      style={{ height: 500 }}
    >
      <ScrollView>
        <Span justifyContent="space-between">
          <Text style={style.date}>{changes.date}</Text>
          <Text style={style.version}>v{changes.version}</Text>
        </Span>
        <Div style={style.divider} />

        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ marginVertical: 10 }}
        >
          {changes.photos.map((photo, index) => (
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
          {changes.changes.map((change) => (
            <Text key={change} style={style.listText}>
              {emoji(change)}
            </Text>
          ))}
        </Div>
      </ScrollView>
    </Dialog>
  );
}

const style = {
  date: {
    fontFamily: Fonts.bold,
    fontSize: 20,
  },
  version: {
    fontFamily: Fonts.regular,
    fontSize: 14,
  },
  divider: {
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e6e6e6",
  },
  listText: {
    fontFamily: Fonts.regular,
    color: "#262020",
    fontSize: 15,
  },
};

export default LastChangeModal;
