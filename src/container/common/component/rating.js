//https://github.com/ikr/react-star-rating-input/blob/master/src/StarRatingInput.tsx
import React, { Component } from 'react';

class Rating extends Component {

  constructor(props) {
    super(props)
    this.state = { prospectiveValue: 0 }
  }

  starProps(value){
    return {
      value,
      mode: this.anchorMode(value),
      onClick: this.handleStarClick.bind(this, value),
      onMouseEnter: this.handleStarMouseEnter.bind(this, value),
      onMouseLeave: this.handleStarMouseLeave.bind(this, value)
    }
  }

  anchorMode(value){
    if (this.state.prospectiveValue > 0) {
      return (value <= this.state.prospectiveValue ? 'suggested' : 'off')
    }
    return (value <= this.props.value ? 'on' : 'off')

  }

  handleStarMouseEnter(value){
    this.setState({ prospectiveValue: value })
  }

  handleStarMouseLeave(value){
    this.setState({ prospectiveValue: 0 })
  }

  handleStarClick(value){
    this.setState({ prospectiveValue: value })
    this.props.onChange(value);
  }

  render() {
    const { starSize } = this.props;
    var findStarSize = 5
    if(starSize != undefined && starSize > 0){
      findStarSize = starSize;
    }

    var range = new Array(findStarSize);
    for (let i = 0; i < findStarSize; i++) {
      range[i] = i + 1
    }

    return (
      <div className='star-rating-input'>
        {range.map(i => (<Star {...this.starProps(i)} key={i} />))}
     </div >
    )
  }
}

function Star(props) {
  return (
    <div className='star-rating-star-container'>
      <a
        className={`star-rating-star ${props.mode}`}
        title={`${props.value}`}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
        onClick={(e) => {
          e.preventDefault()
          props.onClick()
        }}
      />
    </div>
  )
}

export default Rating;
