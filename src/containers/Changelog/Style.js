import { StyleSheet } from "react-native";
import { Fonts } from "../../common/Fonts";
import { Colors } from "../../common/Colors";

const style = StyleSheet.create({
  header:{
    paddingHorizontal: 20,
  },
  headerText: {
    fontFamily: Fonts.bold,
    color: '#202124',
    fontSize: 35,
    marginVertical: 15,
  },
  backBtn:{
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    borderWidth: 0.7,
    borderColor: '#ddd',
  },
  subtitle:{
    fontFamily: Fonts.regular,
    color: '#666',
    paddingBottom: 15,
    borderBottomWidth: 0.9,
    borderBottomColor: '#ddd',
  },
  item:{
    paddingBottom: 20,
    borderBottomWidth: 0.8,
    borderBottomColor: '#eee',
    marginTop: 30,
  },
  date:{
    fontFamily: Fonts.semiBold,
    fontSize: 25,
    marginBottom: 10,
  },
  badge:{
    backgroundColor: Colors.success,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    flexWrap: 'nowrap',
    marginBottom: 20,
  },
  badgeText:{
    color: Colors.white,
    fontFamily: Fonts.regular,
    textAlign: 'center',
  },
  listText:{
    fontFamily: Fonts.regular,
    color: '#262020',
    fontSize: 15,
  },
});

export default style;
