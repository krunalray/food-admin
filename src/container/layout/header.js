import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';
import * as config from '../../system/config';
import { setSideMenu } from '../modules/app/system/action';
import { LoadingPage } from '../common/component/index';
import { menuUrl } from '../common/function';
import HeaderProfile from './header_profile';
import admin_route from './menu.json';
import profileData from './profile.json';


class CommonHeader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      left_menu: false,
      isSideMenu: false,
      isMobileSearch: false,
      isOpenSearch: false,
      istop: false,
    }
  }

  renderTopMenu(menu) {
    return menu.menu_top.map((menu_item, index) => {
      if (menu_item.is_top == 1) {
     
        var url = menuUrl(menu_item);
        var count = menu_item.count;
        if (url) {
          return (
            <li className="nav-item" key={menu_item.admin_route_id + '.' + index} data-toggle="tooltip" data-placement="bottom" title={menu_item.name}>
              <Link to={url} className="nav-link" ><i className={"bi bi-" + menu_item.icon + " fa-lg"}></i>
                {menu_item.count > 0 && <span className="badge badge-danger counter">{menu_item.count}</span>}
              </Link>
            </li>
          );
        }
      }
    });
  }

  openLeftMenu() {
    this.setState({ left_menu: !this.state.left_menu });
    this.props.setSideMenu(!this.state.left_menu);
  }

  renderCollapsibleSideMenu(menu, collapse, menuStyle) {

    return menu.menu_side.map((menu_item, index) => {


      if (menu_item.sub_menu.length > 0) {
        var url = menuUrl(menu_item);
        return (
          <div className="tab" key={menu_item.admin_route_id + '-' + index}>
            <input id={'tab-' + menu_item.admin_route_id} type="checkbox" className="tab-input" name="tabs" />
            <label htmlFor={'tab-' + menu_item.admin_route_id}><i className={"bi bi-" + menu_item.icon + " fa-lg"}></i> {menu_item.name}</label>
            <div className="tab-content">
              <ul className="list-group">
                {this.renderSideSubMenu(menu_item.sub_menu)}
              </ul>
            </div>
          </div>
        );
      } else {

        var url = menuUrl(menu_item);

        if (url) {
          return (
            [
              <li key={'menu-li-' + index}>
                <Link to={url} className="d-none d-sm-block d-md-block d-lg-block"><i className={"bi bi-" + menu_item.icon + " fa-lg"}></i> <span className="title">{menu_item.name}</span></Link>
              </li>,
              <li key={'menu-li-mobile-' + index}>
                <Link to={url} className="d-block d-sm-none d-md-none d-lg-none" onClick={() => { this.openLeftMenu() }}><i className={"bi bi-" + menu_item.icon + " fa-lg"}></i> <span className="title">{menu_item.name}</span></Link>
              </li>
            ]
          );
        }
      }
    });
  }

  renderSideSubMenu(sub_menu) {
 
    return sub_menu.map((sub_menu_item, new_index) => {
       if (sub_menu_item.keyword == "user_group") {
        var url = menuUrl(sub_menu_item);

        var hidden_menu_item = ''
        
          hidden_menu_item = 'top-menu-show';
        

        if (url) {
          return (
            [
              <li id={"sub_sub_menu." + sub_menu_item.admin_route_id} key={"sub_sub_menu." + sub_menu_item.admin_route_id + '.' + new_index}>

                <Link to={url} className={hidden_menu_item + '  d-md-block d-lg-block d-xl-block'}><i className="bi bi-dash"></i> {sub_menu_item.name}</Link>
              </li>,
              <li id={"sub_sub_menu." + sub_menu_item.admin_route_id + ".chat"} key={"sub_sub_menu." + sub_menu_item.admin_route_id + '.' + new_index + '.chat'}>

                <Link to="/admin/user/inbox" className={hidden_menu_item + ' d-md-block d-lg-block d-xl-block'}>Chat</Link>
              </li>
            ]
          );
        }
      } else {
        var url = menuUrl(sub_menu_item);

        var hidden_menu_item = ''
        
          hidden_menu_item = 'top-menu-show';
        

        if (url) {
          return (
            <li id={"sub_sub_menu." + sub_menu_item.admin_route_id} key={"sub_sub_menu." + sub_menu_item.admin_route_id + '.' + new_index}>
              <Link to={url} className={hidden_menu_item + ' d-md-block d-lg-block d-xl-block'}><i className="bi bi-dash"></i> {sub_menu_item.name}</Link>
            </li>
          );
        }
      }
    });
  }

  renderSideMenu(menu, collapse) {
    return menu.menu_side.map((menu_item, index) => {
      if (menu_item.sub_menu.length > 0) {
        var url = menuUrl(menu_item);
        return (
          <li key={"admin.menu.item." + menu_item.admin_route_id + "." + index}>
            <Link to={url} className="parent"><i className={"bi bi-" + menu_item.icon + " fa-lg"}></i> <span className="title">{menu_item.name}</span></Link>
            <ul id={menu_item.name} className={collapse}>
              {this.renderSideSubMenu(menu_item.sub_menu)}
            </ul>
          </li>
        );
      } else {
        var url = menuUrl(menu_item);
        if (url) {
          return (
            [
              <li key={'menu-li-' + index}>
                <Link to={url} className="d-none d-md-block d-lg-block d-xl-block"><i className={"bi bi-" + menu_item.icon + " fa-lg"}></i> <span className="title">{menu_item.name}</span></Link>
              </li>,
              <li key={"admin.menu.lesftbutton." + menu_item.admin_route_id + "." + index}>
                <Link to={url} className="d-md-none d-lg-none d-xl-none" onClick={() => { this.openLeftMenu() }}><i className={"bi bi-" + menu_item.icon + " fa-lg"}></i> <span className="title">{menu_item.name}</span></Link>
              </li>
            ]
          );
        }
      }
    });
  }




  toggleSearchOpen() {
    this.setState({ isOpenSearch: !this.state.isOpenSearch });
  }
  topMenuOpen() {
    alert("----open")
    this.setState({ istop: !this.state.istop });
  }
  topMenuClose() {
    this.setState({ istop: '' });
  }
  toggleMobileSearch() {
    this.setState({ isMobileSearch: !this.state.isMobileSearch });
  }
  render() {
 
    var { left_menu, isMobileSearch, isOpenSearch, istop } = this.state;


    var menuStyle = {};
    var class_name = '';
    var collapse = '';

    if (left_menu) {

      class_name = "active";
      collapse = 'collapse';
      menuStyle = {
        transition: "all 0.3s",
        transform: "translate3d(0px, 0px, 0px)",
      }
    }
    var searchStyle = {};
    if (isMobileSearch) {
      searchStyle = {
        opacity: "1",
        transition: "all 0.5s",
        transform: "translate3d(0px, 0px, 0px)",
        marginTop: "55px"
      }
    }
    var is_active_drp = " ";
    if (istop) {
      is_active_drp = "active dropdown-is-active";
    }
    var menuOverlystyle = {};
    if (is_active_drp == 'active dropdown-is-active') {
      menuOverlystyle = {
        display: "block",
        opacity: "inherit",
        animation: "overlay-fadein .5s"
      }
    }


    return (
      <React.Fragment>
        <div id="pageMessages"></div>
        <div id="header-top-section" className="d-none d-xl-block  d-lg-block"> <nav id="header-nav" className="navbar navbar-expand-lg">
         Admin
          <ul className="header-menu-right mr-2 nav d-lg-flex d-xl-flex float-right d-md-block d-lg-block d-xl-block">

        
            <li className="nav-item" data-toggle="tooltip" data-placement="bottom" title="Profile">
              <HeaderProfile profile={profileData} image_url={"/"} />
            </li>


          </ul>
        </nav>
        </div>
        <div id="header-left-section" className="d-none  d-xl-block">
          <nav id="column-left" className={class_name} style={menuStyle} >
            <ul id="menu">
              <li><Link onClick={() => { this.openLeftMenu() }} className="category-btn"> <i className="bi bi-list"></i></Link></li>
              {
                class_name
                  ?
                  <div className="left-nav-menu">
                    {this.renderCollapsibleSideMenu(admin_route, collapse, menuStyle)}
                  </div>
                  :
                  this.renderSideMenu(admin_route, collapse)
              }
            </ul>
          </nav>
        </div>

        {/* mobile view  */}
        <div className="mobile-view">
          <div id="header_mobile" className="d-xl-none header-mobile align-items-center  header-mobile-fixed ">
            <Link to="/" className="logo">
              Admin	</Link>
            <div className="d-flex align-items-center mobile-left-icon">
              <Link onClick={() => this.topMenuOpen()}>
                <i className="bi bi-list fa-2x text-muted mr-2"></i>
              </Link>
              <Link onClick={() => this.toggleMobileSearch()}>
                <i className="bi bi-person-fill fa-2x text-muted"></i>
              </Link>
              <div style={searchStyle} className="mobile-search bg-light">
              <nav id="topbar" className="navbar navbar-expand-lg p-0">
                <ul className="header-menu-right  nav  float-right d-md-block d-lg-block d-xl-block">
                  
                
                  <li className="nav-item" data-toggle="tooltip" data-placement="bottom" title="Profile">
                    <HeaderProfile profile={profileData} image_url={'/'} />
                  </li>


                </ul>
                </nav>
              </div>

              <div className="mobile-side-menu">
                <nav id="column-left" className={'border-0 rounded-0 card card-dropdown ' + is_active_drp}>
                  <div className="card-header rounded-0 py-3">
                    <h6 className="pull-left  mb-0  ml-2 font-weight-bold text-muted">Menu</h6>
                    <Link className=" pull-right px-2" onClick={() => this.topMenuClose()}><i className="bi bi-times text-muted"></i></Link>
                  </div>
                  <div className="nav-body">


                    <ul id="menu">
                      <li className="d-none   d-xl-block"><Link onClick={() => { this.openLeftMenu() }} className="category-btn"> <i className="bi bi-bars"></i></Link></li>
                      <div className="left-nav-menu">
                        {this.renderCollapsibleSideMenu(admin_route, collapse, menuStyle)}
                      </div>
                    </ul>

                  </div>
                </nav>
              </div>
            </div>


            <div className="overlay" style={menuOverlystyle} onClick={() => this.topMenuClose()}></div>
          </div>
        </div>
        {/* end mobile view  */}
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    side_menu_status: state.app.side_menu_status,

  };
}

export default withRouter(connect(mapStateToProps, { setSideMenu })(CommonHeader));
