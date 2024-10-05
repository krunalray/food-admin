import {
  GET_MENU,
  GET_PROFILE,
  GET_USER_LIST,
  GET_USER_TOTAL,
  GET_USER_GROUP_LIST,
  GET_USER_GROUP_TOTAL,
  GET_USER_GROUP,
  GET_PERMISSION_STATUSES,
  GET_MENU_FOR_PERMISSION,
  GET_ADMIN_ROUTE
} from './action';

const INITIAL_STATE =  {
};

const userReducer = function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_MENU:
      return { ...state, menu: action.payload.data }
    case GET_PROFILE:
      return { ...state, profile: action.payload.data }
    case GET_USER_LIST:
      return { ...state, user_list: action.payload.data }
    case GET_USER_TOTAL:
      return { ...state, user_total: action.payload.data.total }
    case GET_USER_GROUP_LIST:
      return { ...state, user_group_list: action.payload.data }
    case GET_USER_GROUP_TOTAL:
      return { ...state, user_group_total: action.payload.data.total }
    case GET_USER_GROUP:
      return { ...state, user_group: action.payload.data }
    case GET_PERMISSION_STATUSES:
      return { ...state, permission_statuses: action.payload.data }
    case GET_MENU_FOR_PERMISSION:
      return { ...state, menu_for_permission: action.payload.data }
    case GET_ADMIN_ROUTE:
      return { ...state, admin_route: action.payload.data }  
    default:
      return state;
  }
}

export default userReducer;
