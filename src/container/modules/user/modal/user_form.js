import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { InputImage } from '../../../common/image_manager';

import { validation, validationNull } from '../../../common/library/system/action';
import { checkPermission } from '../../../modules/user/system/action';

import { Input, Loading, Tooltip } from '../../../common/component';
import { normalizeField } from '../../../common/function';
import { addUser, getUserGroups, updateUser } from '../system/action';
const required = value => value ? undefined : 'Required';

class UserForm extends Component {

  constructor(props) {
    super(props);

    this.handleUserUpdate = this.handleUserUpdate.bind(this);
    this.removeModal = this.handleUserUpdate.bind(this);

    this.state = { isLoading: false, isPasswordText: false, modify_permission: false }; // initialization of loading state
  }

  componentWillMount() {
    this.props.getUserGroups(function (err, result) { });
    this.props.validationNull();

    // check modify permission if found true, ie. user don't have permission to modify data, other wise user can modify data
    this.setState({ modify_permission: this.props.checkPermission('modify', 'user') });
  }

  handleUserUpdate(formProps) {
    var _this = this;
    this.setState({ isLoading: true });
    if (this.props.userData) {
      this.props.updateUser(formProps, function (err, result) {
        _this.setState({ isLoading: false });
        if (result) {
          _this.props.removeModal();
        }
      });
    } else {
      this.props.addUser(formProps, function (err, result) {
        _this.setState({ isLoading: false });
        if (result) {
          _this.props.removeModal();
        }
      });
    }
  }

  closeModal() {
    this.props.removeModal();
  }

  renderUserGroup(user_group_list) {
    if (user_group_list) {
      return user_group_list.map((user_group) => {
        return (
          <option value={user_group.user_group_id} key={"user_group." + user_group.user_group_id}>{user_group.name}</option>
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

  // display errors if server generate any error
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

    const { handleSubmit, user_group_list, errorMessage, userData, header_user_edit, profile } = this.props;

    const { isPasswordText, isLoading, modify_permission } = this.state;

    if (!profile) {
      return (
        <div><Loading /></div>
      );
    }

    return (
      <div>
        <div className="user-info user-form">
          {isLoading ? <Loading /> : null}

          <form onSubmit={handleSubmit(this.handleUserUpdate.bind(this))}>
            {this.renderAlert()}

            <div className="row">
              {/* <div className="form-group col-sm-3">
                <label>Upload Profile Image</label>
                <Field name="image" type="text" component={InputImage} label="Image" className="form-control" />
              </div> */}

              <div className="form-group col-sm-9">
                <div className="row">
                  <div className="form-group col-sm-12">
                    <Field name="firstname" type="text" normalize={normalizeField(['trimStart'])} component={Input} label="Name" isRequired={true} is_label={true} className="form-control" />
                  </div>

                  <div className="form-group col-sm-12">
                    <Field name="lastname" type="text" normalize={normalizeField(['trimStart'])} component={Input} label=" User Name" isRequired={true} is_label={true} className="form-control" />
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="form-group col-sm-12">
                <Field name="email" type="text" normalize={normalizeField(['trim'])} component={Input} label="Email" isRequired={true} is_label={true} className="form-control" />
              </div>
            </div>

            {
              header_user_edit == undefined
                ?
                <div className="row">
                  <div className="form-group col-sm-6">
                    <label className="form-lable required">User Group</label>
                    <Field name="user_group_id" component={user_group_id =>
                      <div>
                        <select
                          name="user_group_id"
                          className="form-control"
                          value={user_group_id.input.value}
                          onChange={(event) => {
                            user_group_id.input.onChange(event.target.value);
                          }}
                        >
                          <option value="">---Select User Group---</option>
                          {this.renderUserGroup(user_group_list)}
                        </select>
                        {user_group_id.meta.touched && ((user_group_id.meta.error && <div className="error">{user_group_id.meta.error}</div>) || (user_group_id.meta.warning && <div className="error">{user_group_id.meta.warning}</div>))}
                      </div>
                    } />
                  </div>

                  <div className="form-group col-sm-6">
                    <label className="form-lable required">Status</label>
                    <Field

                      name="status"
                      component={status =>
                        <div>
                          <select
                            name="status"
                            className="form-control"
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
                :
                <div>
                  <Field name="user_group_id" type="hidden" component={Input} className="form-control" />
                  <Field name="status" type="hidden" component={Input} className="form-control" />
                </div>
            }

            <div className="row form-group">
              <div className="col-sm-12">
                <label>Password</label>
              </div>
              <div className="col-sm-12">
                <div className="input-group">

                  {
                    isPasswordText
                      ?
                      <Field name="password" type="text" normalize={normalizeField(['trim'])} component={Input} label="Password" className="form-control" />
                      :
                      <Field name="password" type="password" normalize={normalizeField(['trim'])} component={Input} label="Password" className="form-control" />
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

            <div className="modal-footer px-0">
              {
                !modify_permission || (this.props.userData != undefined && this.props.userData.user_id > 0 && profile.user_id == this.props.userData.user_id)
                  ?


                  this.props.userData
                    ?
                    <button action="addUser" className="btn btn-primary font-weight-bold" disabled={isLoading}>
                      <i className="fa fa-edit"></i> {isLoading ? 'Loading...' : 'Update User '}
                    </button>
                    :
                    <button action="addUser" className="btn btn-primary font-weight-bold" disabled={isLoading}>
                      <i className="fa fa-plus-circle"></i> {isLoading ? 'Loading...' : 'Add User '}
                    </button>


                  :

                  <button type="button" className="btn btn-primary font-weight-bold" title="You don't have permission to add or modify User" disabled><Tooltip message={'You don\'t have permission to add or modify User'} position={'top'}>
                    {
                      this.props.userData
                        ?
                        <span>Update User</span>
                        :
                        <span>Add User</span>
                    }
                  </Tooltip></button>

              }

              <button onClick={() => this.closeModal()} type="button" className="btn btn-light-primary btn-secondary font-weight-bold">Cancel</button>

            </div>
          </form>
        </div>
      </div>
    );
  }
}

function validate(formProps) {
  const errors = {};

  if (!formProps.username) {
    errors.username = 'Required Name';
  }

  if (!formProps.firstname) {
    errors.firstname = 'Required User Name';
  }


  if (!formProps.email) {
    errors.email = 'Required Email';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formProps.email)) {
    errors.email = 'Invalid Email Address';
  }


  if (formProps.password) {
    if (formProps.password.length < 6) {
      errors.password = 'Password must more than 6 characters'
    }
  }

  if (formProps.status === undefined) {
    errors.status = 'Required Status';
  }

  if (!formProps.user_group_id) {
    errors.user_group_id = 'User Group Required';
  }

  return errors;
}

UserForm = reduxForm({
  form: 'addNewUser',
  enableReinitialize: true,
  validate
})(UserForm);

function mapStateToProps(state, ownProps) {
  // console.log(state);
  var iniUser = {};
  if (ownProps.userData) {
    var iniUser = ownProps.userData;
    iniUser.password = '';
  } else {
    iniUser.status = 1;
  }

  return {
    errorMessage: state.library.error,
    initialValues: iniUser,
    user_group_list: state.user.user_group_list,
    profile: state.user.profile
  };
}

export default connect(mapStateToProps, { getUserGroups, addUser, validationNull, updateUser, validation, checkPermission })(UserForm);
