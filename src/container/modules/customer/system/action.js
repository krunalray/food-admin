import axios from 'axios';
import cookie from 'react-cookie';
import * as config from '../../../../system/config';
import { createAlert } from '../../../common/function';
import { change, arrayRemove } from 'redux-form';
import { validationNull, validation } from '../../../common/library/system/action';

export const GET_COUNTRIES = 'GET_COUNTRIES';
export const GET_COUNTRY_STATE = 'GET_COUNTRY_STATE';
export const GET_ALL_STATES = 'GET_ALL_STATES';
export const GET_SUBSCRIBER_TOTAL = 'GET_SUBSCRIBER_TOTAL';
export const GET_SUBSCRIBER_LIST = 'GET_SUBSCRIBER_LIST';
export const GET_CUSTOMER_LIST = 'GET_CUSTOMER_LIST';
export const GET_CUSTOMER_TOTAL = 'GET_CUSTOMER_TOTAL';
export const GET_CUSTOMER_TAGS = 'GET_CUSTOMER_TAGS';
export const SET_CUSTOMER = 'SET_CUSTOMER';
export const GET_CUSTOMER_ORDER = 'GET_CUSTOMER_ORDER';
export const GET_CUSTOMER_PROFILE = 'GET_CUSTOMER_PROFILE';
export const GET_CUSTOMER_ADDRESS = 'GET_CUSTOMER_ADDRESS';
export const GET_CUSTOMER_REWARD_HISTORY = 'GET_CUSTOMER_REWARD_HISTORY';
export const GET_CUSTOMER_TRANSACTION_HISTORY = 'GET_CUSTOMER_TRANSACTION_HISTORY';
export const GET_WALLET = 'GET_WALLET';
export const GET_WALLET_TOTAL = 'GET_WALLET_TOTAL';
export const GET_REWARD = 'GET_REWARD';
export const GET_REWARD_TOTAL = 'GET_REWARD_TOTAL';
export const GET_CUSTOMER_ORDERS = 'GET_CUSTOMER_ORDERS';
export const GET_TOTAL_CUSTOMER_ORDERS = 'GET_TOTAL_CUSTOMER_ORDERS';

export function getCountries(callback) {
  return function(dispatch) {
    axios({
      method: 'get',
      url: `${config.MS_API}/admin/customer/countries`,
      headers: {
        user: cookie.load('user')
      }
    })
    .then(response => {
      dispatch( { type: GET_COUNTRIES, payload: response} );
      callback(null, response);
    })
    .catch(response => {
      console.log(response);
      callback(true, null);
    });
  }
}

export function getAllStates(){
  return function(dispatch) {
    axios({
      method: 'get',
      url: `${config.MS_API}/admin/customer/states`,
      headers: {
        user: cookie.load('user')
      }
    })
    .then(response => {
      dispatch( { type: GET_ALL_STATES, payload: response} );
    })
    .catch(response => {
    });
  }
}

export function getStates(country_id){
  return function(dispatch) {
    axios({
      method: 'get',
      url: `${config.MS_API}/countries/state/${country_id}`,
      headers: {
        user: cookie.load('user')
      }
    })
    .then(response => {
      dispatch( { type: GET_COUNTRY_STATE, payload: response} );
    })
    .catch(response => {
    });
  }
}

/* Customer Orders */
export function getCustomerOrderList(callback) {
  return function(dispatch, getState) {
    const state = getState();
    var filters_state = state.library.list_filters;
    var filter_data = {};
    if(filters_state != undefined && filters_state.customer_orders != undefined){
      var filter_data = filters_state.customer_orders;
    }

    axios({
      method: 'post',
      url: `${config.MS_API}/admin/customer/orders`,
      headers: {
        user: cookie.load('user')
      },
      data: {
        filter: filter_data,
      },
    })
    .then(response => {
      dispatch( { type: GET_CUSTOMER_ORDERS, payload: response } );
      callback(null, response);
    })
    .catch(response => {
      console.log(response);
      callback(true, null);
    });
  }
}

export function getTotalCustomerOrders() {
  return function(dispatch, getState) {
    const state = getState();
    var filters_state = state.library.list_filters;
    var filter_data = {};
    if(filters_state != undefined && filters_state.customer_orders != undefined){
      var filter_data = filters_state.customer_orders;
    }

    axios({
      method: 'post',
      url: `${config.MS_API}/admin/customer/orders/total`,
      headers: {
        user: cookie.load('user')
      },
      data: {
        filter: filter_data,
      },
    })
    .then(response => {
      dispatch( { type: GET_TOTAL_CUSTOMER_ORDERS, payload: response } );
    })
    .catch(response => {
      console.log(response);
    });
  }
}

/* Customer */

export function getReward(callback) {
  return function(dispatch, getState) {

    const state = getState();
    var filters_state = state.library.list_filters;
    var filter_data = {};
    if(filters_state != undefined && filters_state.customer_reward != undefined) {
      var filter_data = filters_state.customer_reward;
    }

    axios({
      method: 'post',
      url: `${config.MS_API}/admin/customer/reward`,
      headers: {
        user: cookie.load('user')
      },
      data: {
        filter: filter_data,
      },
    })
    .then(response => {
      dispatch( { type: GET_REWARD, payload: response } );

      callback(null, response);
    })
    .catch(response => {
      console.log(response);
      callback(true, null);
    });
  }
}

export function getTotalReward() {
  return function(dispatch, getState) {
    const state = getState();
    var filters_state = state.library.list_filters;
    var filter_data = {};
    if(filters_state != undefined && filters_state.customer_reward != undefined) {
      var filter_data = filters_state.customer_reward;
    }

    axios({
      method: 'post',
      url: `${config.MS_API}/admin/customer/reward/total`,
      headers: {
        user: cookie.load('user')
      },
      data: {
        filter: filter_data,
      },
    })
    .then(response => {
      dispatch( { type: GET_REWARD_TOTAL, payload: response } );
    })
    .catch(response => {
      console.log(response);
    });
  }
}

export function addReward(rewardData, callback) {
  return function(dispatch) {
    axios({
      method: 'post',
      url: `${config.MS_API}/admin/customer/reward/add`,
      headers: {
        user: cookie.load('user')
      },
      data: {
        rewardData: rewardData,
      },
    })
    .then(response => {
      createAlert({ message: 'Reward added customer account successfully!' });
      dispatch( getCustomerInfo(rewardData.customer_id) );
      dispatch( getCustomerReward(rewardData.customer_id) );
      callback(null, response);
    })
    .catch(response => {
      //console.log(response);
      dispatch(validation('Bad Reward added'));
      callback(true, null);
    });
  }
}

export function getWallet(callback) {
  return function(dispatch, getState) {

    const state = getState();
    var filters_state = state.library.list_filters;
    var filter_data = {};
    if(filters_state != undefined && filters_state.customer_wallet != undefined) {
      var filter_data = filters_state.customer_wallet;
    }

    axios({
      method: 'post',
      url: `${config.MS_API}/admin/customer/wallet`,
      headers: {
        user: cookie.load('user')
      },
      data: {
        filter: filter_data,
      },
    })
    .then(response => {
      dispatch( { type: GET_WALLET, payload: response } );

      callback(null, response);
    })
    .catch(response => {
      console.log(response);
      callback(true, null);
    });
  }
}

export function getWalletTotal() {
  return function(dispatch, getState) {
    const state = getState();
    var filters_state = state.library.list_filters;
    var filter_data = {};
    if(filters_state != undefined && filters_state.customer_wallet != undefined) {
      var filter_data = filters_state.customer_wallet;
    }

    axios({
      method: 'post',
      url: `${config.MS_API}/admin/customer/wallet/total`,
      headers: {
        user: cookie.load('user')
      },
      data: {
        filter: filter_data,
      },
    })
    .then(response => {
      dispatch( { type: GET_WALLET_TOTAL, payload: response } );
    })
    .catch(response => {
      console.log(response);
    });
  }
}

export function addWallet(walletData, callback) {
  return function(dispatch) {
    axios({
      method: 'post',
      url: `${config.MS_API}/admin/customer/wallet/add`,
      headers: {
        user: cookie.load('user')
      },
      data: {
        walletData: walletData,
      },
    })
    .then(response => {
      createAlert({message: 'Amount added in customer wallet successfully!'});
      dispatch(getCustomerInfo(walletData.customer_id) );
      dispatch(getCustomerTransactions(walletData.customer_id));
      callback(null, response);
    })
    .catch(response => {
      dispatch(validation('Bad Wallet added'));
      callback(true, null);
    });
  }
}

export function addAddress(data, callback) {
  return function(dispatch) {
    dispatch(validationNull());
    axios({
      method: 'post',
      url: `${config.MS_API}/admin/customer/address/add`,
      headers: {
        user: cookie.load('user')
      },
      data: {
        address_data: data,
      },
    })
    .then(response => {
      if(!response.data.error && response.data) {
        createAlert({ message: 'Customer New Address added successfully!'});
        dispatch(getCustomerInfo(data.customer_id));
        dispatch(getAddresses(data.customer_id, callback));
        callback(null,response);
      } else {
        dispatch(validation(response.data.error));
        callback(true, null);
      }
    })
    .catch(response => {
      //console.log(response);
      dispatch(validation('Bad address added'));
      callback(true, null);
    });
  }
}

export function updateAddress(data, callback){
  return function(dispatch) {
    dispatch(validationNull());
    axios({
      method: 'put',
      url: `${config.MS_API}/admin/customer/address/update`,
      headers: {
        user: cookie.load('user')
      },
      data: {
        address_data: data,
      },
    })
    .then(response => {
      if(!response.data.error && response.data){
        createAlert({message: 'Customer address update successfully!'});
        dispatch(getCustomerInfo(data.customer_id));
        dispatch(getAddresses(data.customer_id, callback));
        callback(null,response);
      }else{
        dispatch(validation(response.data.error));
        callback(true,null);
      }
    })
    .catch(response => {
      //console.log(response);
      dispatch(validation('Bad Customer Address Update'));
      callback(true,null);
    });
  }
}

export function getCustomerTransactions(customer_id) {
  return function(dispatch) {
    axios({
      method: 'get',
      url: `${config.MS_API}/admin/customer/transaction/history/${customer_id}`,
      headers: {
        user: cookie.load('user')
      }
    })
    .then(response => {
      dispatch( { type: GET_CUSTOMER_TRANSACTION_HISTORY, payload: response } );
    })
    .catch(response => {
      //console.log(response);
    });
  }
}

export function getCustomerReward(customer_id) {
  return function(dispatch) {
    axios({
      method: 'get',
      url: `${config.MS_API}/admin/customer/reward/history/${customer_id}`,
      headers: {
        user: cookie.load('user')
      }
    })
    .then(response => {
      dispatch( { type: GET_CUSTOMER_REWARD_HISTORY, payload: response } );
    })
    .catch(response => {
      //console.log(response);
    });
  }
}

export function deleteAddress(address_id, customer_id, callback) {
  return function(dispatch) {
    axios({
      method: 'delete',
      url: `${config.MS_API}/admin/customer/address/delete/${address_id}`,
      headers: {
        user: cookie.load('user')
      }
    })
    .then(response => {
      if(!response.data.error && response.data) {
        createAlert({ message: 'Customer Address Delete successfully!' });
        dispatch(getCustomerInfo(customer_id));
        dispatch(getAddresses(customer_id, callback));
        callback(null, response);
      } else {
        dispatch(validation(response.data.error));
        callback(true, null);
      }
    })
    .catch(response => {
      dispatch(validation('Bad Customer Address Delete'));
      callback(true, null);
    });
  }
}

export function getAddresses(customer_id, callback){
  return function(dispatch) {
    axios({
      method: 'get',
      url: `${config.MS_API}/admin/customer/addresses/${customer_id}`,
      headers: {
        user: cookie.load('user')
      }
    })
    .then(response => {
      dispatch( { type: GET_CUSTOMER_ADDRESS, payload: response} );

      callback(null, response);
    })
    .catch(response => {
      //console.log(response);
    });
  }
}

export function getCustomerInfo(customer_id) {
  return function(dispatch) {
    axios({
      method: 'get',
      url: `${config.MS_API}/admin/customer/info/${customer_id}`,
      headers: {
        user: cookie.load('user')
      }
    })
    .then(response => {
      dispatch( { type: GET_CUSTOMER_PROFILE, payload: response} );
    })
    .catch(response => {
      console.log(response);
    });
  }
}

export function getCustomerOrders(customer_id, callback) {
  return function(dispatch) {
    axios({
      method: 'get',
      url: `${config.MS_API}/admin/customer/order/${customer_id}`,
      headers: {
        user: cookie.load('user')
      }
    })
    .then(response => {
      dispatch( { type: GET_CUSTOMER_ORDER, payload: response} );
      callback(null, response);
    })
    .catch(response => {
      console.log(response);
      callback(true, null);
    });
  }
}

export function getTotalCustomers() {
  return function(dispatch, getState) {
    const state = getState();
    var filters_state = state.library.list_filters;
    var filter_data = {};
    if(filters_state != undefined && filters_state.customers != undefined) {
      var filter_data = filters_state.customers;
    }

    axios({
      method: 'post',
      url: `${config.MS_API}/admin/customer/total`,
      headers: {
        user: cookie.load('user')
      },
      data: {
        filter: filter_data,
      },
    })
    .then(response => {
      dispatch( { type: GET_CUSTOMER_TOTAL, payload: response } );
    })
    .catch(response => {
      //console.log(response);
    });
  }
}

export function getCustomerList(callback) {
  return function(dispatch, getState) {
    const state = getState();
    var filters_state = state.library.list_filters;
    var filter_data = {};
    if(filters_state != undefined && filters_state.customers != undefined){
      var filter_data = filters_state.customers;
    }
    axios({
      method: 'post',
      url: `${config.MS_API}/admin/customer/customer`,
      headers: {
        user: cookie.load('user')
      },
      data: {
        filter: filter_data,
      },
    })
    .then(response => {
      dispatch( { type: GET_CUSTOMER_LIST, payload: response } );
      callback(null, response);
    })
    .catch(response => {
      console.log(response);
    });
  }
}

export function addCustomer(formData, callback) {
  return function(dispatch) {
    axios({
      method: 'post',
      url: `${config.MS_API}/admin/customer/add`,
      headers: {
        user: cookie.load('user')
      },
      data: {
        formData: formData,
      },
    })
    .then(response => {
      if(!response.data.error && response.data) {
        createAlert({message:'Customer Added Successfully!'});
        dispatch(getTotalCustomers());
        dispatch(getCustomerList(callback));
        callback(null, response);
      } else {
        dispatch(validation(response.data.error));
        callback(true, null);
      }
    })
    .catch(response => {
      console.log(response);
      dispatch(validation('Bad Customer Add'));
    });
  }
}

export function updateCustomer(data, callback){
  var customer_id  = data.customer_id;
  return function(dispatch) {
    dispatch(validationNull());
    axios({
      method: 'put',
      url: `${config.MS_API}/admin/customer/update`,
      headers: {
        user: cookie.load('user')
      },
      data: {
        customer_data: data,
      },
    })
    .then(response => {
      if(!response.data.error && response.data){
        createAlert({message:'Customer information update successfully!'});
        dispatch(getCustomerInfo(customer_id));
        dispatch(getTotalCustomers());
        dispatch(getCustomerList(callback));
        callback(null, response);
      } else {
        dispatch(validation(response.data.error));
        callback(true, null);
      }
    })
    .catch(response => {
      console.log(response);
      dispatch(validation('Bad Customer Update'));
    });
  }
}

export function getCustomerTags(callback) {
  return function(dispatch) {
    axios({
      method: 'post',
      url: `${config.MS_API}/admin/customer/tags`,
      headers: {
        user: cookie.load('user')
      }
    })
    .then(response => {
      dispatch( { type: GET_CUSTOMER_TAGS, payload: response } );

      callback(null, response);
    })
    .catch(response => {
      console.log(response);
      dispatch(validation('Bad Customer Tag Selection'));
    });
  }
}

export function setCustomer(customer_id) {
    return function(dispatch) {
    dispatch( { type: SET_CUSTOMER, payload: customer_id} );
  }
}

/* Subscriber */

export function getTotalSubscriber() {
  return function(dispatch, getState) {
    const state = getState();
    var filters_state = state.library.list_filters;
    var filter_data = {};
    if(filters_state != undefined && filters_state.subscriber != undefined){
      var filter_data = filters_state.subscriber;
    }

    axios({
      method: 'post',
      url: `${config.MS_API}/admin/catalog/subscriber/total`,
      headers: {
        user: cookie.load('user')
      },
      data: {
        filter: filter_data,
      },
    })
    .then(response => {
      dispatch( { type: GET_SUBSCRIBER_TOTAL, payload: response } );
    })
    .catch(response => {
      //console.log(response);
    });
  }
}


export function getSubscriberList(callback) {
  return function(dispatch, getState) {
    const state = getState();
    var filters_state = state.library.list_filters;
    var filter_data = {};
    if(filters_state != undefined && filters_state.subscriber != undefined){
      var filter_data = filters_state.subscriber;
    }

    axios({
      method: 'post',
      url: `${config.MS_API}/admin/catalog/subscriber`,
      headers: {
        user: cookie.load('user')
      },
      data: {
        filter: filter_data,
      },
    })
    .then(response => {
      dispatch( { type: GET_SUBSCRIBER_LIST, payload: response } );
      callback(null, response);
    })
    .catch(response => {
      //console.log(response);
    });
  }
}

export function addSubscriber(formData, callback) {
  return function(dispatch) {
    axios({
      method: 'post',
      url: `${config.MS_API}/admin/catalog/subscriber/add`,
      headers: {
        user: cookie.load('user')
      },
      data: {
        formData: formData,
      },
    })
    .then(response => {
      if(!response.data.error && response.data){
        createAlert({ message: 'Success: Subscriber added successfully!' });
        dispatch(getTotalSubscriber());
        dispatch(getSubscriberList(callback));
        callback(null, response);
      } else {
        dispatch(validation(response.data.error));
        callback(true, null);
      }
    })
    .catch(response => {
      dispatch(validation('Bad Subscriber Add'));
      callback(true, null);
    });
  }
}

export function updateSubscriber(data, callback){
  return function(dispatch) {
    dispatch(validationNull());
    axios({
      method: 'put',
      url: `${config.MS_API}/admin/catalog/subscriber/update`,
      headers: {
        user: cookie.load('user')
      },
      data: {
        formData: data,
      },
    })
    .then(response => {
      if(!response.data.error && response.data){
        createAlert({ message: 'Success: Subscriber update successfully!' });
        dispatch(getTotalSubscriber());
        dispatch(getSubscriberList(callback));
        callback(null,response);
      } else {
        dispatch(validation(response.data.error));
        callback(true, null);
      }
    })
    .catch(response => {
      dispatch(validation('Bad Subscriber Update'));
      callback(true, null);
    });
  }
}

export function changeInputValue(form, field, value) {
  return function(dispatch) {
    //console.log("field>>>>>>>", field);
    dispatch(change(form, field, value))
  }
}

// 14/07/2020 start
export function getSuggestionCustomers(keyword, callback){
  // console.log("keyword>>>>>", keyword);
  return function(dispatch) {
    axios({
      method: 'post',
      url: `${config.MS_API}/admin/customer/suggestion_customer`,
      headers: {
        user: cookie.load('user'),
      },
      data: {
        keyword: keyword,
      },
    })
    .then(response => {
      callback(null, response);
    })
    .catch(response => {
      console.log(response);
      callback(true, null);
    });
  }
}

export function updateCustomerSmartly(formData, callback) {
  return function (dispatch) {
    axios({
      method: 'post',
      url: `${config.MS_API}/admin/customer/update_smartly`,
      headers: {
        user: cookie.load('user')
      },
      data: {
        formData: formData
      }
    })
    .then(response => {
      // console.log("response>>>>>>>>>>>>", response);
      if(!response.data.error) {
        if(formData.operation_wise === 'all_customers') {
          if(response.data.operation_found === true) {
            if(formData.operation === 'credits') {
              createAlert({ message: 'All Customers credit added successfully!'});
            } else if(formData.operation === 'rewards') {
              createAlert({ message: 'All Customers reward added successfully!'});
            } else if(formData.operation === 'customer_tags') {
              createAlert({ message: 'All Customers tags added successfully!'});
            } else {
              createAlert({ message: 'All Customers status updated successfully!'});
            }
          } else {
            createAlert({ type:"warning", title:"Oops!", message: 'No Records Found!' });
          }
        } else if(formData.operation_wise === 'date_range') {
          if(response.data.operation_found === true) {
            if(formData.operation === 'credits') {
              createAlert({ message: 'Date Range wise credit added successfully!'});
            } else if(formData.operation === 'rewards') {
              createAlert({ message: 'Date Range wise reward added successfully!'});
            } else if(formData.operation === 'customer_tags') {
              createAlert({ message: 'Date Range tags added successfully!'});
            } else {
              createAlert({ message: 'Date Range wise status updated successfully!'});
            }
          } else {
            createAlert({ type:"warning", title:"Oops!", message: 'No Records Found for selected date range!' });
          }
        } else if(formData.operation_wise === 'custom') {
          if(formData.operation === 'credits') {
            createAlert({ message: 'Indivisual customer(s) credit added successfully!'});
          } else if(formData.operation === 'rewards') {
            createAlert({ message: 'Indivisual customer(s) reward added successfully!'});
          } else if(formData.operation === 'customer_tags') {
            createAlert({ message: 'Indivisual customer(s) tags added successfully!'});
          } else {
            createAlert({ message: 'Indivisual customer(s) status updated successfully!'});
          }
        }

        dispatch(getCustomerList(callback));
        dispatch(getTotalCustomers());
        callback(null, response);
      } else {
        createAlert({ type:"warning", title:"Oops!", message: response.data.error });
        callback(true, null);
      }
    })
    .catch(response => {
      console.log("updateCustomerSmartly error>>>>>>", response);
      createAlert({ type:"warning", title:"Oops!", message: 'Bad customer smart update operation' });
      callback(true, null);
    });
  }
}
// 14/07/2020 start
