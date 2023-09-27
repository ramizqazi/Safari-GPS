import React from "react";
import { connect } from "react-redux";
import { StyleSheet, TouchableOpacity, Image } from "react-native";
import Dialog from "../../common/Dialog";
import Div from "../../common/Div";
import Text from "../../common/Text";
import { translator } from "../../languages";
import { changeValue } from "../../actions/setting_actions";
import { Fonts } from "../../common/Fonts";


const LanguageModal = ({ visible, language, onClose, changeLanguage }) => {
  const _handleChange = (lang) => {
    changeLanguage(lang);
    onClose();
  };

  const languages = [
    {
      key: 1,
      label: translator.ENGLISH,
      value: "english",
      image: require("./img/en.png"),
      avgColor: "#ba7e8f",
    },
    {
      key: 2,
      label: translator.GERMAN,
      value: "german",
      image: require("./img/de.png"),
      avgColor: "#c37700",
    },
    {
      key: 3,
      label: translator.TURKISH,
      value: "turkish",
      image: require("./img/tr.png"),
      avgColor: "#e51925",
    },
    {
      key: 4,
      label: translator.UKRAINE,
      value: "ukraine",
      image: require("./img/ua.png"),
      avgColor: "#80985e",
    },
    {
      key: 5,
      label: translator.RUSSIAN,
      value: "russian",
      image: require("./img/ru.png"),
      avgColor: "#a18393fe",
    },
  ];

  return (
    <Dialog visible={visible} title={translator.LANGUAGE} onClose={onClose}>
      <Div>
        {languages.map((item) => (
          <TouchableOpacity
            key={item.key}
            style={[
              styles.List,
              { backgroundColor: language === item.value ? "#eee" : "#FFF" },
            ]}
            onPress={() => _handleChange(item.value)}
          >
            <Image source={item.image} style={styles.flag} />
            <Text style={language === item.value ? { fontFamily: Fonts.bold } : { fontFamily: Fonts.regular } }>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </Div>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  List: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#eee",
    borderRadius: 10,
  },
  flag: { width: 30, height: 30, borderRadius: 10, marginRight: 15 },
});

const mapStateToProps = ({ Setting }) => ({
  language: Setting.language,
});

const mapDispatchToProps = (dispatch) => ({
  changeLanguage: (value: string) => dispatch(changeValue("language", value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LanguageModal);
