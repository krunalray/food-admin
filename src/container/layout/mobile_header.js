import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import HeaderSearch from '../header_search';
import { htmlDecode } from '../../common/function';
import { setTopSearch } from '.../modules/app/system/action';

class HeaderMobile extends Component {

  constructor(props) {
    super(props);
    this.state = {

      istop: false,

      isflevel:'',
      isfMenuOpen: false,
      open_fcategory_id: 0,
      fcategory_name:'',

      isslevel:'',
      open_scategory_id: 0,
      issMenuOpen:false,
      scategory_name:'',

      istlevel:'',
      open_tcategory_id: 0,
      istMenuOpen:false,
      tcategory_name:'',
    };
  }

  renderSubSubSubCategopry(categories){
    return categories.map((category) => {
      var category_url  ='';
      if(category.keyword)
      {
          category_url = "/category/"+category.keyword;
      }
      else {
          category_url = "/category/info/"+category.category_id;
      }
        return (
          <li className="no-children lastnlast" key={"level_2"+category.category_id}>
            <Link  to={category_url} onClick={() => this.topMenuClose()}>{category.name}</Link>
          </li>
        );
    });
  }

  renderSubSubCategopry(categories){
      return categories.map((category) => {
        var category_url  ='';
        if(category.keyword) {
            category_url = "/category/"+category.keyword;
        } else {
            category_url = "/category/info/"+category.category_id;
        }
        var parent_category= category.name;
       if(this.state.scategory_name) {
        parent_category =this.state.scategory_name;
       }
        if(category.child_categories !== undefined && category.child_categories.length){
            var is_active= "is-hidden";
            var is_fade_in= "fade-out";

            if(this.state.istMenuOpen ==true){
               is_active= "is-active";
               is_fade_in= "fade-in";

            }
              if(this.state.open_tcategory_id == category.category_id) {
               var is_checked=true;
             } else {
               var is_checked=false;
             }

            return (
              <li className ="has-children last" key={"level_3"+category.category_id}>
                <Link  onClick={() => {this.istMenuOpen('level-3',category.category_id,category.name); }} className={is_active}>{category.name}</Link>
                  { is_checked ?
                      <ul className={'list-unstyled card-secondary-dropdown '+is_active +' '+is_fade_in}>
                        <li className="go-back" onClick={() => this.topMenuClose()}><Link><b>{parent_category}</b></Link></li>
                        <li className="see-all"><Link  to={category_url} onClick={() => this.isfMenuClose()}><b>{'All '+category.name}</b></Link></li>
                          {this.renderSubSubSubCategopry(category.child_categories)}
                   </ul>
                   : null }
              </li>
            );

        } else {
              return (
                <li className="no-children" key={"level_3"+category.category_id}>
                  <Link  className=""  to={category_url} onClick={() => this.topMenuClose()}>{category.name}</Link>
                </li>
              );
        }
      });
    }
    renderSubCategory(categories){
        return categories.map((category) => {
          var category_url  ='';
          if(category.keyword) {
              category_url = "/category/"+category.keyword;
          } else {
              category_url = "/category/info/"+category.category_id;
          }
          var parent_category= category.name;
        if(this.state.fcategory_name) {
          parent_category =this.state.fcategory_name;
        }
      if(category.child_categories !== undefined && category.child_categories.length){
          var is_active= "is-hidden";
          var is_fade_in= "fade-out";
          if(this.state.issMenuOpen ==true){
             is_active= "is-active";
             is_fade_in= "fade-in";
          }
          var is_move ='';
          if(this.state.istlevel =='level-3'){
             is_move= "move-out ";
          }

          if(this.state.open_scategory_id == category.category_id) {
             var is_checked=true;
           } else {
             var is_checked=false;
           }
          return (
            <li className ="has-children keyword" key={"level_2"+category.category_id}>
              <Link   onClick={() => {this.issMenuOpen('level-2',category.category_id,category.name); }} className={is_active}>{category.name}</Link>
                { is_checked ?
                  <ul className={'list-unstyled card-secondary-dropdown '+ is_move +''+ is_active +' '+is_fade_in}>
                    <li className="go-back" onClick={() => this.issMenuClose()}><Link><b>{parent_category}</b></Link></li>
                    <li className="see-all"><Link  to={category_url} onClick={() => this.topMenuClose()}><b>{'All '+category.name}</b></Link></li>
                       {this.renderSubSubCategopry(category.child_categories)}
                 </ul>
                 : null }
            </li>
          );
        }else {
            return (
              <li className="no-children" key={"level_2"+category.category_id}>
                <Link   className="" to={category_url} onClick={() => this.topMenuClose()}>{category.name}</Link>
              </li>
            );
      }
    });
  }


renderCategory(categories){
    return categories.map((category) => {
      var category_url  ='';
      if(category.keyword) {
          category_url = "/category/"+category.keyword;
      } else {
          category_url = "/category/info/"+category.category_id;
      }
      var parent_category= category.name;
    if(this.state.fcategory_name) {
      parent_category =this.state.fcategory_name;
    }
              if(category.child_categories.length > 0){
                        var is_active= "is-hidden";
                        var is_fade_in= "fade-out";
                        if(this.state.isfMenuOpen ==true){
                           is_active= "is-active";
                           is_fade_in= "fade-in";
                        }
                        var is_move ='';
                        if(this.state.isslevel =='level-2'){
                           is_move= "move-out ";
                        }
                        if(this.state.open_fcategory_id == category.category_id) {
                           var is_checked=true;
                         } else {
                           var is_checked=false;
                         }

                        return (
                          <li className="has-children" key={"level_1"+category.category_id}>
                      						<Link  onClick={() => this.isfMenuOpen('level-1',category.category_id,category.name)} className={is_active}>{category.name}</Link>
                                    { is_checked ?
                                      <ul className={'list-unstyled card-secondary-dropdown '+ is_move +''+ is_active +' '+is_fade_in}>
                                          <li className="go-back" onClick={() => this.isfMenuClose()}><Link><b>{parent_category}</b></Link></li>
                                          <li className="see-all"><Link  to={category_url} onClick={() => this.topMenuClose()}><b>{'All '+category.name}</b></Link></li>
                                         {this.renderSubCategory(category.child_categories)}
                                     </ul>
                                     : null }

                  					</li>
                        );
                      }else {
                        return (
                            <li key={"header_top_category_"+category.category_id}  ><Link to={category_url} onClick={() => this.topMenuClose()}>{category.name}</Link></li>
                        );
                      }
    });
  }

// for open Mega menu state

isfMenuOpen(level,category_id,name){
    this.setState({isflevel: level});
    this.setState({isMenuOpen: !this.state.isMenuOpen});
    this.setState({isfMenuOpen: !this.state.isfMenuOpen});
    this.setState({open_fcategory_id: category_id});
    this.setState({fcategory_name: name});
}
issMenuOpen(level,category_id,name){
    this.setState({issMenuOpen: !this.state.issMenuOpen});
    this.setState({isslevel: level});
    this.setState({open_scategory_id: category_id});
    this.setState({scategory_name: name});
}
istMenuOpen(level,category_id,name){
    this.setState({istMenuOpen: !this.state.istMenuOpen});
    this.setState({istlevel: level});
    this.setState({open_tcategory_id: category_id});
    this.setState({tcategory_name: name});
}
// for Close  Mega menu state

isfMenuClose(){
    this.setState({isflevel: ''});
    this.setState({isfMenuOpen: ''});
    this.setState({open_fcategory_id:0});
    this.setState({fcategory_name: ''});
}
issMenuClose(){
    this.setState({isslevel: ''});
    this.setState({issMenuOpen: ''});
    this.setState({open_scategory_id:0});
    this.setState({scategory_name: ''});
}
istMenuClose(){
    this.setState({istlevel: ''});
    this.setState({istMenuOpen: ''});
    this.setState({open_tcategory_id:0});
    this.setState({tcategory_name: ''});
}


  topMenuOpen(){
    this.setState({isfMenuOpen: false});
    this.setState({isflevel: ''});
    this.setState({open_fcategory_id: 0});
    this.setState({issMenuOpen: false});
    this.setState({isslevel: ''});
    this.setState({open_scategory_id: 0});
    this.setState({istMenuOpen: false});
    this.setState({istlevel: ''});
    this.setState({open_tcategory_id: 0});
    this.setState({ istop: !this.state.istop});
  }
    topMenuClose(){
    this.setState({isfMenuOpen: false});
    this.setState({isflevel: ''});
    this.setState({open_fcategory_id: 0});
    this.setState({issMenuOpen: false});
    this.setState({isslevel: ''});
    this.setState({open_scategory_id: 0});
    this.setState({istMenuOpen: false});
    this.setState({istlevel: ''});
    this.setState({open_tcategory_id: 0});
    this.setState({ istop: ''});
  }


  // New Navigation Code Start

  renderSubSubSubNavigationCategories(categories ,istop){
      return categories.map((category) => {
        if(istop){
          return (
            <li className="no-children lastnlast" key={"level_2"+category.custom_menu_id}>
              <Link  to={category.menu_link} onClick={() => this.topMenuClose()}>{category.name}</Link>
            </li>
          );
        } else {
          return (
            <li  id="sub-sub-child-category" key={"header_top_category_"+category.custom_menu_id} className="list-group-item" >
              <Link to={category.menu_link}>{htmlDecode(category.name)}</Link>
            </li>
          );
        }
      });
    }

  renderSubSubNavigationCategories(categories,istop){
      return categories.map((category) => {
        var parent_category= category.name;
       if(this.state.scategory_name) {
        parent_category =this.state.scategory_name;
       }
        if(category.child_menu !== undefined && category.child_menu.length){

          if(istop){
            var is_active= "is-hidden";
            var is_fade_in= "fade-out";
            if(this.state.istMenuOpen ==true){
               is_active= "is-active";
               is_fade_in= "fade-in";
            }
              if(this.state.open_tcategory_id == category.custom_menu_id) {
               var is_checked=true;
             } else {
               var is_checked=false;
             }

            return (
              <li className ="has-children last" key={"level_3"+category.custom_menu_id}>
                <Link  onClick={() => {this.istMenuOpen('level-3',category.custom_menu_id,category.name); }} className={is_active}>{category.name}</Link>
                  { is_checked ?
                      <ul className={'list-unstyled card-secondary-dropdown '+is_active +' '+is_fade_in}>
                        <li className="go-back" onClick={() => this.istMenuClose()}><Link><b>{parent_category}</b></Link></li>
                        <li className="see-all"><Link><b>{'All '+category.name}</b></Link></li>
                          {this.renderSubSubSubNavigationCategories(category.child_menu ,istop)}
                   </ul>
                   : null }
              </li>
            );
          } else {
            return (
              <li className="dropdown-submenu" key={"header_top_category_"+category.custom_menu_id}>
                  <Link className=""  to={category.name_link} >{htmlDecode(category.name)}</Link>
                  <ul className="dropdown-menu">
                    {this.renderSubSubSubNavigationCategories(category.child_menu)}
                  </ul>
              </li>
            );
          }
        } else {
              if(istop){
              return (
                <li className="no-children" key={"level_3"+category.custom_menu_id}>
                  <Link  className=""   to={category.name_link} onClick={() => this.topMenuClose()}>{category.name}</Link>
                </li>
              );
            } else {
              return (
                <li className="" key={"header_top_category_"+category.custom_menu_id}>
                  <Link  className=""  to={category.name_link} >{htmlDecode(category.name)}</Link>
                </li>
              );
            }
        }
      });
    }
  renderSubNavigationCategories(categories,total_column,istop){

  return categories.map((category) => {
    var parent_category= category.name;
      if(this.state.fcategory_name) {
        parent_category =this.state.fcategory_name;
    }

  if(category.child_menu !== undefined && category.child_menu.length){
  if(istop){
    var is_active= "is-hidden";
    var is_fade_in= "fade-out";
    if(this.state.issMenuOpen ==true){
       is_active= "is-active";
       is_fade_in= "fade-in";
    }
    var is_move ='';
    if(this.state.istlevel =='level-3'){
       is_move= "move-out ";
    }

    if(this.state.open_scategory_id == category.custom_menu_id) {
       var is_checked=true;
     } else {
       var is_checked=false;
     }
    return (
      <li className ="has-children keyword" key={"level_2"+category.custom_menu_id}>
        <Link   onClick={() => {this.issMenuOpen('level-2',category.custom_menu_id,category.name); }} className={is_active}>{category.name}</Link>
          { is_checked ?
            <ul className={'list-unstyled card-secondary-dropdown '+ is_move +''+ is_active +' '+is_fade_in}>
              <li className="go-back" onClick={() => this.issMenuClose()}><Link><b>{parent_category}</b></Link></li>
              <li className="see-all"><Link><b>{'All '+category.name}</b></Link></li>
                 {this.renderSubSubNavigationCategories(category.child_menu ,istop)}
           </ul>
           : null }
      </li>
    );
  }else {
   return (
     <li className="dropdown-submenu" key={"header_top_category_"+category.custom_menu_id}>
         <Link  className="" to={category.name_link}>{htmlDecode(category.name)}</Link>
         <ul className="dropdown-menu">
             {this.renderSubSubNavigationCategories(category.child_menu ,istop)}
         </ul>
     </li>
   );
  }
  } else {
      if(istop){
      return (
        <li className="no-children" key={"level_2"+category.custom_menu_id}>
          <Link   className="" to={category.name_link} onClick={() => this.topMenuClose()}>{category.name}</Link>
        </li>
      );
    } else {
        if(total_column > 0) {
            if(category.menu_option == 'custom_image') {

              var sub_menu_data = [];

                    var name = category.name;
                    var column = category.column;
                    if(sub_menu_data[column] == undefined) {
                      sub_menu_data[column] = [];
                    }
                    var newObj = {};
                    newObj.custom_menu_id = category.custom_menu_id;
                    newObj.name = name;
                    newObj.menu_option = category.menu_option;
                    newObj.name_link = category.name_link;
                    newObj.options = category.options;
                    sub_menu_data[column].push(newObj);



            sub_menu_data = (sub_menu_data);
            // end for custom image

                var menu_arr = [];
              for(var i in sub_menu_data) {
                var menuData = sub_menu_data[i].map((menuText) => {

                    var image = '';

                    if(menuText.options != '') {
                      image = this.props.settings.image_url + '' + menuText.options;
                    }

                    return(
                      <p className="text-left font-weight-bold">
                        {
                          menuText.name_link != ''
                          ?
                            <Link className="" to={menuText.name_link} ><img src={image} alt={menuText.name} className="img-fluid" /></Link>
                          :
                            <img src={image} alt={menuText.name} className="img-fluid" />
                        }
                        {
                          menuText.name_link != ''
                          ?
                          <div>
                              <Link className="" to={menuText.name_link}>{menuText.name}</Link>
                          </div>
                          :
                            <span>{menuText.name}</span>
                        }
                      </p>
                    );
                });
                menu_arr.push(
                  <div className={"col-sm-" + total_column} key={"new-custom-submenu-"+i}>{menuData}</div>
                );
              }
                return menu_arr;
            }else{
              return (
                <li className="" key={"header_top_category_"+category.custom_menu_id}>
                  <Link  className="" to={category.name_link} >{htmlDecode(category.name)}</Link>
                </li>
              );
          }
       }else{
         return (
           <li className="" key={"header_top_category_"+category.custom_menu_id}>
             <Link  className="" to={category.name_link} >{htmlDecode(category.name)}</Link>
           </li>
         );
     }
    }
  }
  });
  }




  renderNavigationCategories(categories,istop){
      return categories.map((category) => {

        var parent_category= category.name;
      if(this.state.fcategory_name) {
        parent_category =this.state.fcategory_name;
      }
        if(category.child_menu.length > 0){

          var column = 0;
          if(category.column > 0) {
            column = Math.floor(12/category.column);

            if(column < 1) {
              column = 1;
            }

            if(column > 12) {
              column = 12;
            }
          }

            if(istop){
                  var is_active= "is-hidden";
                  var is_fade_in= "fade-out";
                  if(this.state.isfMenuOpen ==true){
                     is_active= "is-active";
                     is_fade_in= "fade-in";
                  }
                  var is_move ='';
                  if(this.state.isslevel =='level-2'){
                     is_move= "move-out ";
                  }
                  if(this.state.open_fcategory_id == category.custom_menu_id) {
                     var is_checked=true;
                   } else {
                     var is_checked=false;
                   }

                  return (
                    <li className="has-children" key={"level_1"+category.custom_menu_id}>
                            <Link  onClick={() => this.isfMenuOpen('level-1',category.custom_menu_id,category.name)} className={is_active}>{category.name}</Link>
                              { is_checked ?
                                <ul className={'list-unstyled card-secondary-dropdown '+ is_move +''+ is_active +' '+is_fade_in}>
                                    <li className="go-back" onClick={() => this.isfMenuClose()}><Link><b>{parent_category}</b></Link></li>
                                    <li className="see-all"><Link><b>{'All '+category.name}</b></Link></li>
                                     {this.renderSubNavigationCategories(category.child_menu ,column,istop)}
                               </ul>
                               : null }

                      </li>
                  );
                }
                  else {
                    return (
                      <li className="dropdown" key={"header_top_category_"+category.custom_menu_id}>
                        <Link  to={category.name_link} className="dropdown-toggle  ">{htmlDecode(category.name)}<b className="caret"></b></Link>

                        <ul className="dropdown-menu megamenu-content top-dropdown">
                          {
                            column > 0
                            ?
                            <li className="new-custom-menu-sub-child container">
                              <div className="row">
                               {this.renderSubNavigationCategories(category.child_menu ,column,istop)}
                             </div>
                           </li>
                            :
                             this.renderSubNavigationCategories(category.child_menu ,'',istop)
                          }
                          </ul>
                      </li>
                    );
                  }
              } else {
              if(istop){
                    if(category.menu_option =='categories'){
                      return (
                          [
                          this.renderCategory(this.props.categories, this.state.istop)
                         ]
                      );
                    }else {
                      return (
                        <li key={"header_top_category_"+category.custom_menu_id}  ><Link to={category.name_link} onClick={() => this.topMenuClose()}>{category.name}</Link></li>
                      );
                    }

              }else {
                    if(category.menu_option == 'logo') {
                      var image = '';

                      if(category.options != '') {
                        image = this.props.settings.image_url + '' + category.options;
                      }
                      return (
                        <li className="custom-menu-logo " key={"header_top_custom_menu_"+category.custom_menu_id}>
                          {
                            image
                            ?
                              <Link className="" to={category.name_link}><img src={image} alt={htmlDecode(category.name)} className="img-fluid" /></Link>
                            :
                              <Link className="" to={category.name_link}>{htmlDecode(category.name)}</Link>
                          }
                        </li>
                      );
                    }else {
                      if(category.menu_option =='categories'){
                        return (
                            [
                            this.renderCategory(this.props.categories, this.state.istop)
                           ]
                        );
                      }else {
                        return (
                          <li className="" key={"header_top_category_"+category.custom_menu_id}>
                            {(category.is_display =='1' && category.icon != undefined)?<Link  className="" to={category.name_link}><i className={"  fa "+category.icon}></i></Link>:null}
                              {(category.is_display =='0' && category.text != undefined)?<Link  className="" to={category.name_link}>{htmlDecode(category.name)}</Link>:null}
                              {
                                (category.is_display =='' )
                                ?

                                  <Link  className="" to={category.name_link}>
                                    {category.icon !=undefined?<i className={" mr-2 fa "+category.icon}></i>:null}
                                    {htmlDecode(category.name)}
                                  </Link>
                                :
                                null
                              }
                          </li>
                        );
                      }
                    }
              }
            }
      });
    }

  renderAccountAfterLinks(header_props){
    if(header_props.account_links != undefined){
      return header_props.account_links.map((account, index) => {
        return <li key={"account.link."+index}><Link className="dropdown-item " to={account.link}><i className={"  fa fa-"+account.icon}></i> {account.title}</Link></li>
      });
    }
  }
  // Top Account navigation
  renderNavigationAccountLinks(account_links){
    if(account_links != undefined){
      return account_links.map((account_link, index) => {
        return <li key={"account.link."+index}><Link className="dropdown-item" to={account_link.name_link}>{account_link.name}</Link></li>
      });
    }
  }
  renderAccountLinks(header_props, settings) {
      if(this.props.authenticated) {
        return (
          <li className="nav-item dropdown">
          <Link title="My Account"  href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
              <i className="fa fa-user-circle"></i>
          </Link>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            {this.renderAccountAfterLinks(header_props)}
          </ul>
        </li>
        )
      } else {
        return (
          <li className="dropdown" key="header.customer.lil">
            <Link title="My Account" data-toggle="dropdown">
              <i className="fa fa-user fa-account  "></i><span className="d-none d-xl-block  "> {settings.text_my_account} <span className="caret"></span> </span>
            </Link>
            {
              (settings.navigations !== undefined && settings.navigations.top_account_links != undefined && settings.navigations.top_account_links.length > 0)
              ?
              <ul className="dropdown-menu">
                {this.renderNavigationAccountLinks(settings.navigations.top_account_links)}
             </ul>
              :
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/signup">{settings.text_register}</Link></li>
                <li><Link className="dropdown-item" to="/login">{settings.text_login}</Link></li>
              </ul>
            }
          </li>
        )
      }
    }

  topMenuOpen(){
    this.setState({ istop: !this.state.istop});
  }
    topMenuClose(){
    this.setState({ istop: ''});
  }
  mtoggleSearch(status) {
      this.props.setTopSearch(status);
  }
  render() {
    const { authenticated, categories,settings, header_props  ,istopSearch} = this.props;
    //console.log("Settings", settings);
    const {isfMenuOpen, istop} = this.state;
   if(istop){
      var is_active_drp = "dropdown-is-active";
    }else {
      var is_active_drp = " ";
    }
    var is_move_out ='';
      var is_collapse='';
    if(isfMenuOpen){
       is_move_out= "move-out";
    }
    if(isfMenuOpen == false){
       is_collapse= "show";
    }
    var searchStyle = {};
    if(istopSearch){
      searchStyle = {
        opacity: "1",
        transition: "all 0.5s",
       transform: "translate3d(0px, 0px, 0px)",
      }
    }

    var menuStyle = {};
    var menuOverlystyle = {};
    if(is_active_drp =='dropdown-is-active'){
      menuStyle = {
        transition: "all 0.5s",
        transform: "translate3d(0px, 0px, 0px)",
      }

      menuOverlystyle = {
        display: "block",
        opacity: "inherit",
        animation: "overlay-fadein .5s"
      }
    }
    var logo  ='';
    if(settings.logo != undefined && settings.logo){
       logo  = settings.image_url + settings.logo;
     }

    return (

      <nav className="header-mobile navbar navbar-expand-lg navbar-light d-xl-none shadow-sm">
          <div className="container-xl pr-0">
              <ul className="list-unstyled list-group list-group-horizontal">
                <li className="list-group-item px-3 border-0">
                     <Link className="" onClick={() => this.mtoggleSearch(true) } ><i className="fa fa-search "></i></Link>
                </li>
                <li className="list-group-item px-3 border-0">
                  {
                    (settings.app_group_id != undefined && settings.app_group_id != 2)
                    ?
                        <ul className="list-unstyled">
                          { this.renderAccountLinks(header_props, settings) }
                        </ul>
                    :
                    null
                  }
                </li>
              </ul>
              <div style={searchStyle} className="mobile-search bg-light">
                   <HeaderSearch />
              </div>
                <nav  className={'border-0 card card-dropdown '+is_active_drp}>

                <div className="bg-primary card-header py-2">
                {
                 (settings.navigations !== undefined && settings.navigations.category_navigation !==undefined && settings.navigations.category_navigation.length > 0)
                  ?
                    <h5 className="pull-left alc-bg-text mb-0  ml-2 font-weight-bold">Your Menus</h5>
                  :
                    <h5 className="pull-left alc-bg-text mb-0  ml-2 font-weight-bold">Categories</h5>
                }

                      <Link className=" pull-right px-2" onClick={() => this.topMenuClose() }><i className="fa fa-times text-white"></i></Link>
                 </div>

                   {
                     (settings.navigations !== undefined && settings.navigations.category_navigation !==undefined && settings.navigations.category_navigation.length > 0)
                     ?
                       <ul className={'list-unstyled card-dropdown-content megamenu '+is_move_out}>
                         { this.renderNavigationCategories(settings.navigations.category_navigation,istop)}
                       </ul>
                     :
                       <ul className={'list-unstyled card-dropdown-content '+is_move_out}>
                       { this.renderCategory(categories)}
                       </ul>
                   }
               </nav>
            </div>
              <div className="overlay" style={menuOverlystyle} onClick={() => this.topMenuClose() }></div>
        </nav>


    );
  }
}

function mapStateToProps(state) {
  return {
    istopSearch: state.app.top_search,
  }
}
export default connect(mapStateToProps, { setTopSearch })(HeaderMobile);
