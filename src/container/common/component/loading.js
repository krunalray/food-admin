import React, { Component } from 'react';

class Loading extends Component {

  render() {
    var cart_overlay_style= {
      display: "block",
      opacity: "inherit",
      animation: "overlay-fadein .5s"
    }
    return (
            <div className="">
              Loading....
            </div>

    );
  }
}

export default Loading;
