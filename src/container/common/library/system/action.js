import axios from 'axios';
import cookie from 'react-cookie';
import * as config from '../../../../system/config';

import { createAlert } from '../../../common/function';

export const NOTIFICATION_SET = 'NOTIFICATION_SET';
export const NOTIFICATION_REMOVE = 'NOTIFICATION_REMOVE';
export const VALIDATION_ERROR = 'VALIDATION_ERROR';
export const GET_LIST_FILTERS = 'GET_LIST_FILTERS';
export const MERGE_LIST_FILTERS = 'MERGE_LIST_FILTERS';
export const UPDATE_LIST_FILTERS = 'UPDATE_LIST_FILTERS';
export const SET_ADVANCED_FILTER_SETTING = 'SET_ADVANCED_FILTER_SETTING';

export function notificationSet() {
  return function(dispatch) {
    dispatch( { type: NOTIFICATION_SET } );
  }
}

export function notificationRemove() {
  return function(dispatch) {
    dispatch( { type: NOTIFICATION_REMOVE } );
  }
}

export function setFilters(group, group_data, type) {
  return function(dispatch, getState) {
    const state = getState();
    //var filters_state = state.cms.list_filters;
    var filters_state = state.library.list_filters;
    if(filters_state != undefined && filters_state[group] != undefined){
      if(type != undefined && type == 'merge'){
        dispatch( { type: MERGE_LIST_FILTERS, payload: group_data, group:group });
      } else {
        dispatch( { type: UPDATE_LIST_FILTERS, payload: group_data, group:group });
      }

    } else {
      filters_state = {[group]: group_data}
      dispatch( { type: GET_LIST_FILTERS, payload: {data:filters_state}} );
    }
  };
}

export function commonDelete(filter, callback) {
  return function(dispatch) {
    axios({
      method: 'post',
      url: `${config.MS_API}/admin/setting/common_delete`,
      headers: {
        user: cookie.load('user')
      },
      data: {
        filter
      },
    })
    .then(response => {
      callback(null, response);
    })
    .catch(response => {
    });
  }
}

export function commonDeleteRecords(props, callback) {
  return function (dispatch) {
    axios({
      method: 'post',
      url: `${config.MS_API}/admin/catalog/common_delete_records`,
      headers: {
        user: cookie.load('user')
      },
      data: {
        props: props
      },
    })
    .then(response => {
      callback(null, response);
    })
    .catch(response => {
      console.log("commonDeleteRecords error>>>>>", response);
      callback(true, null);
    });
  }
}

export function updateDataFromCell(props, callback) {
  return function (dispatch) {
    dispatch(validationNull());

    axios({
      method: 'put',
      url: `${config.MS_API}/admin/catalog/category/update_cell`,
      headers: {
        user: cookie.load('user')
      },
      data: {
        props: props,
      },
    })
    .then(response => {
      if (!response.data.error && response.data) {
        if(props.page == 'category') {
          createAlert({ message: 'Success: Category updated successfully!' });
        } else if(props.page == 'product') {
          createAlert({ message: 'Success: Product updated successfully!' });
        }
        callback(null, response);
      } else {
        //createAlert({ type: 'danger', message: response.data.error });
        dispatch(validation(response.data.error))
        callback(true, null);
      }
    })
    .catch(response => {
      console.log("response>>>>>>>>>", response);
      createAlert({ type: 'danger', message: 'Bad Update operation from List' });
      callback(true, null);
    });
  }
}

export function validation(error) {
  return {
    type: VALIDATION_ERROR,
    payload: error
  }
}
export function validationNull() {
  return {
    type: VALIDATION_ERROR,
    payload: null
  }
}

//23-05-2020
export function setAdvancedFilterSetting(setting, callback) {
  return function(dispatch, getState) {
    dispatch( { type: SET_ADVANCED_FILTER_SETTING, payload: {data: setting }} );
    callback(null, true);
  };
}
//23-05-2020
