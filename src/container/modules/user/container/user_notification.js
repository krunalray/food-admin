import $ from 'jquery';
import React, { Component } from 'react';
import Pagination from "react-js-pagination";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setFilters } from '../../../../common/library/system/action';
import { Loading } from '../../../common/component';
import { deleteNotification, getTotalUserNotification, getUserNotifications } from '../system/action';


class UserNotification extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      isLoading:false,
      sizePerPage: 10,
      search_text: '',
      currentTicketPriorityFilterStatus:'',
      currentTicketStatus:''

    };

    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.refresh = this.refresh.bind(this);
    this.renderNotifications = this.renderNotifications.bind(this);
      this.renderDeleteNotification = this.renderDeleteNotification.bind(this)
  }

  componentWillMount() {
    this.setState({isLoading: true});
    var _this = this;
    var page  = this.state.currentPage;

    this.props.setFilters(
      'notification',
      {
        start: ((page - 1) * this.state.sizePerPage),
        limit: this.state.sizePerPage,
      }
    );

    this.props.getTotalUserNotification();
    this.props.getUserNotifications(function(err, result) {
      if(result){
        _this.setState({isLoading: false});
      }
    });
  }

  refresh() {
    this.setState({isLoading: true, currentTicketPriorityFilterStatus: '', currentPage: 1, search_text: '' });
    var _this = this;
    var page  = 1;

    $('#search-text').val('');

    this.props.setFilters(
      'notification',
      {
        start: ((page - 1) * this.state.sizePerPage),
        limit: this.state.sizePerPage,
      }
    );

    this.props.getTotalUserNotification();
    this.props.getUserNotifications(function(err, result) {
      if(result){
        _this.setState({isLoading: false});
      }
    });
  }

  handlePageChange(pageNumber) {
    var _this = this;
    var startLimit = (pageNumber - 1) * this.state.sizePerPage;

    if(pageNumber == 1) {
      startLimit = 0;
    }

    this.setState({ isLoading: true, currentPage: pageNumber });

    this.props.setFilters(
      'notification',
      {
        filter_text: this.state.search_text,
        filter_priority_name: this.state.currentTicketPriorityFilterStatus,
        start: startLimit,
        limit: this.state.sizePerPage,
      }
    );
    this.props.getTotalUserNotification();
    this.props.getUserNotifications(function(err, result) {
      if(result){
        _this.setState({isLoading: false});
      }
    });
  }
  renderDeleteNotification(notification_id,is_read){
    if(is_read =='un_read'){
        this.props.deleteNotification(notification_id);
    }
  }
  handleChange(e) {
    this.setState({ search_text: e.target.value });
  }

  filterData() {
    var _this = this;
    this.setState({ isLoading: true, currentPage: 1 });
    var page  = 1;
    this.props.setFilters(
      'notification',
      {
        start: ((page - 1) * this.state.sizePerPage),
        limit: this.state.sizePerPage,
        filter_text: this.state.search_text,
        filter_priority_name: this.state.currentTicketPriorityFilterStatus,
      }
    );


    this.props.getTotalUserNotification();
    this.props.getUserNotifications(function(err, result) {
      if(result){
        _this.setState({isLoading: false});
      }
    });
  }




  renderNotifications(notifications) {
    return notifications.map((notification)=> {
          var icon ='';
          var  text ='';
          var  route_link = '';
          var  is_read = '';
          if(notification.group =='customer'){
            icon = 'user-circle-o';
            text  ='New Account have been created.';
          }else if (notification.group =='order') {
            icon = 'cart-plus';
              text  ='New Order have been placed.';
          }
          if(notification.is_read_notification_id ==null){
            is_read = 'un_read';
          }else {
            is_read = 'read';
          }

            if(notification.group =='customer') {
                  route_link = "/admin/customer/"+ notification.group_id;
            }else if (notification.group =='order') {
                  route_link = "/admin/sales/order/"+ notification.group_id;
            }

          return(
              <div className="col-sm-3" key={'notification_'+notification.notification_id}>
                <Link to={route_link} className="route-link" onClick={ () => this.renderDeleteNotification(notification.notification_id,is_read)} >
                  <div  className={'card-notification group-'+ notification.group +' '+is_read}>
                    <div className="d-flex  mr-3 float-left">
                      <i className={'rounded-circle fa fa-'+icon} ></i>
                    </div>
                    <div className="notification-body">
                      <p className="mt-1">{text}<Link to={route_link}  className="n-link">({notification.group_id})</Link></p>
                    </div>
                  </div>
              </Link>
           </div>
          );
    });
  }





  applyGroup(name, value) {
    this.setState({
      isLoading: true,
      currentPage: 1,
      currentTicketPriorityFilterStatus: '',
      currentTicketStatus: value
    });

    var filter_data = {};
    var page = 1;
    filter_data = {
      start: ((page - 1) * this.state.sizePerPage),
      limit: this.state.sizePerPage,
    };
    filter_data[name] = value;
    this.props.setFilters('notification', filter_data);
    var _this = this;

    this.props.getTotalUserNotification();
    this.props.getUserNotifications(function(err, result) {
      if(result){
        _this.setState({isLoading: false});
      }
    });
  }

  renderNotificationSortBy(){
          return (
            <div className="notification-sortby">
              <div className="select-style">
             <select onChange={ (e) => this.applyGroup('group', e.target.value)}>
                  <option value="">--Select Group--</option>
                  <option value="customer">Customer</option>
                  <option value="order">Order</option>
                </select>
              </div>
            </div>
          )
    }

  render() {

    const { notification_list, notification_total } = this.props;

    const { isLoading, currentTicketPriorityFilterStatus,currentTicketStatus, search_text, currentPage, sizePerPage } = this.state;
    if(notification_list == undefined || notification_total == undefined) {
      return(
        <div className="ticket-undefined"><Loading /></div>
      );
    }
    var topclassName ='col-sm-12';
    var btnfull ='btn btn-primary btn-block btn-add-ticket mt-3 mb-3 hidden-md-down';



    return(
        <div className="notification-list">
        { isLoading ? <Loading /> : null }
          <div className="container-fluid">
            <div className="row pt-2 pb-0">
                <div className="col-sm-11 mb-2 p-0">
                        <div>
                          {this.renderNotificationSortBy()}
                        </div>

               </div>

               <div className="col-sm-1 pl-0 mt-2">
                 <button className="btn btn-refresh btn-sm pull-right" onClick={() => this.refresh()}>
                          <i className="fa fa-refresh"></i><span> Refresh</span>
                  </button>
               </div>
            </div>
        {
          notification_list != undefined && notification_list.length > 0
          ?
          <div>
            <div className="row data-list  mt-3 mb-3">
              {this.renderNotifications(notification_list)}
            </div>
              </div>
          :
            <div className="row">
                <div className="col-sm-12">
                  <div className="text-center">
                        <div className="card">
                            <div className="card-body p-2">
                              <div className="no-result"><h5>No Active notification found!</h5></div>
                            </div>
                        </div>
                  </div>
                </div>
              </div>
        }
        <div className="row ">
            <div className="col-sm-12">
              {
                notification_total > sizePerPage
                ?
                    <div className="card-pagination">
                      <div className="row">
                        <div className="col-sm-12 text-right">
                          <Pagination
                            pageRangeDisplayed={5}
                            activePage={currentPage}
                            itemsCountPerPage={sizePerPage}
                            totalItemsCount={notification_total}
                            onChange={this.handlePageChange}
                          />
                        </div>
                      </div>
                    </div>
                :
                null
              }
            </div>
          </div>
      </div>
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    notification_list: state.user.user_notification_list,
    notification_total: state.user.user_notification_total,
  }
}
export default connect(mapStateToProps, { getUserNotifications, getTotalUserNotification, setFilters ,deleteNotification })(UserNotification);
