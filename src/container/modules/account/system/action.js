import axios from 'axios';
import cookie from 'react-cookie';
import * as config from '../../../../system/config';
export const AUTHENTICATE_USER = 'AUTHENTICATE_USER';
export const UNAUTHENTICATE_USER = 'UNAUTHENTICATE_USER';
export const VALIDATION_ERROR = 'VALIDATION_ERROR';
export const SUCCESS_VALIDATION = 'SUCCESS_VALIDATION';

export function signinUser(signinData, callback) {
  return function(dispatch) {
    dispatch(validationNull());

    axios({
      method: 'post',
      url: `${config.MS_API}/admin/user/login`,
      data : signinData
    })
    .then(response => {
      if(response.data && !response.data.error){

        cookie.remove('user', { path: '/' });
        cookie.save('user', response.data.token, { path: '/' });

        dispatch( { type: AUTHENTICATE_USER, payload: cookie.load('user')} );
        callback(null,response);
      } else {
        dispatch(validation(response.data.error));
        callback(null, false);
      }
    })
    .catch(response => {
      dispatch(validation('Bad User Login'));
      callback(null, false);
    });
  }
}
export function signoutUser(props) {
  return function(dispatch) {
    cookie.remove('user', { path: '/' });

    dispatch( { type: UNAUTHENTICATE_USER } );
    props.history.push('/admin');
  }
}

// ---------------------Forgot Password------------------//
export function forgotPassword(email, callback) {
  return function(dispatch) {
    axios({
      method: 'post',
      url: `${config.MS_API}/admin/user/forgot-password`,
      data: email,
    })
    .then(response => {
      //console.log("response found>>>>>>>>>>>", response);
      if(response.data && !response.data.error) {
        dispatch(successValidation('Your password is reset & send successfully to your register E-mail.'));
        callback(null, response);
      } else {
        dispatch(validation(response.data.error));
        callback(null, false);
      }
    })
    .catch(response => {
      dispatch(validation('Bad Forget Password reset process!'));
      callback(null, false);
    });
  }
}
// ---------------------end Forgot Password------------------//

export function successValidation(error) {
  return {
    type: SUCCESS_VALIDATION,
    payload: error
  }
}
export function successValidationNull() {
  return {
    type: SUCCESS_VALIDATION,
    payload: null
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


export function adminLogin(user_id, app_id, callback) {
  return function(dispatch) {
    axios({
      method: 'post',
      url: `${config.MS_API}/admin/store/user/login`,
      data: {
        user_id: user_id,
        app_id: app_id,
      },
    })
    .then(response => {

      if(response.data && !response.data.error){
        cookie.save('user', response.data.token, { path: '/' });
        dispatch( { type: AUTHENTICATE_USER, payload: cookie.load('user')} );
        callback(null,response);
      } else {
        callback(null, {error:true});
        dispatch(validation(response.data.error));
      }
    })
    .catch(response => {
      if(response != undefined && response.data != undefined && response.data.error != undefined){
        callback(null, {error:true});
        dispatch(validation(response.data.error));
      }
    });
  }
}


export function signoutUserOnly() {
  return function(dispatch) {
    cookie.remove('user', { path: '/' });
    
    dispatch( { type: UNAUTHENTICATE_USER } );
  }
}

