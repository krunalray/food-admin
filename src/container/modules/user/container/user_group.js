import React,  { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { setFilters  } from '../../../common/library/system/action';
import { Loading, Breadcrumbs, EmptyListCard } from '../../../common/component';
import * as config from '../../../../system/config';

import { getUserGroups, getTotalUserGroups } from '../system/action';

class UserGroup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      isLoading:false,
      sortName: undefined,
      sortOrder: undefined,
      sizePerPage: 20
    };
    this.onPageChange = this.onPageChange.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
    this.actionFormatter = this.actionFormatter.bind(this);
    this.renderPaginationShowsTotal = this.renderPaginationShowsTotal.bind(this);
    this.onSortChange = this.onSortChange.bind(this);
    this.onRowClick = this.onRowClick.bind(this);
  }

  componentDidMount() {
    this.setState({
      currentPage: 1,
      sortName: undefined,
      sortOrder: undefined,
      isLoading: true
    })
    var _this = this;
    var page  = this.state.currentPage;

    this.props.setFilters(
      'user_group',
      {
        start: ((page - 1) * this.state.sizePerPage),
        limit: this.state.sizePerPage,
      }
    );
    this.props.getTotalUserGroups();
    this.props.getUserGroups(function(err, result) {
      if(result){
        _this.setState({isLoading: false});
      }
    });
  }

  onFilterChange(filterObj) {
    this.setState({currentPage: 1 })
    if (Object.keys(filterObj).length === 0) {
      this.setState({isLoading: true});
      var _this = this;
      var page  = 1;
      this.props.setFilters(
        'user_group',
        {
          start: ((page - 1) * this.state.sizePerPage),
          limit: this.state.sizePerPage,
        }
      );
      this.props.getTotalUserGroups();
      this.props.getUserGroups(function(err, result) {
        if(result){
          _this.setState({isLoading: false});
        }
      });
      return;
    }

  var setUserGroupFilters = [];

    var page = 1;
    var filter_data = {
      start: ((page - 1) * this.state.sizePerPage),
      limit: this.state.sizePerPage,
    };
    for (var key in filterObj) {
      var targetName = key;
      var targetValue = filterObj[key].value;
      var filterKey = 'filter_'+key;
      if(targetValue === undefined){
        filter_data['filter_'+targetName] = null;
      } else {
        filter_data['filter_'+targetName] = targetValue;
      }
    }
    this.props.setFilters('user_group', filter_data);
    this.setState({isLoading: true});
    var _this = this;
    this.props.getTotalUserGroups();
    this.props.getUserGroups(function(err, result) {
      if(result){
        _this.setState({isLoading: false});
      }
    });
  }

  onPageChange(page, sizePerPage){
    var startLimit = (page - 1) * sizePerPage;

    if(page == 1) {
      startLimit = 0;
    }
    this.props.setFilters(
      'user_group',
      {
        start: startLimit,
        limit: sizePerPage,
      },
      'merge'
    );
    this.setState({isLoading: true, currentPage:page});
    var _this = this;
    this.props.getUserGroups(function(err, result) {
      if(result){
        _this.setState({isLoading: false});
      }
    });
  }
  onSortChange(sortName, sortOrder){
    this.setState({
      sortName,
      sortOrder,
      currentPage: 1,
    });
    var page = 1;
    this.props.setFilters(
      'user_group',
      {
        sort: sortName,
        order: sortOrder,
        start: ((page - 1) * this.state.sizePerPage),
        limit: this.state.sizePerPage,
      },
      'merge'
    );
    this.setState({isLoading: true});
    var _this = this;
    this.props.getUserGroups(function(err, result) {
      if(result){
        _this.setState({isLoading: false});
      }
    });
  }

  renderPaginationShowsTotal(start, to, total) {
    return (
      <span>
        Showing { start } to { to } of { total } ({Math.ceil(total/this.state.sizePerPage)} Pages)
      </span>
    );
  }


  statusFormat(cell, row) {
    if (row.status == 1) {
      return (
        <div className="badge bg-light-success">Enable</div>
      );
    } else {
      return (
        <div className="badge badge-light-danger">Disable</div>
      );
    }
  }
  actionFormatter(cell, row){
    return (
      <div>
       <Link to={"/admin/user_group/"+row.user_group_id} className="btn btn-primary mr-2 btn-sm"><i className="bi bi-pencil-square"></i></Link>
      </div>
    );
  }

  onRowClick(row, cell) {
    if(cell != undefined) {
      this.props.history.push("/admin/user_group/"+row.user_group_id);
    }
  }

  render() {
    const { user_group_list, user_group_total, list_filters } = this.props;

    if(user_group_list == undefined || user_group_total == undefined){
      return(
        <div><Loading/></div>
      );
    }

    const { isLoading, sortName, sortOrder } = this.state;

    var breadcrumbs = [];
    breadcrumbs.push({text: 'Users', value: '/admin/user' });
    breadcrumbs.push({text: 'User Group', value: '/admin/user_group' });


    let filters_length = (list_filters.user_group != undefined ? Object.keys(list_filters.user_group).length : 0);
    if(filters_length <= 2 && !user_group_total && !isLoading){
      return (
        <div>
          <EmptyListCard title="Add User Groups" description="Assign Permission for particular user" link={<Link className="btn btn-primary btn-sm" to="/admin/user_group/add"><i className="fa fa-plus"></i> <span>New User Group</span></Link>} />

         
        </div>
      )
    }

    return (


        <div id="user" className={this.props.side_menu_status ? "side-container" : ""}>
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
            <button className="btn btn-info btn-sm mr-2" onClick={() => this.componentDidMount()}><i className="fa fa-refresh"></i> <span>Refresh</span></button>
              <Link className="btn btn-primary btn-sm mr-2" to={"/admin/user_group/add"}><i className="fa fa-plus"></i> <span> New User Group</span></Link>
              <Link className="btn btn-default btn-sm" to="/admin/user"><i className="fa fa-reply"></i> <span>Back</span></Link>
            </div>

          </div>
        </div>

        <div className="card alca-card">

          <div className="card-body">
            <BootstrapTable className="alca-data-table"
              keyField='user_group_id'
              data={(user_group_list != undefined && user_group_list.length ? user_group_list : [] )}
              hover={true}
              remote={ true }
              pagination={true}
              striped ={true}
              fetchInfo={{ dataTotalSize: user_group_total } }
              options={{ sizePerPage: this.state.sizePerPage,
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
              <TableHeaderColumn
                dataField='name'
                dataAlign=" left"
                width='250px'
                filter={ { type: 'TextFilter'} } dataSort>
                  Name
              </TableHeaderColumn>
              <TableHeaderColumn
                 dataField='status'
                 dataAlign="center"
                 width='150px'
                 dataFormat={this.statusFormat}
                 filter={{type: "SelectFilter", options: config.STATUSES, placeholder: "- Select Status -"}}dataSort>
                   Status
              </TableHeaderColumn>
              <TableHeaderColumn
                 dataFormat={this.actionFormatter}
                 width='150px'
                 dataAlign="center">
                   Action
              </TableHeaderColumn>
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
  console.log('---goup--state',state);
  return {
    side_menu_status: state.app.side_menu_status,
    user_group_total: state.user.user_group_total,
    user_group_list: state.user.user_group_list,
    list_filters: state.library.list_filters
  }
}
export default connect(mapStateToProps, { getUserGroups, getTotalUserGroups, setFilters})(UserGroup);
