import React, { useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import Div from "./Div";
import { Fonts } from "./Fonts";
import { Colors } from "./Colors";
import { Ionicons } from "@expo/vector-icons";
import searchObject from "../utils/searchObject";

const SearchSelect = (props) => {
  const { data, title, selectedItem } = props;

  const [show, setShow] = useState(false);
  const [filtered, setFiltered] = useState(null);
  const [text, setText] = useState("");

  useEffect(
    () => {
      if (text === "") {
        setShow(false);
      }
    },
    [text]
  );

  const handleChange = (e) => {
    setText(e);
    const response = searchObject(data, e);

    if (response) {
      setFiltered(response);
      setShow(true);
    } else {
      setFiltered(null);
    }
  };

  const handleSelectItem = (e) => {
    selectedItem(e)
    setText(e.name);
    setShow(false);
  }

  const handleOnFocus = () => {
    const response = searchObject(data, text);

    if(response){
      setFiltered(response);
      setShow(true);
    }else{
      setFiltered(data);
      setShow(true);
    }

  }

  if (data) {
    return (
      <ScrollView keyboardShouldPersistTaps="always">
        <Div>
          <Text style={style.label}>{title}</Text>
          <TextInput
            style={[style.input, show && style.inputOpen]}
            placeholder={title}
            onChangeText={handleChange}
            value={text}
            returnKeyType="done"
            onFocus={handleOnFocus}
          />
        </Div>
        {show && (
          <ScrollView style={style.searchContainer}>
            {filtered?.map((item, index) => (
              <TouchableOpacity  style={style.searchItem} onPress={() => handleSelectItem(item) }>
                <Text style={style.searchItemText}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </ScrollView>
    );
  }
  return <Div />;
};

const style = StyleSheet.create({
  input: {
    height: 40,
    width: "100%",
    borderWidth: 0.7,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontFamily: Fonts.regular,
    color: "#999",
  },
  inputOpen: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomWidth: 0,
  },
  searchContainer: {
    height: 100,
    borderWidth: 0.7,
    borderColor: "#ddd",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  searchItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  searchItemText: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: "#999",
  },
  label:{
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.darkGrey,
    marginBottom: 5,
  },
});

export default SearchSelect;
