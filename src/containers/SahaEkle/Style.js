import { StyleSheet } from "react-native";
import { Colors } from "../../common/Colors";
import { Fonts } from "../../common/Fonts";

const style = StyleSheet.create({
  button: {
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonSave:{
    flexDirection: 'row',
    backgroundColor: Colors.primary,
  },
  buttonText: {
    color: Colors.primary,
    fontFamily: Fonts.regular,
    marginRight: 5,
  },
  closeBtn:{
    position: "absolute",
    top: 30,
    right: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 30,
    width: 60,
    height: 60,
    padding: 10,
    zIndex: 99,
  },
  
});

export default style;
