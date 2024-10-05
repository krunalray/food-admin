import {
  AUTHENTICATE_USER,
  UNAUTHENTICATE_USER,
  VALIDATION_ERROR,
  SUCCESS_VALIDATION
} from './action';
import cookie from 'react-cookie';
const INITIAL_STATE =  {
};

const accountReducer = function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTHENTICATE_USER:
        return { ...state, error: '', authenticated: true, token: action.payload }
    case UNAUTHENTICATE_USER:
        cookie.remove('user', { path: '/' });
        return { ...state, error: '', authenticated: false, token: false }
    case SUCCESS_VALIDATION:
        return { ...state, success: action.payload }
    case VALIDATION_ERROR:
        return { ...state, error: action.payload }
    default:
      return state;
  }
}

export default accountReducer;
