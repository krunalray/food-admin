import React, { Component } from 'react';

class Tooltip extends Component {

  constructor(props) {
    super(props)

    this.state = {
      displayTooltip: false
    }
    this.hideTooltip = this.hideTooltip.bind(this)
    this.showTooltip = this.showTooltip.bind(this)
  }

  hideTooltip () {
    this.setState({displayTooltip: false})
  }

  showTooltip () {
    this.setState({displayTooltip: true})
  }

  render() {
    //console.log("this.props>>>>>>", this.props);
    const {message, position, children } = this.props;
    return (
      <span className='tooltipui' onMouseLeave={this.hideTooltip} >
        {
          this.state.displayTooltip &&
          <div className={`tooltipui-bubble tooltipui-${position}`}>
            <div className='tooltipui-message'>{message}</div>
          </div>
        }
        <span className='tooltipui-trigger' onMouseOver={this.showTooltip} >
          {children}
        </span>
      </span>
    )
  }
}

export default Tooltip;
