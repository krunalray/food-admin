import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as config from '../../../../system/config';
import { Breadcrumbs, Loading } from '../../../common/component';
import { dateFormat } from '../../../common/function';
import { setFilters } from '../../../common/library/system/action';
import { modal } from '../../../common/modal';
import ModalCustomerForm from '../modal/customer_form';
import { getCustomerList, getTotalCustomers } from '../system/action';
const base64 = require('base-64');

class CatalogCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      isLoading: false,
      sortName: undefined,
      sortOrder: undefined,
      sizePerPage: ((props.settings.config_limit_admin > 0) ? parseInt(props.settings.config_limit_admin) : 20)
    };

    this.onPageChange = this.onPageChange.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
    this.actionFormatter = this.actionFormatter.bind(this);
    this.renderPaginationShowsTotal = this.renderPaginationShowsTotal.bind(this);
    this.onSortChange = this.onSortChange.bind(this);
    this.onRowClick = this.onRowClick.bind(this);
    this.isVerifiedOtpFormat = this.isVerifiedOtpFormat.bind(this);

  }

  componentDidMount() {
    this.setState({ isLoading: true });
    var _this = this;
    var page = this.state.currentPage;

    this.props.setFilters(
      'customers',
      {
        start: ((page - 1) * this.state.sizePerPage),
        limit: this.state.sizePerPage,
      }
    );
    this.props.getTotalCustomers();
    this.props.getCustomerList(function (err, result) {
      if (result) {
        _this.setState({ isLoading: false });
      }
    });
  }

  onFilterChange(filterObj) {
    this.setState({
      currentPage: 1,
      sortName: undefined,
      sortOrder: undefined,
    })

    if (Object.keys(filterObj).length === 0) {
      this.setState({ isLoading: true });
      var _this = this;
      //var page  = this.state.currentPage;
      var page = 1;
      this.props.setFilters(
        'customers',
        {
          start: ((page - 1) * this.state.sizePerPage),
          limit: this.state.sizePerPage,
        }
      );
      this.props.getTotalCustomers();
      this.props.getCustomerList(function (err, result) {
        if (result) {
          _this.setState({ isLoading: false });
        }
      });
      return;
    }

    var setCustomerFilters = [];
    //var page = this.state.currentPage;

    var page = 1;
    var filter_data = {
      start: ((page - 1) * this.state.sizePerPage),
      limit: this.state.sizePerPage,
    };
    //console.log(">>>>>>filterObj>>>>", filterObj);
    for (var key in filterObj) {
      var targetName = key;
      var targetValue = filterObj[key].value;
      var filterKey = 'filter_' + key;
      if (targetValue === undefined) {
        filter_data['filter_' + targetName] = null;
      } else {
        filter_data['filter_' + targetName] = targetValue;
      }
    }
    //console.log("filter_data>>>>", filter_data);
    this.props.setFilters('customers', filter_data);
    this.setState({ isLoading: true });
    var _this = this;
    this.props.getTotalCustomers();
    this.props.getCustomerList(function (err, result) {
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
      'customers',
      {
        start: startLimit,
        limit: sizePerPage,
      },
      'merge'
    );
    this.setState({ isLoading: true, currentPage: page });
    var _this = this;
    this.props.getCustomerList(function (err, result) {
      if (result) {
        _this.setState({ isLoading: false });
      }
    });
  }

  renderPaginationShowsTotal(start, to, total) {
    return (
      <span>
        Showing {start} to {to} of {total} ({Math.ceil(total / this.state.sizePerPage)} Pages)
      </span>
    );
  }

  onSortChange(sortName, sortOrder) {
    this.setState({
      sortName,
      sortOrder,
      currentPage: 1,
    });
    var page = 1;
    this.props.setFilters(
      'customers',
      {
        sort: sortName,
        order: sortOrder,
        start: ((page - 1) * this.state.sizePerPage),
        limit: this.state.sizePerPage,
      },
      'merge'
    );
    this.setState({ isLoading: true });
    var _this = this;
    this.props.getCustomerList(function (err, result) {
      if (result) {
        _this.setState({ isLoading: false });
      }
    });
  }

  ModalCustomerForm(title, customerData) {
    var customerFilters = this.props.customer_filters;
    modal.add(ModalCustomerForm, {
      title: title,
      size: 'large',
      closeOnOutsideClick: false,
      hideCloseButton: false,
      customerData: customerData,
      customerFilters: customerFilters
    });
  }

  actionFormatter(cell, row, props) {
    return (
      <div>
        <a onClick={() => this.ModalCustomerForm("Update Customer - #" + row.customer_id, row)} className="btn btn-sm btn-primary mr-1"><i className="bi bi-pencil-square"></i></a>
      </div>
    );
  }

  onRowClick(row, cell) {
    if (cell != undefined) {
      this.ModalCustomerForm("Update Customer - #" + row.customer_id, row);
    }
  }

  statusFormat(cell, row) {
    if (row.status == 1) {
      return (
        <div className="badge badge-light-success">Enable</div>
      );
    } else {
      return (
        <div className="badge badge-light-danger">Disable</div>
      );
    }
  }
  dateInfo(cell, row) {
    return (
      <div>
        {
          (row.date_added != '0000-00-00 00:00:00')
            ?
            dateFormat(row.date_added, "datetime")
            :
            <span>0000-00-00 00:00:00</span>
        }
      </div>
    );
  }





  isVerifiedOtpFormat(cell, row) {
    if (this.props.settings.sms_signup_status != undefined && this.props.settings.sms_signup_status == 1) {
      return (
        <React.Fragment>
          {
            row.is_verified_otp == 1
              ?
              <React.Fragment>
                <span className=" bg-primary label-dot mr-2">
                </span>
                <span className="font-weight-bold text-primary">Yes</span>
              </React.Fragment>
              :
              <React.Fragment>
                <span className=" bg-danger label-dot mr-2">
                </span>
                <span className="font-weight-bold text-danger">No</span>
              </React.Fragment>

          }
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          <span className="label label-primary label-dot mr-2">
          </span>
          <span className="font-weight-bold text-primary">Yes</span>
        </React.Fragment>

      )
    }
  }

  generateColumns(settings) {
    var columnsData = [];
    columnsData.push(<TableHeaderColumn dataField='name' dataFormat={this.nameFormat.bind(this)} dataAlign="left" width='250px' filter={{ type: 'TextFilter' }} dataSort>Customer Name</TableHeaderColumn>);
    columnsData.push(<TableHeaderColumn dataField='status' dataAlign="center" width='150px' filter={{ type: "SelectFilter", options: config.STATUSES, placeholder: "- Select Status -" }} dataFormat={this.statusFormat} dataSort>Status</TableHeaderColumn>);
    if (settings.sms_signup_status != undefined && settings.sms_signup_status == 1) {
      columnsData.push(<TableHeaderColumn dataField='is_verified_otp' dataAlign="center" width='150px' filter={{ type: "SelectFilter", options: { 1: 'Yes', 0: 'No' }, placeholder: "- Select -" }} dataFormat={this.isVerifiedOtpFormat} dataSort>OTP Verified</TableHeaderColumn>);
    }
    columnsData.push(<TableHeaderColumn dataField='date_added' width='200px' dataFormat={this.dateInfo.bind(this)} dataAlign="center" dataSort>Date Added</TableHeaderColumn>);
    columnsData.push(<TableHeaderColumn dataField='login' width='150px' formatExtraData={this.props} dataFormat={this.actionFormatter} dataAlign="center">Action</TableHeaderColumn>);

    return columnsData.map((column) => {
      return column;
    });
  }

  nameFormat(cell, row) {
    let name = row.name;
    let first_alphabet = name.substr(0, 1).toUpperCase();
    let color = 'danger';
    if ((first_alphabet == 'A') || (first_alphabet == 'B') || (first_alphabet == 'C') || (first_alphabet == 'D') || (first_alphabet == 'E') || (first_alphabet == 'F')) {
      color = 'success';
    } else if ((first_alphabet == 'G') || (first_alphabet == 'H') || (first_alphabet == 'I') || (first_alphabet == 'J') || (first_alphabet == 'K') || (first_alphabet == 'L')) {
      color = 'info';
    } else if (first_alphabet = (first_alphabet == 'M') || (first_alphabet == 'N') || (first_alphabet == 'O') || (first_alphabet == 'P') || (first_alphabet == 'Q')) {
      color = 'primary';
    } else if ((first_alphabet == 'R') || (first_alphabet == 'S') || (first_alphabet == 'T') || (first_alphabet == 'U') || (first_alphabet == 'V')) {
      color = 'warning';
    }

    let alphabet = name.substr(0, 1).toUpperCase();
    return (

      <span><div className="d-flex align-items-center">
        <div className={"rouded btn shadow-none bg-light-" + color}>
          {alphabet}
        </div>
        <div className="ml-2">
          <div className="font-size-sm mb-0">{row.name}</div>
          <Link to="/" className="text-muted">Email : {row.email}</Link>
          <Link to="/" className="text-muted d-flex">Telephone : {row.telephone}</Link>
        </div>
      </div>
      </span>

    );
  }

  render() {
    const { customer_list, customer_total, settings, list_filters } = this.props;

    if (customer_list == undefined || customer_total == undefined || settings == undefined  || list_filters === undefined) {
      return (
        <div><Loading /></div>
      );
    }

    const { isLoading, sortName, sortOrder } = this.state;

    var breadcrumbs = [];
    breadcrumbs.push({ text: 'Customers', value: '/admin/customer' });



    return (

      <div id="product-bundle" className={this.props.side_menu_status ? "side-container" : ""}>
        {isLoading ? <Loading /> : null}

        <div className="page-header  alca-header-fix py-2">
          <div className="container-fluid d-flex justify-content-between">
            <div className={this.props.side_menu_status ? "page-header-left is_active_leftmenu" : " page-header-left"}>
              <div class={"inner-page-header-left align-items-baseline"}>
                <h5 className="page-header-title text-dark  mt-2  ">Customers</h5>
                <Breadcrumbs breadcrumbs={breadcrumbs} />
              </div>
            </div>


            <div className="d-flex align-items-center  page-header-right">
              <button className="btn btn-info btn-sm mr-2" onClick={() => this.componentDidMount()}><i className="fa fa-refresh"></i> <span>Refresh</span></button>
              <Link className="btn btn-primary btn-sm" onClick={() => this.ModalCustomerForm('Add ', '')}><i className="fa fa-plus"></i> <span>New</span></Link>
            </div>

          </div>
        </div>

        <div className="card alca-card">

          <div className="card-body">
            <BootstrapTable className="alca-data-table"

              keyField='customer_id'
              data={(customer_list != undefined && customer_list.length ? customer_list : [])}
              hover={true}
              remote={true}
              pagination={true}
              striped={true}
              fetchInfo={{ dataTotalSize: customer_total }}
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
                onRowClick: this.onRowClick
              }}
            >
              {this.generateColumns(settings)}

            </BootstrapTable>
          </div>
        </div>
        <div>

        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
    
  return {
    side_menu_status: state.app.side_menu_status,
    settings: state.app.settings,
    customer_list: state.customer.customer_list,
    customer_total: state.customer.customer_total,
    list_filters: state.library.list_filters,
  }
}
export default connect(mapStateToProps, { getCustomerList, getTotalCustomers, setFilters })(CatalogCustomer);
