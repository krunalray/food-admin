import update from 'react-addons-update';
import {
  GET_APP_INFO,
  GET_SETTINGS,
  SET_SIDE_MENU_STATUS
} from './action';

const INITIAL_STATE =  {
  is_notification: false
};

const appReducer = function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_APP_INFO:
      return { ...state, app_info: action.payload.data }
    case GET_SETTINGS:
      return { ...state, settings: action.payload.data }
    case SET_SIDE_MENU_STATUS:

      return { ...state, side_menu_status: action.payload.data }
      
    default:
      return state;
  }
}

export default appReducer;
