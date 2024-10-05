import axios from 'axios';
import cookie from 'react-cookie';

import * as config from '../../../../system/config';
import { validationNull, validation } from '../../../common/library/system/action';
import { createAlert } from '../../../common/function';

export const GET_MENU = 'GET_MENU';
export const GET_USER_LIST = 'GET_USER_LIST';
export const GET_USER_TOTAL = 'GET_USER_TOTAL';

export const GET_PROFILE = 'GET_PROFILE';

export const GET_USER_GROUP_LIST = 'GET_USER_GROUP_LIST';
export const GET_USER_GROUP_TOTAL = 'GET_USER_GROUP_TOTAL';
export const GET_USER_GROUP = 'GET_USER_GROUP';

export const GET_PERMISSION_STATUSES = 'GET_PERMISSION_STATUSES';
export const GET_MENU_FOR_PERMISSION = 'GET_MENU_FOR_PERMISSION';


export const GET_SEARCH_SUGGESTION = 'GET_SEARCH_SUGGESTION';
export const GET_ADMIN_ROUTE = 'GET_ADMIN_ROUTE';

export function getMenu() {
  const request = axios.get(`${config.MS_API}/admin/menu`, {
    headers: { user: cookie.load('user') }
  });
  return {
    type: GET_MENU,
    payload: request
  };
}

export function checkPermission(type, value){
  return function(dispatch, getState) {
    const state = getState();

    if(state.user != undefined && state.user.admin_route != undefined && state.user.admin_route.menu_permission != undefined) {
      var menu_permission = state.user.admin_route.menu_permission;

      var found = menu_permission.some(function (permission) {
        if(permission['permission'] == type){
          if(permission.route){
            var restricted_data_regex = new RegExp(permission.route);
            return restricted_data_regex.test(value);
          } else if(permission.model){
            var restricted_data_regex = new RegExp(permission.model);
            return restricted_data_regex.test(value);
          }
        } else {
          return false;
        }
      });

      return found;
    }
  }
}

export function getUserProfile() {
  return function(dispatch) {
    axios.get(`${config.MS_API}/admin/user/profile`,{
        headers: { user: cookie.load('user')}
    })
    .then(response => {
      dispatch( { type: GET_PROFILE, payload: response } );
    })
    .catch(response => {
    });
  }
}

export function UpdateUserProfile(data, callback) {
  return function(dispatch) {
    dispatch(validationNull());
    axios({
      method: 'put',
      url: `${config.MS_API}/update/admin/user`,
      headers: {
        user: cookie.load('user')
      },
      data: {
        data: data,
      },
    })
    .then(response => {
      if(!response.data.error && response.data){
        createAlert({ message: 'User information updated successfully !'});
        dispatch(getUserProfile());
        callback(null,response);
      } else {
        dispatch(response.data.error);
        callback(true, null);
      }
    })
    .catch(response => {
      console.log(response);
      callback(true, null);
    });
  }
}

export function getTotalUsers() {
  return function(dispatch, getState) {
    const state = getState();
    var filters_state = state.library.list_filters;
    var filter_data = {};
    if(filters_state !=undefined && filters_state.user != undefined){
      var filter_data = filters_state.user;
    }

    axios({
      method: 'post',
      url: `${config.MS_API}/admin/user/list/total`,
      headers: {
        user: cookie.load('user')
      },
      data: {
        filter: filter_data,
      },
    })
    .then(response => {
      dispatch( { type: GET_USER_TOTAL, payload: response } );
    })
    .catch(response => {
    });
  }
}

export function getUsers(callback) {
  return function(dispatch, getState) {
    const state = getState();
    var filters_state = state.library.list_filters;
    var filter_data = {};
    if(filters_state !=undefined && filters_state.user != undefined){
      var filter_data = filters_state.user;
    }
    axios({
      method: 'post',
      url: `${config.MS_API}/admin/user/list`,
      headers: {
        user: cookie.load('user')
      },
      data: {
        filter: filter_data,
      },
    })
    .then(response => {
      dispatch( { type: GET_USER_LIST, payload: response } );
      callback(null, response);
    })
    .catch(response => {
    });
  }
}

export function addUser(formData, callback) {
  return function(dispatch) {
    dispatch(validationNull());
    axios({
      method: 'post',
      url: `${config.MS_API}/admin/user/add`,
      headers: {
        user: cookie.load('user')
      },
      data: {
        formData: formData
      },
    })
    .then(response => {
      if(!response.data.error && response.data) {
        createAlert({message : 'User added successfully!'});
        dispatch(getTotalUsers());
        dispatch(getUsers(callback));
        dispatch(getUserProfile());
        callback(null, response);
      } else {
        //console.log(response.data.error);
        dispatch(validation(response.data.error));
        callback(true, null);
      }
    })
    .catch(response => {
      console.log(response);
      callback(true, null);
    });
  }
}
export function updateUser(formData, callback){
  return function(dispatch) {
    dispatch(validationNull());

    axios({
      method: 'put',
      url: `${config.MS_API}/admin/user/user/update`,
      headers: {
        user: cookie.load('user')
      },
      data: {
        formData: formData
      },
    })
    .then(response => {
      if(!response.data.error && response.data){
        callback(null, response);
        createAlert({message : 'User updated successfully!'});
        dispatch(getUserProfile());
        dispatch(getTotalUsers());
        dispatch(getUsers(callback));
      } else {
        dispatch(validation(response.data.error));
        callback(true, null);
      }
    })
    .catch(response => {
      console.log(response);
      callback(true, null);
    });
  }
}
// ---------------------------------User Group----------------------------//



export function getTotalUserGroups() {
  console.log('----dddd')
  return function(dispatch, getState) {
    const state = getState();
    var filters_state = state.library.list_filters;
    var filter_data = {};
    if(filters_state !=undefined && filters_state.user_group != undefined){
      var filter_data = filters_state.user_group;
    }

    axios({
      method: 'post',
      url: `${config.MS_API}/admin/user/user_group/total`,
      headers: {
        user: cookie.load('user')
      },
      data: {
        filter: filter_data,
      },
    })
    .then(response => {
      console.log('---response',response);
      dispatch( { type: GET_USER_GROUP_TOTAL, payload: response } );
    })
    .catch(response => {
    });
  }
}

export function getUserGroups(callback) {
  return function(dispatch, getState) {
    const state = getState();
    var filters_state = state.library.list_filters;
    var filter_data = {};
    if(filters_state !=undefined && filters_state.user_group != undefined) {
      var filter_data = filters_state.user_group;
    }
    axios({
      method: 'post',
      url: `${config.MS_API}/admin/user/user_group`,
      headers: {
        user: cookie.load('user')
      },
      data: {
        filter: filter_data,
      },
    })
    .then(response => {
      dispatch( { type: GET_USER_GROUP_LIST, payload: response } );
      callback(null, response);
    })
    .catch(response => {
      console.log(response);
    });
  }
}

export function addUserGroup(formData, callback) {
  return function(dispatch) {
    dispatch(validationNull());
    axios({
      method: 'post',
      url: `${config.MS_API}/admin/user/user_group/add`,
      headers: {
        user: cookie.load('user')
      },
      data: {
        formData: formData
      },
    })
    .then(response => {
      if(!response.data.error && response.data){
        createAlert({message : 'User Group added successfully!'});
        dispatch(getTotalUserGroups());
        dispatch(getUserGroups(callback));
        callback(null, response);
      } else {
        dispatch(validation(response.data.error));
        callback(true, null);
      }
    })
    .catch(response => {
      console.log(response);
      callback(true, null);
    });
  }
}


export function getMenuForPermission() {
  return function(dispatch) {
    axios({
      method: 'get',
      url: `${config.MS_API}/admin/user/menu_for_permission`,
      headers: {
        user: cookie.load('user')
      },
      data: {
        filter: [],
      },
    })
    .then(response => {
      dispatch( { type: GET_MENU_FOR_PERMISSION, payload: response } );
    })
    .catch(response => {

    });
  }
}


export function getPermissionStatuses() {
  return function(dispatch) {
    axios({
      method: 'get',
      url: `${config.MS_API}/admin/user/permission_statuses`,
      headers: {
        user: cookie.load('user')
      },
      data: {
        filter: [],
      },
    })
    .then(response => {
      dispatch( { type: GET_PERMISSION_STATUSES, payload: response } );
    })
    .catch(response => {

    });
  }
}


export function updateUserGroup(formData, callback){
  return function(dispatch) {
    dispatch(validationNull());

    axios({
      method: 'put',
      url: `${config.MS_API}/admin/user/user_group/${formData.user_group_id}`,
      headers: {
        user: cookie.load('user')
      },
      data: {
        formData: formData
      },
    })
    .then(response => {
      if(!response.data.error && response.data){
        createAlert({message : 'User Group updated successfully!'});
        dispatch(getTotalUserGroups());
        dispatch(getUserGroups(callback));
        callback(null, response);
      } else {
        dispatch(validation(response.data.error));
        callback(true, null);
      }
    })
    .catch(response => {
      console.log(response);
      callback(true, null);
    });
  }
}


export function getUserGroup(user_group_id, callback) {
  return function(dispatch) {
    axios({
      method: 'get',
      url: `${config.MS_API}/admin/user/user_group/${user_group_id}`,
      headers: {
        user: cookie.load('user')
      },
      data: {
        filter: [],
      },
    })
    .then(response => {
      dispatch( { type: GET_USER_GROUP, payload: response } );
      callback(null, response);
    })
    .catch(response => {

    });
  }
}

export function nullUserGroupState() {
  return {
    type: GET_USER_GROUP,
    payload: {data: null}
  }
}


export function getAdminRoute() {
  const request = axios.get(`${config.MS_API}/admin/admin_route`, {
    headers: { user: cookie.load('user') }
  });
  return {
    type: GET_ADMIN_ROUTE,
    payload: request
  };
}
