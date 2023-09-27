import { combineReducers } from 'redux';
import Auth from './auth_reducer';
import Tracking from './tracking_reducer';
import History from './history_reducer';
import Events from './events_reducer';
import Places from './places_reducer';
import Setting from './setting_reducer';
import ObjectControl from './object_control_reducer';

/* =============================================================================
<RootReducer />
============================================================================= */
export default combineReducers({
  Auth,
  Tracking,
  History,
  Events,
  Places,
  Setting,
  ObjectControl,
});
