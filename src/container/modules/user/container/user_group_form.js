import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

import { setFilters, validationNull, validation } from '../../../common/library/system/action';
import { checkPermission } from '../../../modules/user/system/action';
import { Loading, Input, PermissionCheckbox, Breadcrumbs, Tooltip } from '../../../common/component';
import { normalizeField } from '../../../common/function';
import { getUserGroup, updateUserGroup, addUserGroup, nullUserGroupState } from '../system/action';

class UserGroupForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      isLoading: false,
      modify_permission: false
    };
  }

  componentWillMount() {
    var _this = this;

    // check modify permission if found true, ie. user don't have permission to modify data, other wise user can modify data
    this.setState({ modify_permission: this.props.checkPermission('modify', 'user_group') });

    if (this.props.match.params.user_group_id != undefined) {
      _this.setState({ isLoading: true });
      this.props.getUserGroup(this.props.match.params.user_group_id, function (err, result) {
        if (result) {
          _this.setState({ isLoading: false });
        }
      });
    } else {
      this.props.nullUserGroupState();
    }
  }

  handleFormSubmit(formProps) {
    //this.setState({ isLoading: true });
    var modify_permission_status = false;
    if (formProps.modify_permission != undefined && formProps.modify_permission.length > 0) {
      var modify_permission_status = true;
    }

    var access_permission_status = false;
    if (formProps.access_permission != undefined && formProps.access_permission.length > 0) {
      var access_permission_status = true;
    }

    var permission = [];
    var modify_permission = [];
    var access_permission = [];
    if (modify_permission_status || access_permission_status) {
      var menu_side = this.props.admin_route.menu_side;
      for (var m in menu_side) {
        if (modify_permission_status && formProps.modify_permission.indexOf(menu_side[m]['admin_menu_id']) > -1 && modify_permission.indexOf(menu_side[m]['admin_menu_id']) == -1) {
          var menu_data = {}
          menu_data.admin_menu_id = menu_side[m]['admin_menu_id'];
          menu_data.model = (menu_side[m]['model_keyword'] ? menu_side[m]['model_keyword'] : '');
          menu_data.route = menu_side[m]['route'];
          menu_data.permission = 'modify';
          permission.push(menu_data)
        }

        if (access_permission_status && formProps.access_permission.indexOf(menu_side[m]['admin_menu_id']) > -1 && access_permission.indexOf(menu_side[m]['admin_menu_id']) == -1) {
          var menu_data = {}
          menu_data.admin_menu_id = menu_side[m]['admin_menu_id'];
          menu_data.model = (menu_side[m]['model_keyword'] ? menu_side[m]['model_keyword'] : '');
          menu_data.route = menu_side[m]['route'];
          menu_data.permission = 'access';
          permission.push(menu_data)
        }

        if (menu_side[m]['sub_menu'].length > 0) {
          var sub_menus = menu_side[m]['sub_menu'];
          for (var s in sub_menus) {

            if (modify_permission_status && formProps.modify_permission.indexOf(sub_menus[s]['admin_menu_id']) > -1 && modify_permission.indexOf(sub_menus[s]['admin_menu_id']) == -1) {
              var sub_menu_data = {}
              sub_menu_data.admin_menu_id = sub_menus[s]['admin_menu_id'];
              sub_menu_data.model = (sub_menus[s]['model_keyword'] ? sub_menus[s]['model_keyword'] : '');
              sub_menu_data.route = sub_menus[s]['route'];
              sub_menu_data.permission = 'modify';
              permission.push(sub_menu_data)
            }
            if (access_permission_status && formProps.access_permission.indexOf(sub_menus[s]['admin_menu_id']) > -1 && access_permission.indexOf(sub_menus[s]['admin_menu_id']) == -1) {
              var sub_menu_data = {}
              sub_menu_data.admin_menu_id = sub_menus[s]['admin_menu_id'];
              sub_menu_data.model = (sub_menus[s]['model_keyword'] ? sub_menus[s]['model_keyword'] : '');
              sub_menu_data.route = sub_menus[s]['route'];
              sub_menu_data.permission = 'access';
              permission.push(sub_menu_data)
            }
          }
        }
      }
    }

    delete formProps.modify_permission;
    delete formProps.access_permission;
    if (permission.length) {
      formProps.permission = permission;
    }

    var _this = this;
    var user_group_id = this.props.match.params.user_group_id;
    if (user_group_id != undefined) {
      formProps.user_group_id = this.props.match.params.user_group_id;
      this.props.updateUserGroup(formProps, function (err, result) {
        _this.setState({ isLoading: false });
        if (result) {
          _this.props.history.push('/admin/user_group');
        }
      });
    } else {
      this.props.addUserGroup(formProps, function (err, result) {
        _this.setState({ isLoading: false });
        if (result) {
          _this.props.history.push('/admin/user_group');
        }
      });
    }
  }

  permissionDenined() {
    this.props.validation('You don\'t have permission to add or modify user group');
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
    const { handleSubmit, user_group, admin_route, errorMessage } = this.props;
    const { isLoading, modify_permission } = this.state;

    if (!admin_route) {
      return (
        <div><Loading /></div>
      );
    }
    console.log("----admin_route-",admin_route);
    var user_group_id = this.props.match.params.user_group_id;

    var breadcrumbs = [];
    breadcrumbs.push({ text: 'User Group', value: '/admin/user_group' });

    if (user_group_id != undefined && user_group_id != 'add') {
      breadcrumbs.push({ text: 'User Group Info', value: '/admin/user/' + user_group_id });
    } else {
      breadcrumbs.push({ text: 'Add New User Group', value: '/admin/user/add' });
    }

    return (

      <div id="user-group" className={this.props.side_menu_status ? "side-container" : ""}>
        {isLoading ? <Loading /> : null}

        <div className="page-header  alca-header-fix py-2">
          <div className="container-fluid d-flex justify-content-between">
            <div className={this.props.side_menu_status ? "page-header-left is_active_leftmenu" : " page-header-left"}>
              <div class={"inner-page-header-left align-items-baseline"}>
                <h5 className="page-header-title text-dark  mt-2  ">User Groups</h5>
                <Breadcrumbs breadcrumbs={breadcrumbs} />
              </div>
            </div>


            <div className="d-flex align-items-center  page-header-right">
              <Link className="btn btn-default btn-sm" to="/admin/user"><i className="fa fa-reply"></i> <span>Back</span></Link>
            </div>

          </div>
        </div>


        <div className="card card-shadow">
          <div className="card-header bg-transparent">
            <h5 className="card-title text-muted text-hover-primary mb-0">Add New User Group</h5>
          </div>
          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            <div className="card-body">
              {this.renderAlert()}
              <div className="row">
                <div className="form-group col-sm-12">
                  <Field name="name" type="text" normalize={normalizeField(['trimStart'])} component={Input} label="Name" isRequired={true} label="Name" is_label={true} className="form-control" />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-sm-12">
                  <label className="required">Status</label>
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
              <div className="row">
                <div className="form-group col-sm-12">
                  <label>Restrict Access Permission</label>
                  <Field
                    name={`access_permission`}
                    component={checkbox =>
                      <div className="scrollbox">
                        <PermissionCheckbox results={admin_route.menu_side} value_id={'admin_menu_id'} field={checkbox.input} />
                      </div>
                    } />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-sm-12">
                  <label>Restrict Modify Permission</label>
                  <Field
                    name={`modify_permission`}
                    component={checkbox =>
                      <div className="scrollbox">
                        <PermissionCheckbox results={admin_route.menu_side} value_id={'admin_menu_id'} field={checkbox.input} />
                      </div>
                    } />
                </div>
              </div>
            </div>
            <div className="card-footer bg-transparent p-3">
              {
                !modify_permission
                  ?
                  <>
                    {
                      user_group_id == undefined
                        ?
                        <button
                          type="submit"
                          action="update_user_group_form"
                          className="btn btn-primary font-weight-bold mr-2"
                          disabled={isLoading}
                        >
                          {isLoading ? 'Loading...' : 'Add User Group'}
                        </button>
                        :
                        <button
                          type="submit"
                          action="update_user_group_form"
                          className="btn btn-primary font-weight-bold  mr-2"
                          disabled={isLoading}
                        >
                          {isLoading ? 'Loading...' : 'Update User Group'}
                        </button>
                    }
                  </>
                  :

                  <button type="button" onClick={() => this.permissionDenined()} className="btn btn-primary font-weight-bold  mr-2" title="You don't have permission to add or modify User Group" disabled><Tooltip message={'You don\'t have permission to add or modify User Group'} position={'top'}>
                    {
                      user_group_id
                        ?
                        <span>Update User Group</span>
                        :
                        <span>Add User Group</span>
                    }
                  </Tooltip></button>

              }

              <Link to="/admin/user_group" className="btn btn-light-primary btn-secondary font-weight-bold">Cancel</Link>

            </div>
          </form>

        </div>

      </div>
    );
  }
}
function validate(formProps) {
  const errors = {}
  if (!formProps.name) {
    errors.name = 'Required Name';
  }
  if (formProps.status === undefined) {
    errors.status = 'Required';
  } else if (formProps.status === '') {
    errors.status = 'Required';
  }
  return errors;
}

UserGroupForm = reduxForm({
  form: 'update_user_group_form',
  enableReinitialize: true,
  validate: validate
})(UserGroupForm);



function mapStateToProps(state) {
  var user_group = {};
  if (state.user.user_group != undefined && state.user.user_group.user_group_id != undefined && state.user.user_group.user_group_id > 0) {
    var user_group = state.user.user_group;
  } else {
    user_group.status = 1;
  }

  return {
    side_menu_status: state.app.side_menu_status,
    errorMessage: state.library.error,
    initialValues: user_group,
    admin_route: state.user.admin_route,
  }
}

export default connect(mapStateToProps, { getUserGroup, updateUserGroup, addUserGroup, nullUserGroupState, validation, validationNull, checkPermission })(UserGroupForm);
