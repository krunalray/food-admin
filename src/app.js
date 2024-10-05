import React, { Component } from 'react';

import { connect } from 'react-redux';
import rootRoute from './system/route';
import ReduxModal from './container/common/modal';
import { getUserProfile, getAdminRoute } from './container/modules/user/system/action'
import {  getSettings } from './container/modules/app/system/action';

class CommonApp extends Component {

  constructor(props) {
    super(props);
  }
  componentDidMount() {
    if(this.props.authenticated) {
      this.props.getUserProfile();
      this.props.getAdminRoute();
      this.props.getSettings();
  }
}

  render() {

    const { settings, authenticated } = this.props;

    if(authenticated && !settings) {
      return "loading...."
    }
      return (
        <div className="">
          {rootRoute}
           <ReduxModal />
        </div>
      );
    
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.account.authenticated,
    settings: state.app.settings,
    profile: state.user.profile
  };
}

export default connect(mapStateToProps, {getUserProfile, getAdminRoute, getSettings})(CommonApp);