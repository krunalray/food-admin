import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import * as config from '../../../../system/config';

import { Loading, Input } from '../../../common/component';
import { normalizeField } from '../../../common/function';
import { forgotPassword, validationNull, successValidationNull } from '../system/action';

class AccountFrogotPassword extends Component {

  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.state = { isLoading: false };
  }

  componentWillMount() {
    this.props.validationNull();
    this.props.successValidationNull();
  }

  handleFormSubmit(formProps) {
    this.setState({ isLoading: true });
    var _this = this;
    this.props.forgotPassword(formProps, function (err, result) {
      _this.setState({ isLoading: false });
      if (result) {
        //browserHistory.push('/admin/signin');
      }
    });
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops! </strong> {this.props.errorMessage}
        </div>
      )
    }
  }

  renderSuccessAlert() {
    if (this.props.successMessage) {
      return (
        <div className="alert alert-success">
          <strong>Success! </strong> {this.props.successMessage}
        </div>
      )
    }
  }

  render() {
    const { handleSubmit, errorMessage, successMessage } = this.props;

    const { isLoading } = this.state;

    return (
      <div className="page page-forgot">
          <div className="container-fluid p-0">
            <div className="row">
              <div className="col-sm-4 p-0">
                <div className="card aside-form-card overflow-hidden">
                  <div className="card-body">
                    <div className="text-center aside-form-top-logo">
                     
                    </div>
                    {this.renderAlert()}
                    {this.renderSuccessAlert()}

                    <div className="alca-inner-form">
                      <div className="mb-5 text-center">
                        <h4>Forgotten Password ?</h4>
                        <div className="text-muted font-weight-bold">Enter your email to reset your password</div>
                      </div>
                      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} className="alca-form">
                        <fieldset className="form-group mb-3">
                          <Field name="email" type="text"  component={Input} label="Email" />
                        </fieldset>

                        
                        <div className="row">
                          <div className="col-sm-12 text-center btn-action">
                            <button action="forgotpassword" disabled={isLoading} className="btn btn-primary mr-3"> {isLoading ? 'Loading..' : 'Request'}</button>
                            <Link to="/admin/signin" className="btn btn-danger">Login</Link>
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
                      <div className="d-flex flex-column justify-content-center"><h1 className="font-weight-bold text-white">Welcome !</h1><p className="font-weight-bold  text-white">World Largest Ecommerce Platform in India</p></div></div>
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

  if (!formProps.email) {
    errors.email = 'Required Email'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2, 4}$/i.test(formProps.email)) {
    errors.email = 'Invalid Email Address'
  }

  return errors
}

AccountFrogotPassword = reduxForm({
  form: 'forgotpassword',
  validate: validate
})(AccountFrogotPassword);

function mapStateToProps(state) {
  return {
    errorMessage: state.account.error,
    successMessage: state.account.success
  }
}

export default connect(mapStateToProps, { forgotPassword, validationNull, successValidationNull })(AccountFrogotPassword);
