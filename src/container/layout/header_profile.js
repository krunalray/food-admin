import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as config from  '../../system/config';
import UserForm from '../modules/user/modal/user_form';
import { modal } from '../common/modal';
class HeaderProfile extends Component {
    constructor(props) {
        super(props);
        this.state = { sideProfileStatus: false };
    }
    closeSideCart() {
        this.setState({ sideProfileStatus: false });
    }
    openSideCart() {
        this.setState({ sideProfileStatus: true });
    }
    addModalUpdateUser(title, user_id) {
        modal.add(UserForm, {
            title: title,
            size: 'large',
            closeOnOutsideClick: false,
            hideCloseButton: false,
            userData: this.props.profile,
            header_user_edit: true
        });
    }
    render() {

        const { profile, image_url } = this.props;

        var image_link = image_url + profile.image;

        const sideProfileStatus = this.state.sideProfileStatus;
        var style = {};
        var cartOverlystyle = {};
        if (sideProfileStatus) {
            style = {
                transition: "all 0.5s",
                transform: "translate3d(0px, 0px, 0px)"
            }

            cartOverlystyle = {
                display: "block",
                opacity: "inherit",
                animation: "overlay-fadein .5s"
            }
        }



        return (
            <div className="header-profile">
                <div className="component-side-profile">
                    <Link className={' btn btn-transperent btn-profile-icon'} onClick={() => this.openSideCart()} >
                        <span className="text-muted font-weight-bold font-size-base d-none d-md-inline mr-1">Hi,</span>
                        <span className="text-dark-50 font-weight-bolder font-size-base d-none d-md-inline mr-2">{profile.firstname}</span>
                        <span className="font-weight-bolder badge bg-primary"> {profile.firstname.substr(0, 1).toUpperCase()} </span>
                    </Link>
                    <div className="card side-block" style={style}>
                        <div className="card-header bg-transparent border-0">
                            <h5 className="pull-left mt-2 pl-2 font-weight-bold m-0">Your Profile <small className="text-muted font-size-sm ml-2">12 Orders</small></h5>
                            <Link className="btn btn-sm btn-icon btn-light btn-hover-primary pull-right  btn-close  pull-right" onClick={() => this.closeSideCart()}><i className="fa fa-close"></i></Link>
                        </div>
                        <div className="card-body">
                            {/* profile top  */}

                            <div className="d-flex align-items-center" id="profile-top">
                                <div className=" profile-image-card mr-3">
                                    <div className="profile-image-card" style={{
                                        backgroundImage: "url(http://trystack.mediumra.re/img/agency-4.jpg)",
                                        backgroundPosition: 'center',
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat'
                                }}>

                                    </div>
                                    <i className="alc-counter bg-success"></i>
                                </div>
                                <div className="d-flex flex-column">
                                    <h5 href="#" className="font-weight-bold  text-primary">
                                        {profile.firstname + ' ' + profile.lastname}</h5><div className="text-muted">
                                        User Account
                                    </div>
                                    <div className="navi mt-2">
                                        <Link className="navi-item pb-2">
                                            <span className="navi-link mb-2 d-flex">
                                                <span className="navi-icon mr-1"><i className="fa fa-envelope mr-1"></i></span>
                                                <span className="navi-text text-muted text-hover-primary mb-2">{profile.email}</span></span>
                                        </Link>
                                        <Link to={config.LINK_PREFIX + "/signout"} className=" btn btn-sm btn-light-primary font-weight-bolder">Sign Out</Link></div></div></div>
                            {/*end  profile top  */}
                            <div className="separator-dashed"></div>
                            {/* Couter part start  */}
                            <div id="profile-body">
                                <ol className="list-group list-group-numbered  border-0">
                                    <li className="list-group-item d-flex  align-items-start border-0">
                                        <span className="badge bg-primary rounded-pill mr-2 left-icon"><i className="bi bi-person fa-2x text-primary"></i></span><div className="ms-2 me-auto">
                                            <span className="font-weight-bold mb-0">My Profile <button className="ml-2 btn btn-sm btn-danger font-weight-bold" onClick={() => this.addModalUpdateUser('Update User', profile.user_id)}>update</button></span>
                                            <div className="text-muted">
                                                Profile settings and more
                                            </div>
                                        </div>
                                    </li>
                                    <li className="list-group-item d-flex  align-items-start border-0">

                                        <span className="badge bg-primary rounded-pill mr-2 left-icon"><i className="bi bi-wallet fa-2x text-primary"></i></span><div className="ms-2 me-auto">
                                            <Link to="/admin/account"><span className="font-weight-bold mb-0">Account </span> </Link>
                                            <div className="text-muted">
                                                Account Details and more
                                            </div>
                                        </div>

                                    </li>
                                   
                                </ol>
                            </div>
                            {/* counter part end  */}
                            <div className="separator-dashed"></div>
                            {/*  recent part  */}
                            <div className="recent-notification">
                                <h5 className="mb-2">
                                    Recent Notifications
                                </h5>
                                <div className="d-flex align-items-center bg-light-success  rounded p-3 mb-3">
                                    <div className="d-flex flex-column flex-grow-1 mr-3 ">
                                        <Link to={config.LINK_PREFIX + "/sales/order"} className="font-weight-normal text-dark h6 text-hover-primary font-size-lg mb-1">Recent Tasks</Link>
                                        <span className="text-muted font-size-sm">your recent placed order</span>
                                    </div>
                                    {/* <span className="font-weight-bolder text-success py-1 font-size-lg">{}</span> */}
                                </div>
                                <div className="d-flex align-items-center bg-light-warning  rounded p-3 mb-3">
                                    <div className="d-flex flex-column flex-grow-1 mr-3">
                                        <Link to={config.LINK_PREFIX + "/product_review"} className="font-weight-normal text-dark h6 text-hover-warning font-size-lg mb-1">Recent Reviews</Link>
                                        <span className="text-muted font-size-sm">your recent Added Reviews</span>
                                    </div>
                                    {/* <span className="font-weight-bolder text-warning py-1 font-size-lg">50</span> */}
                                </div>
                                <div className="d-flex align-items-center bg-light-primary rounded p-3 mb-3">
                                    <div className="d-flex flex-column flex-grow-1 mr-3">
                                        <Link to={config.LINK_PREFIX + "/product"} className="font-weight-normal text-dark h6 text-hover-success font-size-lg mb-1">Recent Tickets</Link>
                                        <span className="text-muted font-size-sm">your recent Added Products</span>
                                    </div>
                                    {/* <span className="font-weight-bolder text-primary py-1 font-size-lg">50</span> */}
                                </div>
                                <div className="d-flex align-items-center bg-light-danger rounded p-3 mb-3">
                                    <div className="d-flex flex-column flex-grow-1 mr-3">
                                        <Link to={config.LINK_PREFIX + "/customer"} className="font-weight-normal text-dark h6 text-hover-danger font-size-lg mb-1">Recent Customers</Link>
                                        <span className="text-muted font-size-sm">your recent Customers</span>
                                    </div>
                                    {/* <span className="font-weight-bolder text-danger py-1 font-size-lg">50</span> */}
                                </div>

                                {/* recent part end  */}
                            </div>
                        </div>
                    </div>

                </div>
                <div className="overlay" style={cartOverlystyle} onClick={() => this.closeSideCart()}></div>
            </div>
        )
    }
}
export default HeaderProfile;