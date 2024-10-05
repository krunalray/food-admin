import React, { Component } from 'react';
import { connect } from 'react-redux';
import { frontloadConnect } from 'react-frontload';
import { Link } from 'react-router-dom';

class Page404 extends Component {

  render() {

    return (
      <div id="page-404">
        <div className="container text-center p-5">
          <div className="text">
            <i className="fa fa-exclamation-circle fa-5x mb-2"></i>
            <h1> Oops! Page not found</h1>
            <p> The page you are looking for does not exists. You may want to head back to the homepage.</p>
            <div className="mt-2">
              <Link to="/admin" className="btn btn-primary"> RETURN HOME </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Page404;
