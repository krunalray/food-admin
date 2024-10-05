import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as formReducer } from 'redux-form';
import { modalReducer } from '../container/common/modal';

import { imageManagerReducer } from '../container/common/image_manager';
import libraryReducer from '../container/common/library/system/reducer';

import appReducer from '../container/modules/app/system/reducer';
import accountReducer from '../container/modules/account/system/reducer';
import userReducer from '../container/modules/user/system/reducer';
import customerReducer from '../container/modules/customer/system/reducer';


const rootReducer  = (history) =>  combineReducers({
  router: connectRouter(history),
  form: formReducer,
  modals: modalReducer,
  app: appReducer,
  account: accountReducer,
  user: userReducer,
  library: libraryReducer,
  image_manager: imageManagerReducer,
  customer: customerReducer,
});

export default rootReducer;
