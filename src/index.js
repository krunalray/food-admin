import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import cookie from 'react-cookie';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AUTHENTICATE_USER } from '../src/container/modules/account/system/action';
import CommonApp from '../src/app';
import createStore from './system/store';


const { store, history } = createStore();


const user = cookie.load('user');

if(user) {
  store.dispatch( { type: AUTHENTICATE_USER });
}


ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
        <CommonApp />
    </ConnectedRouter>
  </Provider>
  , document.querySelector('#app'));
