import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { Field, reduxForm } from 'redux-form';

import * as actions from '../system/action';

import { Input } from '../../../common/component';
import { normalizeField } from '../../../common/function';


class Signin extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isDirectLoginLoading: false,
    };
  }

  componentWillMount() {
    this.props.validationNull();
    let _this = this;
    if (this.props.location.search != undefined) {
      var response = this.props.location.search;
      if (response.indexOf("?key=") >= 0 && response.indexOf("&token=") >= 0) {
        var split_response = response.split("&token=");
        var token = split_response[1];
        var key = split_response[0].substr(5);
        if (key != undefined && key && token != undefined && token) {
          this.setState({ isDirectLoagin: true });
          this.setState({ isDirectLoginLoading: true });
          this.props.signinDirectUser({ key: key, token: token }, this.props, function (err, result) {
            _this.setState({ isDirectLoginLoading: false });
          });
        }
      }
    }
  }

  handleFormSubmit(formProps) {
    this.setState({ isLoading: true });
    var _this = this;
    this.props.signinUser(formProps, function (err, result) {
      if (result) {
        _this.setState({ isLoading: false });
        _this.props.history.push('/admin');
      }
    });
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger shadow-none">
          <strong>Oops! </strong> {this.props.errorMessage}
        </div>
      )
    }
  }

  render() {
    const { handleSubmit, errorMessage } = this.props;
    var { isLoading, isDirectLoginLoading } = this.state;

    if (errorMessage) {
      isLoading = false;
    }
    return (
      <div className="page page-login">
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-sm-4 p-0">
              <div className="card aside-form-card overflow-hidden">
                <div className="card-body">
                  <div className="text-center aside-form-top-logo">
                  <h1 className='text-warning'>Your Logo</h1>
                  </div>
                  {this.renderAlert()}
                  {
                    isDirectLoginLoading
                      ?
                      <div className="store-loading-div">
                        {
                          (errorMessage != undefined && errorMessage)
                            ?
                            <div className="text">
                              <div className="mt-2">
                                <div className="mt-2 alert alert-warning">
                                  {errorMessage}
                                </div>
                              </div>
                            </div>
                            :
                            <div className="text">
                              <i className="fa fa-cog fa-spin fa-3x fa-fw"></i>
                              <div className="mt-2">
                                <h5 className="mt-2">Please wait...</h5>
                              </div>
                            </div>
                        }
                      </div>
                      :
                      null
                  }
                  <div className="alca-inner-form">
                    <div className="mb-4 text-center">
                      <h4>Sign In To Admin</h4>
                      <div className="text-muted font-weight-bold">Enter your details to login to your account:</div>
                    </div>
                    <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} className="alca-form">
                      <fieldset className="form-group mb-3">
                        <Field name="username" type="text" placeholder="Email / Username" normalize={normalizeField(['trim'])} component={Input} label="Email / Username" />
                      </fieldset>
                      <fieldset className="form-group mb-3">
                        <Field name="password" type="password" placeholder="Password" normalize={normalizeField(['trim'])} component={Input} label="Password" />
                      </fieldset>

                     
                      <div className="row">
                        <div className="col-sm-12">
                          <button action="signin" className="btn btn-primary btn-block" disabled={isLoading}><i className="fa fa-unlock-alt"></i> {isLoading ? 'Loading...' : 'Login'}</button>
                        </div>
                      </div>

                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-8 p-0">
              <div className="side-backgroud d-flex ">
                <div className="d-flex  flex-lg-center">
                  <div className="d-flex text-center">
                    <div className="d-flex flex-column justify-content-center"><h1 className="font-weight-bold text-white">Welcome to Admin!</h1><p className="font-weight-bold  text-white"></p></div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

function validate(formProps) {
  const errors = {}
  //console.log(formProps);
  if (!formProps.username) {
    errors.username = 'Required Email / Mobile';
  }
  if (!formProps.password) {
    errors.password = 'Required Password'
  }
  return errors
}

Signin = reduxForm({
  form: 'signin',
  validate: validate
})(Signin);

function mapStateToProps(state) {
  //console.log(state);
  return {
    errorMessage: state.account.error,
  }
}

export default withRouter(connect(mapStateToProps, actions)(Signin));
