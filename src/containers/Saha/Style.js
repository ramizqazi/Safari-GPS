import { StyleSheet } from "react-native";
import { Fonts } from "../../common/Fonts";
import { Colors } from "../../common/Colors";

const style = StyleSheet.create({
  header: {
    width: "100%",
    backgroundColor: Colors.white,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    paddingVertical: 15,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  headerText: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    flexWrap: "wrap",
    width: '75%',
  },
  cancelBtn: {
    borderWidth: 1,
    borderColor: Colors.danger,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 20,
  },
  controlContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 25,
  },
  controlButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 40,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  controlButtonLeft: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.black,
  },
  controlButtonRight: {
    backgroundColor: Colors.primary,
    marginLeft: "auto",
  },
  buttonText: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: Colors.white,
    marginLeft: 5,
  },
  buttonTextBack: {
    color: Colors.black,
  },
  buttonPhoto: {
    backgroundColor: Colors.success,
    justifyContent: "center",
  },
  photoText: {
    fontFamily: Fonts.regular,
    color: Colors.white,
    marginLeft: 5,
  },
  checkButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  checkButtonText: {
    color: Colors.white,
    fontFamily: Fonts.regular,
  },
  checkButtonSuccess: {
    backgroundColor: Colors.success,
  },
  checkButtonDanger: {
    backgroundColor: Colors.danger,
  },
  checkLeftText: {
    fontFamily: Fonts.bold,
  },
  smsGonderBtn: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  smsGonderText: {
    fontFamily: Fonts.regular,
    fontSize: 14,
  },
  smsGonderSuccess: {
    borderColor: Colors.success,
  },
  smsGonderDanger: {
    borderColor: Colors.danger,
  },
  smsGonderSuccessText: {
    color: Colors.success,
  },
  smsGonderDangerText: {
    color: Colors.danger,
  },
  smsStatusText: {
    fontFamily: Fonts.regular,
    fontSize: 14,
  },
  accButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  accButtonText: {
    fontFamily: Fonts.regular,
  },
  accButtonSuccessText: {
    color: Colors.success,
  },
  accButtonDangerText: {
    color: Colors.danger,
  },
  accButtonSuccess: {
    borderWidth: 1,
    borderColor: Colors.success,
  },
  accButtonDanger: {
    borderWidth: 1,
    borderColor: Colors.danger,
  },
});

export default style;
