  import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';
import { Breadcrumbs, PillsBox } from '../common/component';
import { dateFormat } from '../common/function';




class AppDashboard extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    let _this = this;
  }

  renderCustomerAnalytics(customerData) {
    return customerData.map((customer, index) => {
      if (customer.customer_id > 0 && customer.customer_name != '') {
        return (
          <tr key={'customer_' + customer.analytics_activity_id + "." + index}>
            <td className="text-left">
              <Link to={"/admin/customer/" + customer.customer_id}>{customer.customer_name}</Link> Logged in.<br />
              <small>{dateFormat(customer.date_added, "datetime")}</small>
            </td>
          </tr>
        );
      }
    });
  }

  renderAmountFormat(amount) {
    var amt = amount;
    if (amount > 1000000000000) {
      amt = parseFloat(amount / 1000000000000).toFixed(1) + ' T';
    } else if (amount > 1000000000) {
      amt = parseFloat(amount / 1000000000).toFixed(1) + ' B';
    } else if (amount > 1000000) {
      amt = parseFloat(amount / 1000000).toFixed(1) + ' M';
    } else if (amount > 1000) {
      amt = parseFloat(amount / 1000).toFixed(1) + ' K';
    } else {
      amt = amount;
    }
    return amt;
  }

  render() {
    const {  } = this.props;
  
    console.log('-----REACT_APP_API_API',process.env.REACT_APP_API_API)


    var breadcrumbs = [];
    breadcrumbs.push({ text: 'Dashboard', value: '/admin' });


    return (
      <div id="dashboard" className={this.props.side_menu_status ? "side-container" : ""}>

        <div className="page-header  alca-header-fix py-2">
          <div className="container-fluid d-flex justify-content-between">
            <div className={this.props.side_menu_status ? "page-header-left is_active_leftmenu" : " page-header-left"}>
              <div class={"inner-page-header-left align-items-baseline"}>
                <h5 className="page-header-title text-dark  mt-2  ">Home Dashboard</h5>
                <Breadcrumbs breadcrumbs={breadcrumbs} />
              </div>
            </div>

            <div className="d-flex align-items-center page-header-right">
            </div>

          </div>
        </div>




            <div class="dashboard-top-counter">
              <div class="row">
                <div class="col-lg-6 col-sm-12">

                  <div className="card alca-card-shadow card-counter-block">
                    <div className="card-header border-0 bg-danger py-5 pl-4 pt-0 rounded">
                      <h3 className="card-title  font-weight-bolder text-white">Customer Stat</h3>
                    </div>
                    <div className="card-body card-connter-inner-body position-relative overflow-hidden">
                      <div className="card-connter-inner">
                        <div className="row">
                          <div className="col-lg-6 col-md-6 col-sm-12 col-6">
                            <PillsBox
                              icon={"cart4"}
                              space={"mb-4"}
                              title={"Total 1"}
                              value={0}
                              color={"danger"}
                              link={"/"}
                            />
                          </div>

                          <div className="col-lg-6 col-md-6 col-sm-12 col-6">
                            <PillsBox
                              icon={"cash"}
                              space={"mb-4"}
                              title={"Total 2"}
                              value={10}
                              color={"primary"}
                              link={"/"}
                            />
                          </div>

                          <div className="col-lg-6 col-md-6 col-sm-12 col-6">
                            <PillsBox
                              icon={"minecart-loaded"}
                              title={"Total 3"}
                              value={10}
                              color={"success"}
                              link={"/"}
                            />
                          </div>

                          <div className="col-lg-6 col-md-6 col-sm-12 col-6">
                            <PillsBox
                              icon={"people-fill"}
                              title={"Total 4"}
                              value={10}
                              color={"warning"}
                              link={"/"}
                            />
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6 col-sm-12">

                  <div className="card alca-card-shadow card-counter-block">
                    <div className="card-header border-0 bg-danger py-5 pl-4 pt-0 rounded">
                      <h3 className="card-title  font-weight-bolder text-white">Provider Stat</h3>
                    </div>
                    <div className="card-body card-connter-inner-body position-relative overflow-hidden">
                      <div className="card-connter-inner">
                        <div className="row">
                          <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                            <PillsBox
                              icon={"list"}
                              space={"mb-4"}
                              title={"Total 5"}
                              value={10}
                              color={"warning"}
                              link={"/"}
                            />
                          </div>

                          <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                            <PillsBox
                              icon={"diagram-3"}
                              space={"mb-4"}
                              title={"Total 6"}
                              value={10}
                              color={"success"}
                              link={"/"}
                            />
                          </div>

                          <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                            <PillsBox
                              icon={"exclude"}
                              title={"Total 7"}
                              value={10}
                              color={"primary"}
                              link={"/"}
                            />
                          </div>

                          <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                            <PillsBox
                              icon={"chat"}
                              title={"Total 8"}
                              value={10}
                              color={"danger"}
                              link={"/"}
                            />
                          </div>

                        </div>



                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
     

        <div className="dashboard-recent-record-list">
          <div className="row">
            <div className="col-lg-6">
              <div className="card alca-card-shadow recent-record">
                <div className="card-header  vertical-center d-flex justify-content-between bg-white">
                  <h5 className="title mb-0 font-weight-bolder"> Recent Customers</h5>
                  <Link to="/admin/sales/order" className="btn  btn-md btn-primary float-right">View All</Link>
                </div>

                <div className="card-body">

                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card alca-card-shadow recent-record">
                <div className="card-header  vertical-center d-flex justify-content-between bg-white">
                  <h5 className="title mb-0 font-weight-bolder"> Recent Tickets</h5>
                  <Link to="/admin/sales/order" className="btn  btn-md btn-primary float-right">View All</Link>
                </div>

                <div className="card-body">

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}
function mapStateToProps(state) {
  // console.log("state.app>>>>>>>>>>>>", state);
  return {
    side_menu_status: state.app.side_menu_status,

  };
}
export default withRouter(connect(mapStateToProps, { })(AppDashboard));
