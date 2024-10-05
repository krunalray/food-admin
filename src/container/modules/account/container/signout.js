import React,  { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../system/action';

class AccountSignout extends Component {

  componentWillMount() {
    this.props.signoutUser(this.props);
  }

  render() {
    return (
      <div>Successfully Signout!! Sorry to see you go...</div>
  );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.account.error}
}

export default connect(null, actions)(AccountSignout)
