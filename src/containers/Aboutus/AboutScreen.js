import React, { useEffect } from "react";
import { connect } from "react-redux";
import Container from "../../common/Container";
import Header from "../../common/Header";
import Div from "../../common/Div";
import { Fonts } from "../../common/Fonts";
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import { translator } from "../../languages";


type Props = {
  user: Object,
  token: string,
  language: string,
  navigation: any,
};

const logo = require("../../common/img/logo.png")

const AboutScreen = (props): Props => {
  const { token, language, navigation, user } = props;

  return (
    <Container>
      <Header
        title={translator.ABOUT_US}
        leftIconOnPress={() => navigation.navigate("GeneralSettings")}
        leftIcon="arrow-back"
      />

      <Div style={styles.container}>
        <Div style={{ alignItems: "center" }}>
        <Image
            source={logo}
            style={styles.image}
          />
        </Div>

        <Text style={styles.text}>
          Safari GPS, 2013 yılında Almanya’da kurulan ve kendi mobil sistemini
          geliştiren bir teknoloji şirketi olup, üst düzey ve modern yazılımı
          ile lojistik, taşımacılık, inşaat, enerji ve birçok sektöre hizmet
          vermektedir.
        </Text>

        <Text style={styles.text}>
          Safari GPS, Avrupa’da Araç Takip Sistemi ile 25.000 üzeri araç ve
          5.000 üzeri müşteriye hizmet vermektedir. Almanya’da bulunan mühendis
          ve teknik ekibiyle Türkiye’de ve Avrupa’da ilklere imza atmak istiyor.
        </Text>

        <Text style={styles.tecrube}>8 YILI AŞKIN TECRÜBE!</Text>

        <Text style={styles.text}>
          Safari GPS, teknoloji alanındaki 8 yıllık bilgi birikimi ve hizmet
          deneyiminden yararlanarak sürekli inovasyon yeteneklerini
          geliştirmekte olup, Avrupa ve Türkiye pazarında daha fazla sektöre
          hizmet vermek için çalışmalarını yürütmektedir.
        </Text>

        <Div flex={1} style={{ justifyContent: "flex-end" }}>
          <Text
            style={[
              styles.text,
              {
                color: "#999",
                fontSize: 9,
                textAlign: "center",
                marginTop: 20,
              },
            ]}
          >
            SAFARİ YAZILIM VE ARAÇ TAKİP SİSTEMLERİ DIŞ TİCARET PAZARLAMA
            İTHALAT İHRACAT SANAYİ VE TİCARET LİMİTED ŞİRKETİ
          </Text>

          <TouchableOpacity
            onPress={() => Linking.openURL(`https://www.safari-gps.com.tr/`)}
          >
            <Text style={[styles.text, styles.link]}>www.safari-gps.com.tr</Text>
          </TouchableOpacity>
        </Div>
      </Div>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 17,
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 15,
    marginBottom: 10,
    color: "#566573",
    fontFamily: Fonts.regular,
  },
  tecrube: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 20,
    fontFamily: Fonts.bold,
    color: "#273746",
  },
  image: {
    width: 250,
    height: 100,
    resizeMode: "contain",
    marginBottom: 10,
  },
  link: {
    color: "rgba(14, 89, 247, 0.7)",
    fontSize: 12,
    textAlign: "center",
  },
});

const mapStateToProps = ({ Auth, Setting }) => ({
  language: Setting.language,
  user: Auth.user,
});

export default connect(mapStateToProps)(AboutScreen);
