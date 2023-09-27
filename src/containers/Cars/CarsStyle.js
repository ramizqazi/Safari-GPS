import { StyleSheet, Dimensions, Platform } from "react-native";
const { width, height } = Dimensions.get("window");
import { Colors } from "../../common/Colors";
import { Fonts } from "../../common/Fonts";

const style = StyleSheet.create({
  header: {
    height: width * 0.25,
    backgroundColor: Colors.primary,
    paddingHorizontal: 10,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  headerText: {
    color: "#fff",
    fontSize: 24,
    marginLeft: 10,
    fontFamily: Fonts.regular,
  },
  filterBtn: {
    backgroundColor: "#4979f5",
    padding: 5,
    borderRadius: 10,
  },

  tabContent: {
    position: "absolute",
    top: width * 0.2,
    left: 0,
    right: 0,
    flexDirection: "row",
    zIndex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,

    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
    }),
  },
  tabItem: {
    padding: 10,
    paddingHorizontal: 15,
    alignItems: "center",
    backgroundColor: "#fff",

    ...Platform.select({
      android: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
    }),
  },
  tabLeft: {
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7,
  },
  tabRight: {
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
  },
  tabText: {
    fontSize: 13,
    color: "#919dad",
  },
  tabSubText: {
    width: 18,
    height: 18,
    padding: 3,
    backgroundColor: "#919dad",
    borderRadius: 20,
  },
  tabSubText2: {
    fontSize: 9,
    color: "#fff",
    textAlign: "center",
    textAlignVertical: "center",
  },
  tabBottom: {
    backgroundColor: "#f7f7f7",
  },
  successText: {
    color: Colors.success,
  },
  successSubText: {
    backgroundColor: Colors.success,
  },
  successPrimary: {
    color: Colors.warning,
  },
  successSubPrimary: {
    backgroundColor: Colors.warning,
  },
  dangerText: {
    color: Colors.danger,
  },
  dangerSubText: {
    backgroundColor: Colors.danger,
  },
  listCard: {
    paddingVertical: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowAlign: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  card: {
    padding: 10,
    backgroundColor: Colors.white,
    marginHorizontal: 10,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',

    /*shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,*/
  },

  text: {
    color: Colors.darkGrey,
    marginLeft: 3,
    fontSize: 13,
    fontFamily: Fonts.regular,
  },
  openText: {
    fontSize: 11,
    color: Colors.success,
  },
  iddleText: {
    fontSize: 11,
    color: Colors.warning,
  },
  offText: {
    fontSize: 11,
    color: Colors.danger,
    fontFamily: Fonts.regular,
  },
  rolantiWayText: {
    fontSize: 10,
    color: Colors.darkWarning,
    fontFamily: Fonts.regular,
  },
  offWayText: {
    fontSize: 10,
    color: Colors.darkDanger,
    fontFamily: Fonts.regular,
  },
  onWayText: {
    fontSize: 10,
    color: Colors.darkSuccess,
    fontFamily: Fonts.regular,
  },
});

export default style;
