import {
  GET_OBJECT_CONTROL_COMMANDS,
  SEND_OBJECT_CONTROL_COMMAND_LOADER,
  SEND_OBJECT_CONTROL_COMMAND_SUCCESS,
  GET_OBJECT_CONTROL_COMMANDS_LIST_LOADER,
  GET_OBJECT_CONTROL_COMMANDS_LIST_SUCCESS,
  GET_OBJECT_CONTROL_COMMANDS_LIST_REJECTED,
} from '../actionTypes';

/* INITIAL_STATE
============================================================================= */
const INITIAL_STATE = {
  loader: false,
  commands: [],
  sentCommandsList: [],
};

/* =============================================================================
<ObjectControl Reducer />
============================================================================= */
export default function(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_OBJECT_CONTROL_COMMANDS_LIST_LOADER:
      return { ...state, loader: payload };

    case GET_OBJECT_CONTROL_COMMANDS_LIST_SUCCESS:
      return { ...state, sentCommandsList: payload };

    case GET_OBJECT_CONTROL_COMMANDS_LIST_REJECTED:
      return { ...state };

    case GET_OBJECT_CONTROL_COMMANDS:
      return { ...state, commands: payload };

    case SEND_OBJECT_CONTROL_COMMAND_LOADER:
      return { ...state, loader: payload };

    case SEND_OBJECT_CONTROL_COMMAND_SUCCESS:
      return { ...state };

    default:
      return state;
  }
}
