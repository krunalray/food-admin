import React, { Component } from 'react';
import DatePicker from 'react-date-picker';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Field, formValueSelector, reduxForm } from 'redux-form';
import { Input, Loading, Textarea, Tooltip } from '../../../common/component';
import { dateFormat, normalizeField } from '../../../common/function';
import { validation, validationNull } from '../../../common/library/system/action';
import { addCustomer, getCountries, getStates, updateCustomer } from '../system/action';



class ModalCustomerForm extends Component {

  constructor(props) {
    super(props);

    this.handleUserUpdate = this.handleUserUpdate.bind(this);
    this.removeModal = this.handleUserUpdate.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.permissionDenined = this.permissionDenined.bind(this);

    this.state = {
      isLoading: false,
      isPasswordText: false,
      isPasswordConfirmText: false,
      multi: true,
      multiValue: [],
      mloptions: [],
      mlvalue: undefined,
      modify_permission: false
    };
  }

  componentWillMount() {
    var _this = this;
    _this.setState({ isLoading: true });
    this.props.validationNull();
    if (!this.props.customerData) {
      this.props.getCountries(function (err, result) { });
    }
    // check modify permission if found true, ie. user don't have permission to modify data, other wise user can modify data this.setState({ modify_permission: this.props.checkPermission('modify', window.location.href) });

    if (this.props.customerData) {
      var customer_id = this.props.customerData.customer_id;
    } else {
      var customer_id = 0;
    }


  }

  handleUserUpdate(formProps) {
    //console.log("formProps>>>>>>", formProps);
    const temp_tag = this.state.multiValue;
    var new_tag = '';
    if (temp_tag.length > 0) {
      for (var i in temp_tag) {
        if (new_tag == '') {
          new_tag += temp_tag[i].value;
        } else {
          new_tag += "," + temp_tag[i].value;
        }
      }
    } else {
      new_tag = "";
    }
    formProps.customer_tags = new_tag;
    //console.log("formProps found>>>>>>>>>>>>>>>>>", formProps); return false;

    if (formProps.birthday !== undefined && formProps.birthday !== null && formProps.birthday !== '0000-00-00') {
      formProps.birthday = dateFormat(formProps.birthday, false, 'YYYY-MM-DD');
    }

    if (formProps.anniversary !== undefined && formProps.anniversary !== null && formProps.anniversary !== '0000-00-00') {
      formProps.anniversary = dateFormat(formProps.anniversary, false, 'YYYY-MM-DD');
    }

    this.setState({ isLoading: true });
    var _this = this;
    if (this.props.customerData) {
      this.props.updateCustomer(formProps, function (err, result) {
        _this.setState({ isLoading: false });
        if (result) {
          _this.props.removeModal();
        }
      });
    } else {
      this.props.addCustomer(formProps, function (err, result) {
        _this.setState({ isLoading: false });
        if (result) {
          _this.props.removeModal();
        }
      });
    }
  }

  renderState(states, country_id) {
    if (country_id && country_id != undefined) {
      this.props.getStates(country_id);
      if (states) {
        return states.map((state) => {
          return (
            <option value={state.state_id} key={"state." + state.state_id}>{state.name}</option>
          );
        });
      } else {
        return (
          <option value="0">-- Select Country First --</option>
        )
      }
    } else {
      if (states) {
        return states.map((state) => {
          return (
            <option value={state.state_id} key={"state." + state.state_id}>{state.name}</option>
          );
        });
      } else {
        return (
          <option value="0">-- Select Country First --</option>
        )
      }
    }
  }

  renderCountry(countries) {
    if (countries) {
      return countries.map((country) => {
        return (
          <option value={country.country_id} key={"country." + country.country_id}>{country.name}</option>
        );
      });
    } else {
      return (
        <option value="0">Loading...</option>
      )
    }
  }

  renderCustomerGroup(customer_groups) {
    if (customer_groups) {
      return customer_groups.map((groups) => {
        return (
          <option value={groups.value} key={"customer-group." + groups.value}>{groups.label}</option>
        );
      });
    } else {
      return (
        <option value="0">Loading...</option>
      )
    }
  }

  renderPasswordMask(getState) {
    if (this.state[getState] == false) {
      this.setState({ [getState]: true });
    } else {
      this.setState({ [getState]: false });
    }
  }

  closeModal() {
    this.props.removeModal();
  }

  permissionDenined() {
    this.props.validation('You don\'t have permission to modify customer information!');
  }

  handleOnChange(value) {
    const { multi } = this.state;
    if (multi) {
      this.setState({ multiValue: value });
    } else {
      this.setState({ value });
    }
  }

  renderCustomerTags(tag_list) {

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

  render() {
    const { settings, handleSubmit, errorMessage, country, countryState, hasCountryId, hasStateId, hasAddressType } = this.props;
    const { isLoading, isAddress, isPasswordText, isPasswordConfirmText, mloptions, multi, multiValue, mlvalue, modify_permission } = this.state;
 



    var past18Year = new Date().getFullYear() - 18;
    var past18YearDate = new Date();
    past18YearDate.setFullYear(past18Year);

    return (
      <div>
        <div className="user-info">
          <form onSubmit={handleSubmit(this.handleUserUpdate.bind(this))}>
            {this.renderAlert()}

            <div className="row">
              <div className="form-group col-sm-6">
                <Field name="firstname" type="text" normalize={normalizeField(['trimStart'])} component={Input} label="First Name" is_label={true} isRequired={true} className="form-control" />
              </div>
              <div className="form-group col-sm-6">
                <Field name="lastname" type="text" normalize={normalizeField(['trimStart'])} component={Input} label="Last Name" is_label={true} isRequired={true} className="form-control" />
              </div>
            </div>

            <div className="row">
              <div className="form-group col-sm-6">
                <Field name="email" type="text" normalize={normalizeField(['trim'])} component={Input} label="Email" is_label={true} isRequired={true} className="form-control" />
              </div>

              <div className="form-group col-sm-6">
                <Field name="telephone" type="text" normalize={normalizeField(['trim'])} component={Input} label="Mobile or Phone" is_label={true} isRequired={true} className="form-control" />
              </div>
            </div>

            <div className="row">

              <div className="col-sm-6">
                <div className="row">
                  <div className="col-sm-12">
                    <label className={"control-label " + (!this.props.customerData ? 'required' : '')}>Password</label>
                  </div>
                  <div className="col-sm-12">
                    <div className="input-group">
                      {
                        isPasswordText
                          ?
                          <Field name="password" type="text" normalize={normalizeField(['trim'])} component={Input} label="* Password" className="form-control" />
                          :
                          <Field name="password" type="password" normalize={normalizeField(['trim'])} component={Input} label="* Password" className="form-control" />
                      }
                      <button
                        type="button"
                        className="btn btn-sm btn-secondary password-mask"
                        onClick={() => this.renderPasswordMask('isPasswordText')}
                      >
                        {isPasswordText ? 'Hide' : 'Show'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group col-sm-6">
                <label className="form-lable required">Status</label>
                <Field

                  name="status"
                  component={status =>
                    <div>
                      <select
                        name="status"
                        className="form-select"
                        value={status.input.value}
                        onChange={(event) => {
                          status.input.onChange(event.target.value);
                        }}
                      >
                        <option value="">--Select--</option>
                        <option value="1">Enable</option>
                        <option value="0">Disable</option>
                      </select>
                      {status.meta.touched && ((status.meta.error && <div className="error">{status.meta.error}</div>) || (status.meta.warning && <div className="error">{status.meta.warning}</div>))}
                    </div>
                  } />
              </div>
            </div>

  

            {
              !modify_permission
                ?
                <div className="modal-footer px-0">

                  {
                    this.props.customerData
                      ?
                      <button action="addCustomer" className="btn btn-primary font-weight-bold">
                        <i className="fa fa-edit"></i> {'Update Customer'}
                      </button>
                      :
                      <button action="addCustomer" className="btn btn-primary font-weight-bold">
                        <i className="fa fa-plus-circle"></i> {'Add Customer'}
                      </button>
                  }


                  <button onClick={() => this.closeModal()} type="button" className="btn btn-light-primary btn-secondary font-weight-bold">Cancel</button>

                </div>
                :
                <div className="modal-footer px-0">



                  <button onClick={() => this.closeModal()} type="button" className="btn btn-light-primary btn-secondary font-weight-bold">Cancel</button>

                </div>
            }
          </form>
        </div>
      </div>
    );
  }
}

function validate(formProps) {
  const errors = {}

  if (!formProps.firstname) {
    errors.firstname = 'Required First Name';
  }
  if (!formProps.lastname) {
    errors.lastname = 'Required Last Name';
  }

  if (!formProps.email) {
    errors.email = 'Required Email';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formProps.email)) {
    errors.email = 'Invalid Email Address';
  }

  if (!formProps.telephone) {
    errors.telephone = 'Required Mobile';
  } else {
    if (isNaN(formProps.telephone)) {
      errors.telephone = 'Mobile number must be numeric only!';
    } else if (formProps.telephone.length > 10) {
      errors.telephone = 'Mobile number must be up to 10 digit!';
    }
  }

  if (formProps.customer_id == undefined) {
    if (!formProps.password) {
      errors.password = 'Password must more than 6 characters';
    } else {
      if (formProps.password.length < 6) {
        errors.password = 'Password must more than 6 characters';
      }
    }
  } else {
    if (formProps.password) {
      if (formProps.password.length < 6) {
        errors.password = 'Password must more than 6 characters'
      }
    }
  }

  if (!formProps.address) {
    errors.address = 'Address must be between 3 and 150 characters!';
  } else if (formProps.address.trim().length < 3 || formProps.address.trim().length > 150) {
    errors.address = 'Address must be between 3 and 150 characters!';
  }

  if (!formProps.city) {
    errors.city = 'City must be between 2 and 128 characters!';
  } else if (formProps.city.trim().length < 2 || formProps.city.trim().length > 128) {
    errors.city = 'City must be between 2 and 128 characters!';
  }

  if (!formProps.pincode) {
    errors.pincode = 'Postcode must be between 2 and 10 characters!';
  } else if (formProps.pincode.trim().length < 2 || formProps.pincode.trim().length > 10) {
    errors.pincode = 'Postcode must be between 2 and 10 characters!';
  } else if (isNaN(formProps.pincode.trim())) {
    errors.pincode = 'Postcode must be numeric!';
  }

  if (!formProps.country_id) {
    errors.country_id = 'Please select a country!';
  } else if (formProps.country_id == '' || isNaN(formProps.country_id)) {
    errors.country_id = 'Please select a country!';
  }

  if (!formProps.state_id) {
    errors.state_id = 'Please select a region / state!';
  } else if (formProps.state_id == '' || isNaN(formProps.state_id)) {
    errors.state_id = 'Please select a region / state!';
  }

  if (formProps.status === undefined) {
    errors.status = 'Required';
  } else if (formProps.status === '') {
    errors.status = 'Required';
  }

  if (formProps.is_verify_phone === undefined) {
    errors.is_verify_phone = 'Required Verify Phone';
  }

  return errors;
}

ModalCustomerForm = reduxForm({
  form: 'addCustomerForm',
  enableReinitialize: true,
  validate
})(ModalCustomerForm);

const selector = formValueSelector('addCustomer')
ModalCustomerForm = connect(
  state => {
    const hasCountryId = selector(state, 'country_id')
    const hasStateId = selector(state, 'state_id')
    const hasAddressType = selector(state, 'address_type')
    return {
      hasCountryId,
      hasStateId,
      hasAddressType,
    }
  }
)(ModalCustomerForm);

function mapStateToProps(state, ownProps) {

  var iniValues = { address_type: 0, gender: 1, customer_group_id: state.app.settings.customer_group_id, status: 1 };
  if (ownProps.customerData) {
    var iniValues = ownProps.customerData;
    iniValues.password = '';
  }

  return {
    settings: state.app.settings,
    errorMessage: state.library.error,
    initialValues: iniValues,
    country: state.customer.countries,
    countryState: state.customer.state,
  }
}
export default connect(mapStateToProps, { updateCustomer, addCustomer, getStates, getCountries, validationNull, validation })(ModalCustomerForm);
