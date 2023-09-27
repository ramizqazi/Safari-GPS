// @flow

import React, { PureComponent } from "react";
import { connect } from "react-redux";
import MapView  from "react-native-maps";
import Container from "../../common/Container";
import Header from "../../common/Header";
import Fab from "../../common/Fab";
import MapPlaces from "../../common/MapPlaces";
import { LONGITUDE_DELTA, LATITUDE_DELTA } from "../../common/mapConstant";
import EventToolTip from "./EventToolTip";
import { translator } from "../../languages";
import {
  getEventDetails,
  removeEventDetails,
} from "../../actions/events_actions";
import {
  getPlaceMarkers,
  getPlaceZone,
  getRoutes,
} from "../../actions/places_actions";
import {Platform} from "react-native"


type Props = {
  token: string,
  event: Object,
  mapType: string,
  mapTraffic: boolean,
  markers: Array<Object>,
  zone: Array<Object>,
  routes: Array<Object>,
  navigation: any,
  fetchEventDetails: (token: string, eventId: string) => any,
  removeDetails: () => any,
  fetchMarkers: (token: string) => any,
  fetchZone: (token: string) => any,
  fetchRoutes: (token: string) => any,
};

class EventDetailsScreen extends PureComponent<Props> {
  constructor() {
    super();
    this.state = { fitToCoords: false, showMapPlaces: true };
    this.mapRef = null;
  }

  componentDidMount() {
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
    this._handleFetchEventDetails();
  }

  /**
   * removing the details form store
   */
  componentWillUnmount() {
    const { removeDetails } = this.props;
    removeDetails();
  }

  /**
   * fetch event details
   */
  _handleFetchEventDetails = () => {
    const { route, token, fetchEventDetails } = this.props;
    const { id } = route.params;
    fetchEventDetails(token, id);
  };

  /**
   * fit to coordinates
   * @param {Array} coordinates
   */
  _handleFitToCoordinates = (coordinates: Array) => {
    this.mapRef.fitToCoordinates(coordinates, {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
      animated: true,
    });
    this.setState({ fitToCoords: true });
  };

  /**
   * map places display and hide
   */
  _handleToggleMapPlaces = () => {
    this.setState((prevState) => ({
      showMapPlaces: !prevState.showMapPlaces,
    }));
  };

  render() {
    const {
      navigation,
      mapType,
      mapTraffic,
      event,
      markers,
      zone,
      routes,
    } = this.props;
    const { latitude, longitude } = event;
    const { fitToCoords, showMapPlaces } = this.state;
    return (
      <Container>
        <MapView
          
          showsUserLocation
          showsMyLocationButton
          mapType={mapType}
          showsTraffic={mapTraffic}
          region={
            event.latitude && {
              latitude,
              longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }
          }
          ref={(ref) => {
            this.mapRef = ref;
          }}
          style={{ flex: 1 }}
        >
          {latitude &&
            !fitToCoords &&
            this._handleFitToCoordinates([
              {
                latitude,
                longitude,
              },
            ])}

          {latitude && <EventToolTip details={event} />}
          <MapPlaces
            markers={markers}
            zone={zone}
            routes={routes}
            visible={showMapPlaces}
          />
        </MapView>

        <Fab
          yPosition="top"
          xPosition="right"
          onPress={this._handleToggleMapPlaces}
          icon={showMapPlaces ? "flash-off" : "flash-on"}
        />

        <Fab
          yPosition="top"
          xPosition="left"
          onPress={() => navigation.navigate("Events")}
          icon="arrow-back"
        />
      </Container>
    );
  }
}

/* map state to props
============================================================================= */
const mapStateToProps = ({ Auth, Events, Setting, Places }) => ({
  token: Auth.user.token,
  event: Events.event,
  mapType: Setting.mapType,
  mapTraffic: Setting.mapTraffic,
  markers: Places.markers,
  zone: Places.zone,
  routes: Places.routes,
});

/* map dispatch to props
============================================================================= */
const mapDispatchToProps = (dispatch) => ({
  fetchEventDetails: (token: string, eventId: string) =>
    dispatch(getEventDetails(token, eventId)),
  removeDetails: () => dispatch(removeEventDetails()),
  fetchMarkers: (token: string) => dispatch(getPlaceMarkers(token)),
  fetchZone: (token: string) => dispatch(getPlaceZone(token)),
  fetchRoutes: (token: string) => dispatch(getRoutes(token)),
});

/* export
============================================================================= */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventDetailsScreen);
