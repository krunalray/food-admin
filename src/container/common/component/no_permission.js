import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class NoPermission extends Component {

  render() {
    return (
      <div id="no_permission">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                Permission Denied!
                <Link to="/admin" className="btn btn-outline-primary btn-sm pull-right">
                  <i className="fa fa-home"></i> Back To Home
                </Link>
              </div>
              <div className="card-body text-center">
                <p className="card-text">
                  <i className="fa fa-exclamation-triangle mr-2"></i>
                  You do not have permission to access this page, please refer to your system administrator.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default NoPermission;
