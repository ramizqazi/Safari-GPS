import React, { useEffect, useState, useCallback } from "react";
import {
  Text,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import Container from "../../common/Container";
import LoaderView from "../../common/LoaderView";
import InputText from "../../common/InputText";
import { Colors } from "../../common/Colors";
import Div from "../../common/Div";
import Span from "../../common/Span";
import { connect } from "react-redux";
import style from "./CarsStyle";
import { getCars } from "../../actions/tracking_actions";
import { Ionicons } from "@expo/vector-icons";
import searchObject from "../../utils/searchObject";
import { savePushNotificationToken } from "../../actions/push_notification";
import {changeUserVersion } from '../../actions/auth_actions'
import LastChangeModal from "./LastChangeModal";
import CarsTab from "./CarsTab";
import { translator } from "../../languages";
import FilterModal from "./FilterModal";
import { APP_VERSION } from "../../config";
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get("screen");

const CarsScreen = (props) => {
  const { cars, navigation, language, token } = props;

  const activeCars = cars.filter((item) => item.status === "moving");
  const offCars = cars.filter(
    (item) => item.status === "stopped" || item.status === "off"
  );
  const idlingCars = cars.filter((item) => item.status === "idle");

  const [allCars, setAllCars] = useState([]);
  const [tab, setTab] = useState(1);
  const [searchable, setSearchable] = useState(false);
  const [search, setSearch] = useState("");
  const [filterModal, setFilterModal] = useState(false);
  const [lastChangesModal, setLastChangesModal] = useState(false);
  const [filterDetail, setFilterDetail] = useState(null);

  useEffect(() => {
    const { interval, token, server_url, fetchCars, userVersion, user, changeVersion } = props;

    if (APP_VERSION > userVersion) {
      setLastChangesModal(true);
      changeVersion(token)
    }else{
      setLastChangesModal(false);
    }

    const timeInterval = Number(interval.substring(0, 2));
    _registerPushNotification();

    fetchCars(token, language, server_url);

    const constanstInterval = setInterval(() => {
      fetchCars(token, language, server_url);
    }, timeInterval * 1000);
    return () => {
      clearInterval(constanstInterval);
    };
  }, []);

  useEffect(() => {
    if (filterDetail) {
      setTab(1);
      setFilterModal((filterModal) => !filterModal);
    } else {
      setFilterDetail("all");
      setFilterModal(true);
    }
  }, [filterDetail]);

  useEffect(() => {
    let sort;
    const filteringCars = cars.filter((item) => item.status !== false);

    if (!search) {
      if (filterDetail === "km_artan") {
        sort = filteringCars.sort(function(a, b) {
          return a.odometer - b.odometer;
        });
      } else if (filterDetail === "km_azalan") {
        sort = filteringCars.sort(function(a, b) {
          return b.odometer - a.odometer;
        });
      } else if (filterDetail === "daily_km_artan") {
        sort = filteringCars.sort(function(a, b) {
          return a.daily_odometer - b.daily_odometer;
        });
      } else if (filterDetail === "daily_km_azalan") {
        sort = filteringCars.sort(function(a, b) {
          return b.daily_odometer - a.daily_odometer;
        });
      } else if (filterDetail === "all") {
        sort = filteringCars;
      }
      setAllCars(sort);
    } else {
      setTab(1);
      const result = searchObject(filteringCars, search);
      setAllCars(result);
    }
  }, [filterDetail, cars, search]);

  const handleSearch = useCallback(
    (e) => {
      setSearch(e);
    },
    [setSearch]
  );

  const _registerPushNotification = () => {
    const { registerPushNotification } = props;
    registerPushNotification(language);
  };

  const closeSearch = useCallback(() => {
    setSearchable(false);
    handleSearch("");
  }, [handleSearch, setSearchable]);

  const handleSelect = useCallback(
    (e) => {
      setFilterDetail(e);
    },
    [setFilterDetail]
  );

  const handleCarDetail = (car: Object) => {
    navigation.navigate("TrackingScreen", { car });
  };

  const closeLastChangesModal = useCallback(() => {
    setLastChangesModal(false);
  }, [setLastChangesModal]);

  return (
    <Container backgroundColor="#fbfbfb">
      <LastChangeModal
        visible={lastChangesModal}
        language={language}
        handleCloseModal={closeLastChangesModal}
        token={token}
      />
      <Div style={style.header}>
        {!searchable ? (
          <Div style={style.headerContent}>
            <Div />

            <Div style={style.row}>
              <TouchableOpacity onPress={() => setSearchable(true)}>
                <Ionicons name="search-outline" color="#fff" size={24} />
              </TouchableOpacity>
              <Text style={style.headerText}>{translator.AVAILABLE_CARS}</Text>
            </Div>

            <TouchableOpacity
              activeOpacity={0.6}
              style={style.filterBtn}
              onPress={() => setFilterModal(true)}
            >
              <Ionicons name="reorder-three-outline" color="#fff" size={24} />
            </TouchableOpacity>

            <FilterModal
              visible={filterModal}
              handleCloseModal={() => setFilterModal(false)}
              handleSelect={handleSelect}
            />
          </Div>
        ) : (
          <Span alignItems="center">
            <Div flex={1} style={{ marginRight: 10 }}>
              <InputText
                backgroundColor="#fff"
                placeholder={translator.SEARCH}
                borderRadius={10}
                iconName="search"
                returnKeyType="search"
                value={search}
                onChangeText={(e) => handleSearch(e)}
                autoFocus={true}
              />
            </Div>
            <TouchableOpacity onPress={() => closeSearch()}>
              <Ionicons name="close-circle-outline" color="#fff" size={24} />
            </TouchableOpacity>
          </Span>
        )}
      </Div>

      <Div style={style.tabContent}>
        <TouchableOpacity
          onPress={() => setTab(1)}
          activeOpacity={1}
          style={[style.tabItem, style.tabLeft, tab === 1 && style.tabBottom]}
        >
          <Text style={style.tabText}>{translator.ALL}</Text>
          <Div style={style.tabSubText}>
            <Text style={style.tabSubText2}>{allCars?.length}</Text>
          </Div>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setTab(2)}
          activeOpacity={1}
          style={[style.tabItem, tab === 2 && style.tabBottom]}
        >
          <Text style={[style.tabText, style.successText]}>
            {translator.ACC_OPEN}
          </Text>
          <Div style={[style.tabSubText, style.successSubText]}>
            <Text style={style.tabSubText2}>{activeCars?.length}</Text>
          </Div>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setTab(3)}
          activeOpacity={1}
          style={[style.tabItem, tab === 3 && style.tabBottom]}
        >
          <Text style={[style.tabText, style.dangerText]}>
            {translator.ACC_OFF}
          </Text>
          <Div style={[style.tabSubText, style.dangerSubText]}>
            <Text style={style.tabSubText2}>{offCars?.length}</Text>
          </Div>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setTab(4)}
          activeOpacity={1}
          style={[style.tabItem, style.tabRight, tab === 4 && style.tabBottom]}
        >
          <Text style={[style.tabText, style.successPrimary]}>
            {translator.IDLING}
          </Text>
          <Div style={[style.tabSubText, style.successSubPrimary]}>
            <Text style={style.tabSubText2}>{idlingCars?.length}</Text>
          </Div>
        </TouchableOpacity>
      </Div>

      {cars.length === 0 && (
        <Div
          style={{
            marginTop: 50,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator
            color={Colors.primary}
            size="large"
            loader={true}
          />
        </Div>
      )}

      <Div style={style.listCard}>
        {tab === 1 && (
          <CarsTab
            cars={allCars}
            navigation={navigation}
            handleCarDetail={handleCarDetail}
          />
        )}

        {tab === 2 && (
          <CarsTab
            cars={activeCars}
            navigation={navigation}
            handleCarDetail={handleCarDetail}
          />
        )}

        {tab === 3 && (
          <CarsTab
            cars={offCars}
            navigation={navigation}
            handleCarDetail={handleCarDetail}
          />
        )}

        {tab === 4 && (
          <CarsTab
            cars={idlingCars}
            navigation={navigation}
            handleCarDetail={handleCarDetail}
          />
        )}
      </Div>

      <Div style={{ height: 40 }} />
    </Container>
  );
};

/* map state to props
============================================================================= */
const mapStateToProps = ({ Auth, Setting, Tracking }) => ({
  user: Auth.user,
  token: Auth.user.token,
  userVersion: Auth.user.version,
  server_url: Auth.user.server_url,
  language: Setting.language,
  interval: Setting.interval,
  cars: Tracking.cars,
});

/* map dispatch to props
============================================================================= */
const mapDispatchToProps = (dispatch) => ({
  fetchCars: (token: string, language: string, server_url: string) =>
    dispatch(getCars(token, language, server_url)),
 registerPushNotification: (language: string) =>
    dispatch(savePushNotificationToken(language)),
    changeVersion: (token: string) =>  dispatch(changeUserVersion(token)),
});

/* export
============================================================================= */
export default connect(mapStateToProps, mapDispatchToProps)(CarsScreen);
