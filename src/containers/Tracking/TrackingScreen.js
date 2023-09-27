import React, { Component } from "react";
import { connect } from "react-redux";
import MapView , {PROVIDER_GOOGLE} from "react-native-maps";
import { Image, View, TouchableOpacity, Text, Dimensions , Platform} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Container from "../../common/Container";
import Header from "../../common/Header";
import MapPlaces from "../../common/MapPlaces";
import Fab from "../../common/Fab";
import Div from "../../common/Div";
import { Fonts } from "../../common/Fonts";
import { LATITUDE_DELTA, LONGITUDE_DELTA } from "../../common/mapConstant";
import CarMarkers from "./CarMarkers";
import CarDetailsModal from "./CarDetailsModal";
import CarsDisplayModal from "./CarsDisplayModal";
//import CarsSlider from "./CarsSlider";
import StreetModal from "./StreetModal";
import MaintenanceStatusModal from "./MaintenanceStatusModal";
import { Ionicons } from "@expo/vector-icons";
import { translator } from "../../languages";
import apiCall from "../../utils/apiCall";

/* Import actions
============================================================================= */
import {
  getPlaceMarkers,
  getPlaceZone,
  getRoutes,
} from "../../actions/places_actions";
import { getAddress } from "../../actions/tracking_actions";

/* Flow types
============================================================================= */
type Props = {
  token: string,
  server_url: string,
  language: string,
  interval: string,
  mapType: string,
  mapTraffic: string,
  markers: Array<Object>,
  zone: Array<Object>,
  routes: Array<Object>,
  lastCoords: Array<Object>,
  cars: Array<Object>,
  editCarLoader: boolean,
  fetchMarkers: (token: string) => any,
  fetchZone: (token: string) => any,
  fetchRoutes: (token: string) => any,
  registerPushNotification: (language: string) => any,
};

type State = {
  showMapPlaces: boolean,
  showTraffice: boolean,
  firstTimeToCoords: boolean,
  carsModalVisibility: boolean,
  carDetailVisibility: boolean,
  selectCarDetails: Object,
  streetModal: Object,
  address: Object,
};
/* =============================================================================
<TrackingScreen />
============================================================================= */

const { width, height } = Dimensions.get("screen");

class TrackingScreen extends Component<Props, State> {
  constructor() {
    super();
    this.state = {
      showMapPlaces: true,
      showTraffice: false,
      firstTimeToCoords: false,
      carsModalVisibility: false,
      carDetailVisibility: false,
      serverMaintenanceStatusModalVisibility: false,
      serverMaintenanceStatus: {},
      selectCarDetails: {},
      streetModal: {},
      address: {},
      addressActive: true,
    };
    this.mapRef = null;
  }

  componentDidMount() {
    const { navigation } = this.props;

    this._handleFetchMapPlaces();

    const car = this.props.route.params?.car;
    if (car) {
      this._handleOpenCarDetails(car);
    }

    this._focusScreen = navigation.addListener("focus", () => {
      this.setState({ addressActive: true });
    });
    this._blurScreen = navigation.addListener("blur", () => {
      this.setState({ addressActive: false });
      this._handleCloseCarDetails();
    });
  }

  componentWillUnmount() {
    this._focusScreen();
    this._blurScreen();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { interval } = this.props;
    const { selectCarDetails, carDetailVisibility, firstAdres } = this.state;

    /**
     * when time interval change
     */
    if (nextProps.interval !== interval) {
      this._fetchMarkers();
    }

    /**
     * Update selected car on new data
     */
    if (carDetailVisibility) {
      const carDetails = nextProps.cars.filter(
        (m) => m.imei === selectCarDetails.imei
      )[0];

      this.setState({ selectCarDetails: carDetails });

      this._getAddress(carDetails);
    }

    if (nextProps?.route.params?.car !== this.props?.route.params?.car) {
      const car = nextProps.route.params?.car;
      if (car) this._handleOpenCarDetails(car);
    }
  }

  _getAddress = async (car) => {
    const { addressActive } = this.state;
    const addressRequest = await getAddress(car, addressActive);
    this.setState({ address: addressRequest });
  };

  /**
   * fetch map places markers and zone
   */
  _handleFetchMapPlaces = () => {
    const {
      token,
      markers,
      zone,
      routes,
      fetchMarkers,
      fetchZone,
      fetchRoutes,
    } = this.props;
    if (!markers.length) fetchMarkers(token);
    if (!zone.length) fetchZone(token);
    if (!routes.length) fetchRoutes(token);
  };

  _handleToggleMapPlaces = () => {
    this.setState((prevState) => ({
      showMapPlaces: !prevState.showMapPlaces,
    }));
  };

  _handleToggleMapTrafice = () => {
    this.setState((prevState) => ({
      showTraffice: !prevState.showTraffice,
    }));
  };

  /**
   * handle fit to coordinates
   * @param {Array} points
   */
  _handleFitToCoordinates = (
    points: Array<{ latitude: number, longitude: number }>
  ) => {
    this.mapRef?.fitToCoordinates(points, {
      edgePadding: { top: 10, right: 10, bottom: 10, left: 10 },
      animated: true,
    });
  };

  /**
   * handle first time fit to coordinates
   * @param {Array} points
   */
  _handleFirstTimeFitToCoords = (
    points: Array<{ latitude: number, longitude: number }>
  ) => {
    if (this.mapRef) {
      this._handleFitToCoordinates(points);
      this.setState({ firstTimeToCoords: true });
    }
  };

  /**
   * handle modal visibility open/close
   */
  _handleModalVisibility = (name: string) => {
    this.setState((prevState) => ({
      [name]: !prevState[name],
    }));
  };

  /**
   * show car on map
   * @param {Object} car
   */
  _handleShowCarOnMap = (car: Object) => {
    this._handleModalVisibility("carsModalVisibility");
    this._handleOpenCarDetails(car);
  };

  /**
   * open car details modal
   * @param {Object} car
   */
  _handleOpenCarDetails = async (car: Object) => {
    this.setState({
      selectCarDetails: car,
      carDetailVisibility: true,
    });

    this._handleFitToCoordinates([
      { latitude: Number(car.latitude), longitude: Number(car.longitude) },
    ]);

    this._getAddress(car);
  };

  /**
   * close car details modal
   */
  _handleCloseCarDetails = () => {
    /*const { selectCarDetails } = this.state;
    this.mapRef.animateToRegion(
      {
        latitude: Number(selectCarDetails.latitude),
        longitude: Number(selectCarDetails.longitude),
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      1
    );*/

    this.setState({
      selectCarDetails: {},
      carDetailVisibility: false,
      address: {},
    });
  };

  /**
   * close maintenance modal
   */
  _handleCloseMaintenanceModal = () => {
    this.setState({
      serverMaintenanceStatus: {},
      serverMaintenanceStatusModalVisibility: false,
    });
  };

  /**
   * set street view
   
  _setStreetModal = (lat: string, lng: string) => {
    this.setState({
      streetModal: {
        latitude: lat,
        longitude: lng,
      },
    });
  };*/

  _handleCarDetail = (imei: string) => {
    const { navigation } = this.props;
    navigation.navigate("CarDetail", { imei });
  };

  render() {
    const {
      showMapPlaces,
      showTraffice,
      firstTimeToCoords,
      carDetailVisibility,
      carsModalVisibility,
      selectCarDetails,
      serverMaintenanceStatus,
      serverMaintenanceStatusModalVisibility,
      streetModal,
      address,
    } = this.state;
    const {
      navigation,
      mapType,
      mapTraffic,
      markers,
      zone,
      routes,
      cars,
      editCarLoader,
      server_url,
    } = this.props;

    const activeCars = cars.filter((item) => item.status !== false);
    const fitToCoordinates = activeCars.map((item) => ({
      latitude: Number(item.latitude),
      longitude: Number(item.longitude),
    }));

    const currentRegion = selectCarDetails.imei && {
      latitude: Number(selectCarDetails.latitude),
      longitude: Number(selectCarDetails.longitude),
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    };

    if (typeof currentRegion !== "undefined") {
      this.mapRef?.animateToRegion(currentRegion, 650);
    }

    return (
      <Container>
        <Div flex={1}>
        <MapView
            showsUserLocation
            mapType={mapType}
            showsTraffic={true}
            rotateEnabled={false}
            ref={(ref) => {
              this.mapRef = ref;
            }}
            style={{ flex: 1, width, height }}
            onPanDrag={() => {
              if (currentRegion) {
                this._handleCloseCarDetails();
              }
            }}
          >
            {activeCars?.map((car) => (
              <CarMarkers
                key={car.imei}
                car={car}
                onPress={this._handleOpenCarDetails}
              />
            ))}

            {fitToCoordinates.length > 0 && !firstTimeToCoords
              ? this._handleFirstTimeFitToCoords(fitToCoordinates)
              : null}

            <MapPlaces
              markers={markers}
              zone={zone}
              routes={routes}
              visible={showMapPlaces}
            />
          </MapView>
        </Div>

        {/* <CarsSlider
          cars={activeCars}
          onPress={this._handleOpenCarDetails}
          selectedCar={selectCarDetails}
        /> */}

        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("Cars");
          }}
          activeOpacity={0.6}
          style={{
            position: "absolute",
            top: 30,
            left: 20,
            backgroundColor: "#fff",
            borderRadius: 20,
            paddingHorizontal: 15,
            paddingVertical: 5,
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 0.7,
            borderColor: "#eee",
          }}
        >
          <Ionicons name="chevron-back-outline" size={20} color="#999" />
          <Text
            style={{
              fontFamily: Fonts.regular,
              fontSize: 18,
              marginLeft: 5,
              color: "#999",
            }}
          >
            {translator.CARS}
          </Text>
        </TouchableOpacity>

        <CarsDisplayModal
          data={cars}
          visible={carsModalVisibility}
          onClose={() => this._handleModalVisibility("carsModalVisibility")}
          onShowCar={this._handleShowCarOnMap}
        />

        <Fab
          onPress={() => this._handleModalVisibility("carsModalVisibility")}
          icon="directions-car"
          yPosition="top"
          xPosition="right"
        />

        {carDetailVisibility && (
          <CarDetailsModal
            data={selectCarDetails}
            address={address}
            //onStreetClick={this._setStreetModal}
            editCarLoader={editCarLoader}
            onClose={this._handleCloseCarDetails}
            detailCar={this._handleCarDetail}
          />
        )}

        {/*streetModal.latitude &&
          server_url === "https://tr1.safari-gps.live" && (
            <StreetModal
              lat={streetModal.latitude}
              lng={streetModal.longitude}
              onClose={this._setStreetModal}
            />
          )*/}

        {/* <MaintenanceStatusModal
          data={serverMaintenanceStatus}
          visible={serverMaintenanceStatusModalVisibility}
          onClose={this._handleCloseMaintenanceModal}
        /> */}
      </Container>
    );
  }
}

/* map state to props
============================================================================= */
const mapStateToProps = ({ Auth, Setting, Places, Tracking }) => ({
  token: Auth.user.token,
  server_url: Auth.user.server_url,
  language: Setting.language,
  interval: Setting.interval,
  mapType: Setting.mapType,
  mapTraffic: Setting.mapTraffic,
  markers: Places.markers,
  zone: Places.zone,
  routes: Places.routes,
  cars: Tracking.cars,
  editCarLoader: Tracking.editCarLoader,
});

/* map dispatch to props
============================================================================= */
const mapDispatchToProps = (dispatch) => ({
  fetchMarkers: (token: string) => dispatch(getPlaceMarkers(token)),
  fetchZone: (token: string) => dispatch(getPlaceZone(token)),
  fetchRoutes: (token: string) => dispatch(getRoutes(token)),
});

/* export
============================================================================= */
export default connect(mapStateToProps, mapDispatchToProps)(TrackingScreen);
