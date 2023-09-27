import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Container from "../../common/Container";
import Header from "../../common/Header";
import LoaderView from "../../common/LoaderView";
import ListingError from "../../common/ListingError";
import { Fonts } from "../../common/Fonts";
import EventListItem from "./EventListItem";
import { translator } from "../../languages";
import { Text, FlatList } from "react-native";

/* import actions
============================================================================= */
import { getEvents, getMoreEvents } from "../../actions/events_actions";

type Props = {
  token: string,
  loader: boolean,
  reLoader: boolean,
  list: Array<Object>,
  pageNo: number,
  error: string | Object,
  navigation: any,
  fetchEvents: (token: string, pageNo: number) => any,
  fetchMoreEvents: (token: string, pageNo: number) => any,
};

class EventsScreen extends PureComponent<Props> {
  componentDidMount() {
    const { list, navigation } = this.props;
    if (!list.length) this._handleFetchEvents();
  }

  /**
   * fetching events on page 1
   */
  _handleFetchEvents = () => {
    const { token, fetchEvents } = this.props;
    fetchEvents(token, 1);
  };

  /**
   * fetch more events
   */
  _handleFetchMoreEvents = () => {
    const { token, pageNo, fetchMoreEvents } = this.props;
    fetchMoreEvents(token, pageNo);
  };

  /**
   * move to event details screen
   */
  _handleDisplayEventDetails = (id: string) => {
    const { navigation } = this.props;
    navigation.navigate("EventDetails", { id });
  };

  /**
   * rendering the lis
   * @param {Array} list
   */
  _renderList = (
    list: Array,
    loader: boolean,
    reLoader: boolean,
    hasMore: boolean
  ) => {
    if (list.length) {
      return (
        <FlatList
          data={list}
          renderItem={({item}) => (
            <EventListItem
              key={Math.random(9999)}
              item={item}
              onPress={() => this._handleDisplayEventDetails(item.id)}
            />
          )}
          refreshing={loader}
          keyExtractor={(item) => Math.random(9999)}
          onRefresh={this._handleFetchEvents}
          onEndReached={hasMore ? this._handleFetchMoreEvents : null}
          ListFooterComponent={() => <LoaderView loader={reLoader} />}
        />
      );
    }
    return null;
  };

  render() {
    const { navigation, loader, reLoader, list, error, hasMore } = this.props;
    const { EVENTS, NO_RECORD_FOUND } = translator;
    const newError = !list.length && !loader ? NO_RECORD_FOUND : error;
    return (
      <Container>
        <Text style={{ margin: 20, fontFamily: Fonts.bold, fontSize: 30 }}>
          {translator.EVENTS}
        </Text>

        {this._renderList(list, loader, reLoader, hasMore)}
        <ListingError
          name={EVENTS}
          error={newError}
          retryBtnPress={this._handleFetchEvents}
        />
      </Container>
    );
  }
}

const mapStateToProps = ({ Auth, Events }) => ({
  token: Auth.user.token,
  loader: Events.loader,
  reLoader: Events.reLoader,
  list: Events.list,
  pageNo: Events.pageNo,
  error: Events.error,
  hasMore: Events.hasMore,
});

const mapDispatchToProps = (dispatch) => ({
  fetchEvents: (token: string, pageNo: number) =>
    dispatch(getEvents(token, pageNo)),
  fetchMoreEvents: (token: string, pageNo: number) =>
    dispatch(getMoreEvents(token, pageNo)),
});

/* Export
============================================================================= */
export default connect(mapStateToProps, mapDispatchToProps)(EventsScreen);
