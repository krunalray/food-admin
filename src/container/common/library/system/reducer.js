import update from 'react-addons-update';
import {
  NOTIFICATION_SET,
  NOTIFICATION_REMOVE,
  VALIDATION_ERROR,
  GET_LIST_FILTERS,
  UPDATE_LIST_FILTERS,
  MERGE_LIST_FILTERS,
  SET_ADVANCED_FILTER_SETTING
} from './action';

const INITIAL_STATE =  {};

const libraryReducer = function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case NOTIFICATION_SET:
      return { ...state, error: '', is_notification: true }
    case NOTIFICATION_REMOVE:
      return { ...state, error: '', is_notification: false }
    case GET_LIST_FILTERS:
      return { ...state, list_filters: action.payload.data }
    case UPDATE_LIST_FILTERS:
      return update(state, { list_filters: { [action.group]: {$set: action.payload} } })
    case MERGE_LIST_FILTERS:
      return update(state, { list_filters: { [action.group]: {$merge: action.payload} } })
    case VALIDATION_ERROR:
      return { ...state, error: action.payload }
    case SET_ADVANCED_FILTER_SETTING:
      return { ...state, ["advanced_filter_setting_"+action.payload.data.page]: action.payload.data.status }
    default:
      return state;
  }
}

export default libraryReducer;
