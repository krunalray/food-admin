import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { dateFormat, getFullYear } from '../../../common/function';
import * as config from '../../../../system/config';

class CommonFooter extends Component {
  render() {

    const { app_info } = this.props;
    return (
      <div className="footer dark">
        <div className="container">
         
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    app_info: state.app.app_info
  };
}

export default connect(mapStateToProps)(CommonFooter);
