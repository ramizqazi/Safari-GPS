import React, { PureComponent } from "react";
import { connect } from "react-redux";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import Container from "../../common/Container";
import Header from "../../common/Header";
import MapPlaces from "../../common/MapPlaces";
import Fab from "../../common/Fab";
import Div from "../../common/Div";
import { Colors } from "../../common/Colors";
import { Fonts } from "../../common/Fonts";
import { LONGITUDE_DELTA, LATITUDE_DELTA } from "../../common/mapConstant";

import {
  Dimensions,
  TouchableOpacity,
  Text,
  Image,Platform
} from "react-native";

import StopMarkers from "./StopMarkers";
import EventMarkers from "./EventMarkers";
//import FilterModal from "./FilterModal";
import DriveModal from "./DriveModal";
import Slider from "./Slider";
import { translator } from "../../languages";
import { Ionicons } from "@expo/vector-icons";

import style from "./Style";

/* Import actions
============================================================================= */
import { getRouteHistory } from "../../actions/history_actions";
import {
  getPlaceMarkers,
  getPlaceZone,
  getRoutes,
} from "../../actions/places_actions";

import StartImage from "./img/routestart.png";
import EndImage from "./img/routeend.png";

const { width, height } = Dimensions.get("screen");
const arrow_green = require("../Tracking/img/arrow_green.png");
const arrow_red = require("../Tracking/img/arrow_red.png");

/* Flow types
============================================================================= */
type Props = {
  token: string,
  mapType: string,
  mapTraffic: boolean,
  markers: Array<Object>,
  zone: Array<Object>,
  placeRoutes: Array<Object>,
  cars: Array,
  loader: boolean,
  routes: Array,
  polylineCoords: Array,
  stops: Array,
  events: Array,
  routeInfo: Object,
  sliderMarker: Object,
  fetchRouteHistory: (token: string, data: Object) => any,
  fetchMarkers: (token: string) => any,
  fetchZone: (token: string) => any,
  fetchRoutes: (token: string) => any,
};

/* =============================================================================
<HistoryScreen />
============================================================================= */
class HistoryScreen extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      currentRegion: null,
      drivePolylineCoords: [],
      firstTimeFitToCoords: false,
      filterVisibility: false,
      driveModalVisibility: false,
      sliderMarker: {},
      sliderPlay: false,
      routeIndex: 0,
    };
    this.mapRef = null;
  }

  componentDidMount() {
    const {
      token,
      markers,
      zone,
      placeRoutes,
      fetchMarkers,
      fetchZone,
      fetchRoutes,
      navigation,
    } = this.props;

    const { firstTimeFitToCoords } = this.state;

    //this._handleOpenFilterModalAtFirstTime();
    if (!markers.length) fetchMarkers(token);
    if (!zone.length) fetchZone(token);
    if (!placeRoutes.length) fetchRoutes(token);

    this.setState({ firstTimeFitToCoords: false });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!this.props?.navigation.isFocused()) {
      this.setState({ firstTimeFitToCoords: false });
    }
  }


  /**
   * when there is no route so user will see the filter modal
   */
  _handleOpenFilterModalAtFirstTime = () => {
    const { routes } = this.props;
    if (!routes.length) this.setState({ filterVisibility: true });
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
   * on search
   * @param {Object} data
   */
  _handleSearch = async (data: Object) => {
    const { token, fetchRouteHistory } = this.props;
    this.setState({ firstTimeFitToCoords: false });
    const searched = await fetchRouteHistory(token, data);
    if (searched) this._handleModalVisibility("filterVisibility");
  };

  /**
   * handle fit to coordinates
   * @param {Array} points
   */
  _handleFitToCoordinates = (
    points: Array<{ latitude: number, longitude: number }>
  ) => {
    setTimeout(() => {
      this.mapRef?.fitToCoordinates(points, {
        edgePadding: { top: 5, right: 5, bottom: 5, left: 5 },
        animated: true,
      });
    }, 1000);
  };

  /**
   * fist time fit to coordinates
   * @param {Array} points
   */
  _handleFirstTimeFitToCoordinates = (
    points: Array<{ latitude: number, longitude: number }>
  ) => {
    this._handleFitToCoordinates(points);
    this.setState({ firstTimeFitToCoords: true });
  };

  /**
   * display drive polyline
   * @param {Array} coords
   */
  _handleDisplayDrivePolyLine = (coords: Array) => {
    this.setState({ drivePolylineCoords: coords });
    this._handleModalVisibility("driveModalVisibility");
    if (coords.length > 0) this._handleFitToCoordinates(coords);
  };

  /**
   * display route event and stop on map
   * @param {Object} coords
   */
  _handleShowRouteOnMap = (coords: Object) => {
    this.setState({
      sliderPlay: false,
      driveModalVisibility: false,
      currentRegion: coords,
      sliderMarker: {},
    });
    this._handleFitToCoordinates([coords]);
  };

  /**
   * display route event and stop on map with slider
   * @param {Object} coords
   */
  _handleShowRouteOnMapSlider = (coords: Object) => {
    this.setState({
      currentRegion: coords,
      sliderMarker: {
        latitude: coords.latitude,
        longitude: coords.longitude,
      },
    });
  };

  /**
   * handle slider play
   * @param {Boolean} e 
   */
  _handleSetSliderPlay = (e: Boolean) => {
    this.setState({ sliderPlay: e });
  }

  /**
   * handle routeIndex
   * @param {Boolean} e 
   */
   _handleSetRouteIndex = (e: Number) => {
    this.setState({ routeIndex: e });
  }

  render() {
    const {
      currentRegion,
      drivePolylineCoords,
      firstTimeFitToCoords,
      filterVisibility,
      driveModalVisibility,
      sliderMarker,
      sliderPlay,
      routeIndex,
    } = this.state;

    const { carName, dtt, dtf } = this.props.route.params;

    const {
      navigation,
      mapType,
      mapTraffic,
      markers,
      zone,
      placeRoutes,
      loader,
      history,
      routes,
      polylineCoords,
      stops,
      events,
      routeInfo,
      cars,
      userCurrency,
    } = this.props;

    return (
      <Container>
        <Div backgroundColor={Colors.primary} style={style.header}>
          <TouchableOpacity
            activeOpacity={0.6}
            style={[
              style.row,
              { position: "absolute", left: 10, top: 15, zIndex: 5 },
            ]}
            onPress={() => navigation.navigate("HistoryFront")}
          >
            <Ionicons
              name="chevron-back-outline"
              size={24}
              color={Colors.white}
            />
            <Text style={style.text}>{translator.BACK}</Text>
          </TouchableOpacity>

          <Text
            style={[
              style.text,
              { fontSize: 24, fontFamily: Fonts.regular, textAlign: "center" },
            ]}
          >
            {translator.HISTORY}
          </Text>

          <Div />
        </Div>

        <Div style={style.headContainer}>
          <Div style={style.headTab}>
            <Div style={style.headContent}>
              <Div style={style.row}>
                <Text style={style.headLeft}>{translator.VEHICLE}: </Text>
                <Text style={style.headRight}>{carName}</Text>
              </Div>

              <Div style={[style.row, { marginLeft: 10 }]}>
                <Text style={style.headLeft}>{translator.START_TIME}: </Text>
                <Text style={style.headRight}>{dtt}</Text>
              </Div>

              <Div style={[style.row, { marginTop: 10 }]}>
                <Text style={style.headLeft}>{translator.STOP_TIME}: </Text>
                <Text style={style.headRight}>{dtf}</Text>
              </Div>
            </Div>
          </Div>
        </Div>

        <MapView
          showsUserLocation
          showsMyLocationButton
          mapType={mapType}
          showsTraffic={mapTraffic}
          region={
            currentRegion && {
              ...currentRegion,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }
          }
          onPanDrag={() => this.setState({ currentRegion: null })}
          onPress={() => this.setState({ currentRegion: null })}
          ref={(ref) => {
            this.mapRef = ref;
          }}
          style={{ flex: 1 }}
        >
          {routes.length > 0 && [
            <MapView.Marker
              key="route-start"
              coordinate={routes[0].coords}
              image={StartImage}
              onPress={() => this._handleShowRouteOnMap(routes[0].coords)}
            />,
            <StopMarkers
              key="stops"
              data={stops}
              onPress={this._handleShowRouteOnMap}
            />,
            <EventMarkers
              key="events"
              data={events}
              onPress={this._handleShowRouteOnMap}
            />,
            <MapView.Marker
              key="route-end"
              coordinate={routes[routes.length - 1].coords}
              image={EndImage}
              onPress={() =>
                this._handleShowRouteOnMap(routes[routes.length - 1].coords)
              }
            />,
          ]}

          {routes.length > 0 &&
            Object.keys(sliderMarker).length !== 0 && (
              <MapView.Marker
                coordinate={{
                  latitude: Number(sliderMarker.latitude),
                  longitude: Number(sliderMarker.longitude),
                }}
                pinColor={Colors.success}
              />
            )}

          {polylineCoords.length > 0 &&
            !firstTimeFitToCoords &&
            this._handleFirstTimeFitToCoordinates(polylineCoords)}

          <MapView.Polyline
            coordinates={polylineCoords}
            strokeColor="#167cef"
            strokeWidth={2}
            lineDashPattern={[1]}
          />

          <MapView.Polyline
            coordinates={drivePolylineCoords}
            strokeColor="#167cef"
            strokeWidth={2}
            lineDashPattern={[1]}
          />
          <MapPlaces markers={markers} zone={zone} routes={placeRoutes} />
        </MapView>

        {/* <FilterModal
          markers={cars}
          visible={filterVisibility}
          buttonLoader={loader}
          onClose={() => this._handleModalVisibility("filterVisibility")}
          onSearch={this._handleSearch}
        /> */}

        {routes.length > 0 && (
          <>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() =>
                this._handleModalVisibility("driveModalVisibility")
              }
              style={style.detailButton}
            >
              <Text style={style.detailButtonText}>Detay</Text>
            </TouchableOpacity>

            <Slider
              routes={routes}
              onChange={this._handleShowRouteOnMapSlider}
              sliderPlay={sliderPlay}
              setSliderPlay={this._handleSetSliderPlay}
              routeIndex={routeIndex}
              setRouteIndex={this._handleSetRouteIndex}
            />
          </>
        )}

        {/* <Fab
          icon="filter-list"
          onPress={() => this._handleModalVisibility("filterVisibility")}
          xPosition="right"
          yPosition="top"
        /> */}

        <DriveModal
          data={history}
          currency={userCurrency}
          routeInfo={routeInfo}
          visible={driveModalVisibility}
          onClose={() => this._handleModalVisibility("driveModalVisibility")}
          showDrivePolyLine={this._handleDisplayDrivePolyLine}
          showRouteOnMap={this._handleShowRouteOnMap}
        />
      </Container>
    );
  }
}

/* map state to props
============================================================================= */
const mapStateToProps = ({ Auth, Setting, Tracking, History, Places }) => ({
  token: Auth.user.token,
  userCurrency: Auth.user.currency || "EUR",
  language: Setting.language,
  mapType: Setting.mapType,
  mapTraffic: Setting.mapTraffic,
  markers: Places.markers,
  zone: Places.zone,
  placeRoutes: Places.routes,
  cars: Tracking.cars,
  loader: History.loader,
  history: History.history,
  routes: History.routes,
  polylineCoords: History.polyline,
  stops: History.stops,
  events: History.events,
  routeInfo: History.details,
  error: History.error,
});

/* map dispatch to props
============================================================================= */
const mapDispatchToProps = (dispatch) => ({
  fetchRouteHistory: (token: string, data: Object) =>
    dispatch(getRouteHistory(token, data)),
  fetchMarkers: (token: string) => dispatch(getPlaceMarkers(token)),
  fetchZone: (token: string) => dispatch(getPlaceZone(token)),
  fetchRoutes: (token: string) => dispatch(getRoutes(token)),
});

/* export
============================================================================= */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoryScreen);
