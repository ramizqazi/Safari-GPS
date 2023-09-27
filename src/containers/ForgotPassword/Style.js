import { StyleSheet } from "react-native";
import { Colors } from "../../common/Colors";
import { Fonts } from "../../common/Fonts";

const style = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  headerText: {
    fontSize: 23,
    fontFamily: Fonts.bold,
  },
  headerParapgraph: {
    color: "#999",
    marginTop: 20,
    textAlign: "center",
    fontFamily: Fonts.regular,
  },
  image: {
    marginTop: 60,
    width: 400,
    height: 250,
  },
  input: {
    width: "100%",
    padding: 15,
    borderWidth: 0.5,
    borderColor: "#999",
    borderRadius: 15,
    backgroundColor: "#f5f5f5",
    fontSize: 17,
    fontFamily: Fonts.regular,
  },
  rememberText: {
    color: "#000",
    fontFamily: Fonts.regular,
  },
  rememberTextLogin: {
    color: Colors.primary,
    fontFamily: Fonts.bold,
    marginLeft: 5,
  },
  button: {
    width: "100%",
    padding: 15,
    backgroundColor: Colors.primary,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: Colors.white,
    fontSize: 20,
  },
  alertContainer: {
    padding: 10,
    borderRadius: 15,
    marginTop: 50,
    marginBottom: 10,
    width: "100%",
  },
});

export default style;
