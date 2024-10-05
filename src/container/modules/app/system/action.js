import axios from 'axios';
import * as config from '../../../../system/config';
import cookie from 'react-cookie';
export const GET_APP_INFO = 'GET_APP_INFO';
export const GET_SETTINGS = 'GET_SETTINGS';
export const SET_SIDE_MENU_STATUS ='SET_SIDE_MENU_STATUS';

export function getSettings() {
  const request = axios.get(`${config.MS_API}/app/admin/setting`, {
    headers: { user: cookie.load('user') }
  });
  return {
    type: GET_SETTINGS,
    payload: request
  };
}

export function setSideMenu(status) {
  return function(dispatch) {
    dispatch({ type: SET_SIDE_MENU_STATUS, payload: {data: status}} )
  }
}

