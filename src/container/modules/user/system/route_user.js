import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import Header from '../../../layout/header';
import Footer from '../../../layout/footer';

const RouteUser = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      rest.authenticated ? (
        <div>
          <Header />
          <div id="content" className="container-fluid">
            <div id="account-home" className="inner-content">
              <Component {...props} />
            </div>
          </div>
          <Footer />
        </div>
      ) : (
        <Redirect to={`/admin/signin?redirect=${props.location.pathname}`} />
      )
    }
  />
);

function mapStateToProps(state) {
  console.log('----authenticated',state.account.authenticated)
  return { authenticated: state.account.authenticated };
}

export default connect(mapStateToProps)(RouteUser);
