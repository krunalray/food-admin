import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { modal } from "../../../common/modal";
import { setFilters } from "../../../common/library/system/action";
import { checkPermission } from "../../../modules/user/system/action";
import { Loading, Breadcrumbs, EmptyListCard } from "../../../common/component";
import * as config from "../../../../system/config";

import UserForm from "../modal/user_form";
import { getUserGroups, getUsers, getTotalUsers } from "../system/action";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      isLoading: false,
      sortName: undefined,
      sortOrder: undefined,
      sizePerPage: 20,
    };

    this.onPageChange = this.onPageChange.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
    this.actionFormatter = this.actionFormatter.bind(this);
    this.renderPaginationShowsTotal =
      this.renderPaginationShowsTotal.bind(this);
    this.onSortChange = this.onSortChange.bind(this);
    this.onRowClick = this.onRowClick.bind(this);
    this.nameFormat = this.nameFormat.bind(this);
  }

  componentDidMount() {
    // check modify permission if found true, ie. user don't have permission to modify data, other wise user can modify data
    this.setState({
      modify_permission: this.props.checkPermission("modify", "user"),
    });

    this.setState({
      currentPage: 1,
      sortName: undefined,
      sortOrder: undefined,
      isLoading: true,
    });
    var _this = this;
    var page = this.state.currentPage;

    this.props.setFilters("user", {
      start: (page - 1) * this.state.sizePerPage,
      limit: this.state.sizePerPage,
    });
    this.props.getUserGroups(function (err, result) {});
    this.props.getTotalUsers();
    this.props.getUsers(function (err, result) {
      if (result) {
        _this.setState({ isLoading: false });
      }
    });
  }

  onFilterChange(filterObj) {
    this.setState({ currentPage: 1 });
    if (Object.keys(filterObj).length === 0) {
      this.setState({ isLoading: true });
      var _this = this;
      var page = 1;
      this.props.setFilters("user", {
        start: (page - 1) * this.state.sizePerPage,
        limit: this.state.sizePerPage,
      });
      this.props.getTotalUsers();
      this.props.getUsers(function (err, result) {
        if (result) {
          _this.setState({ isLoading: false });
        }
      });
      return;
    }

    var setUserFilters = [];

    var page = 1;
    var filter_data = {
      start: (page - 1) * this.state.sizePerPage,
      limit: this.state.sizePerPage,
    };
    for (var key in filterObj) {
      var targetName = key;
      var targetValue = filterObj[key].value;
      var filterKey = "filter_" + key;
      if (targetValue === undefined) {
        filter_data["filter_" + targetName] = null;
      } else {
        filter_data["filter_" + targetName] = targetValue;
      }
    }
    this.props.setFilters("user", filter_data);
    this.setState({ isLoading: true });
    var _this = this;
    this.props.getTotalUsers();
    this.props.getUsers(function (err, result) {
      if (result) {
        _this.setState({ isLoading: false });
      }
    });
  }

  onPageChange(page, sizePerPage) {
    var startLimit = (page - 1) * sizePerPage;

    if (page == 1) {
      startLimit = 0;
    }
    this.props.setFilters(
      "user",
      {
        start: startLimit,
        limit: sizePerPage,
      },
      "merge"
    );
    this.setState({ isLoading: true, currentPage: page });
    var _this = this;
    this.props.getUsers(function (err, result) {
      if (result) {
        _this.setState({ isLoading: false });
      }
    });
  }
  onSortChange(sortName, sortOrder) {
    this.setState({
      sortName,
      sortOrder,
      currentPage: 1,
    });
    var page = 1;
    this.props.setFilters(
      "user",
      {
        sort: sortName,
        order: sortOrder,
        start: (page - 1) * this.state.sizePerPage,
        limit: this.state.sizePerPage,
      },
      "merge"
    );
    this.setState({ isLoading: true });
    var _this = this;
    this.props.getUsers(function (err, result) {
      if (result) {
        _this.setState({ isLoading: false });
      }
    });
  }
  renderPaginationShowsTotal(start, to, total) {
    return (
      <span>
        Showing {start} to {to} of {total} (
        {Math.ceil(total / this.state.sizePerPage)} Pages)
      </span>
    );
  }

  statusFormat(cell, row) {
    if (row.status == 1) {
      return <div className="badge bg-light-success">Enable</div>;
    } else {
      return <div className="badge badge-light-danger">Disable</div>;
    }
  }
  actionFormatter(cell, row, props) {
    let profile = this.props.profile;

    if (!this.state.modify_permission) {
      return (
        <div>
          <Link
            onClick={() => this.ModalUserForm("Update User", row)}
            className="btn btn-primary mr-2 btn-sm"
          >
            <i className="bi bi-pencil-square"></i>
          </Link>
        </div>
      );
    } else if (profile.user_id == row.user_id) {
      return (
        <div>
          <Link
            onClick={() => this.ModalUserForm("Update User", row)}
            className="btn btn-primary mr-2 btn-sm"
          >
            <i className="bi bi-pencil-square"></i>
          </Link>
        </div>
      );
    }
  }

  onRowClick(row, cell) {
    if (cell != undefined) {
      //this.ModalUserForm('Update User', row);
    }
  }
  nameFormat(cell, row) {
    let name = row.name;
    let first_alphabet = name.substr(0, 1).toUpperCase();
    let color = "danger";
    if (
      first_alphabet == "A" ||
      first_alphabet == "B" ||
      first_alphabet == "C" ||
      first_alphabet == "D" ||
      first_alphabet == "E" ||
      first_alphabet == "F"
    ) {
      color = "success";
    } else if (
      first_alphabet == "G" ||
      first_alphabet == "H" ||
      first_alphabet == "I" ||
      first_alphabet == "J" ||
      first_alphabet == "K" ||
      first_alphabet == "L"
    ) {
      color = "info";
    } else if (
      (first_alphabet =
        first_alphabet == "M" ||
        first_alphabet == "N" ||
        first_alphabet == "O" ||
        first_alphabet == "P" ||
        first_alphabet == "Q")
    ) {
      color = "primary";
    } else if (
      first_alphabet == "R" ||
      first_alphabet == "S" ||
      first_alphabet == "T" ||
      first_alphabet == "U" ||
      first_alphabet == "V"
    ) {
      color = "warning";
    }

    let alphabet = name.substr(0, 1).toUpperCase();
    return (
      <span>
        <div className="d-flex align-items-center">
          <div className={"rouded btn shadow-none bg-light-" + color}>
            {alphabet}
          </div>
          <div className="ml-2">
            <div className="font-size-lg mb-0">{row.name}</div>
          </div>
        </div>
      </span>
    );
  }
  ModalUserForm(title, userData) {
    modal.add(UserForm, {
      title: title,
      size: "large",
      closeOnOutsideClick: false,
      hideCloseButton: false,
      userData: userData,
    });
  }

  usergroupFormat() {
    var groupObj = this.props.user_group_list;
    var name = {};
    for (var key in groupObj) {
      var user_group_id = groupObj[key].user_group_id;
      var groupName = groupObj[key].name;
      name[user_group_id] = groupName;
    }
    return name;
  }

  render() {
    console.log("-----getAdminRoute");

    const { user_list, user_total, user_group_list, list_filters, profile } =
      this.props;

    if (
      user_list == undefined ||
      user_total == undefined ||
      user_group_list == undefined ||
      !profile
    ) {
      return (
        <div>
          <Loading />
        </div>
      );
    }

    const { isLoading, sortName, sortOrder, modify_permission } = this.state;

    var breadcrumbs = [];
    breadcrumbs.push({ text: "Users", value: "/admin/user" });

    let filters_length =
      list_filters.user != undefined
        ? Object.keys(list_filters.user).length
        : 0;
    if (filters_length <= 2 && !user_total && !isLoading) {
      return (
        <div>
          <EmptyListCard
            title="Add Users"
            description="User is nothing but the your store controller, manage your store smoothly, you can restrict users for accessing specific section."
            link={
              <Link
                className="btn btn-primary btn-sm"
                onClick={() => this.ModalUserForm("Add User", "")}
              >
                <i className="fa fa-plus"></i> <span>New User</span>
              </Link>
            }
          />
        </div>
      );
    }
    return (
      <div
        id="user"
        className={this.props.side_menu_status ? "side-container" : ""}
      >
        {isLoading ? <Loading /> : null}

        <div className="page-header  alca-header-fix py-2">
          <div className="container-fluid d-flex justify-content-between">
            <div
              className={
                this.props.side_menu_status
                  ? "page-header-left is_active_leftmenu"
                  : " page-header-left"
              }
            >
              <div class={"inner-page-header-left align-items-baseline"}>
                <h5 className="page-header-title text-dark  mt-2  ">Users</h5>
                <Breadcrumbs breadcrumbs={breadcrumbs} />
              </div>
            </div>

            <div className="d-flex align-items-center  page-header-right">
              <button
                className="btn btn-info btn-sm mr-2"
                onClick={() => this.componentDidMount()}
              >
                <i className="fa fa-refresh"></i> <span>Refresh</span>
              </button>
              <Link
                className="btn btn-primary btn-sm mr-2"
                to="/admin/user_group"
              >
                <i className="bi bi-people-fill"></i> <span>User Groups</span>
              </Link>
              <Link
                className="btn btn-primary btn-sm"
                onClick={() => this.ModalUserForm("Add User", "")}
              >
                <i className="fa fa-plus"></i> <span>New User</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="card alca-card">
          <div className="card-body">
            <BootstrapTable
              className="alca-data-table"
              keyField="user_id"
              data={user_list != undefined && user_list.length ? user_list : []}
              hover={true}
              remote={true}
              pagination={true}
              striped={true}
              fetchInfo={{ dataTotalSize: user_total }}
              options={{
                sizePerPage: this.state.sizePerPage,
                onPageChange: this.onPageChange,
                page: this.state.currentPage,
                hideSizePerPage: true,
                paginationShowsTotal: this.renderPaginationShowsTotal,
                onFilterChange: this.onFilterChange,
                sortName: sortName,
                sortOrder: sortOrder,
                onSortChange: this.onSortChange,
                onRowClick: this.onRowClick,
              }}
            >
              <TableHeaderColumn
                dataField="name"
                dataAlign="left"
                width="250px"
                filter={{ type: "TextFilter" }}
                dataFormat={this.nameFormat.bind(this)}
                dataSort
              >
                 Name
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="user_group_name"
                dataAlign="left"
                width="250px"
                filter={{
                  type: "SelectFilter",
                  options: this.usergroupFormat(),
                  placeholder: "- Select User Group -",
                }}
                dataSort
              >
                User Group
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="email"
                dataAlign="left"
                width="250px"
                filter={{ type: "TextFilter" }}
                dataSort
              >
                Email
              </TableHeaderColumn>
             
              <TableHeaderColumn
                dataField="status"
                dataAlign="center"
                width="150px"
                dataFormat={this.statusFormat}
                filter={{
                  type: "SelectFilter",
                  options: config.STATUSES,
                  placeholder: "- Select Status -",
                }}
                dataSort
              >
                Status
              </TableHeaderColumn>
              <TableHeaderColumn
                dataFormat={this.actionFormatter}
                width="150px"
                dataAlign="center"
              >
                Action
              </TableHeaderColumn>
            </BootstrapTable>
          </div>
        </div>
        <div></div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('-----state',state)
  return {
    side_menu_status: state.app.side_menu_status,
    user_total: state.user.user_total,
    user_list: state.user.user_list,
    user_group_list: state.user.user_group_list,
    list_filters: state.library.list_filters,
    profile: state.user.profile,
  };
}
export default connect(mapStateToProps, {
  getUsers,
  getTotalUsers,
  getUserGroups,
  setFilters,
  checkPermission,
})(User);
