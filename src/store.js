import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AppReducer from './reducers';

import { LOG_OUT_SUCCESS } from './actionTypes';

/**
 * when user logout so it will update app state
 */
const rootReducer = (state, action) => {
  let newState = state;
  if (action.type === LOG_OUT_SUCCESS) {
    newState = { Setting: { ...state.Setting } };
  }
  return AppReducer(newState, action);
};

/**
 * persist config
 */
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['Setting'],
};

/**
 * persisted reducer
 */
const persistedReducer = persistReducer(persistConfig, rootReducer);

/**
 * create the redux store here
 */
const store = createStore(persistedReducer, applyMiddleware(thunk));

/**
 * persist store
 */
const persistor = persistStore(store);

/* Exports
============================================================================= */
export { store, persistor };
