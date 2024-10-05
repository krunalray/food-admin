import React, { Component } from 'react';

class WishlistButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isActive : false
    };
  }

  setIsActive(){
    if(this.state.isActive) {
      this.setState({isActive : false});
      var action_type = "delete";
    } else {
      this.setState({isActive : true});
      var action_type = "insert";
    }
    if(this.props.onClick){
      this.props.onClick(action_type);
    }
  }

  render() {
    return (
      <button type="button" className="btn btn-primary btn-wishlist sk-btnbox" onClick={()=> this.setIsActive()} >
          <i className={this.state.isActive ? "fa fa-heart" : "fa fa-heart-o"}></i>
      </button>
    )
  }
}

export default WishlistButton;
