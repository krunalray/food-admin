import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class NoResult extends Component {

  render() {
    const { title ,text } = this.props;
    return (
      <div className="no-result-card">
        <div className="text-center">
            <div className="card-body">
              <h2 className="no-result-title large">{ title ? title:'oops! No Record Found!'}</h2>
               <div className="no-result-text no-search-result"><h6>{ text ? text:'There is no record available.'}</h6></div>
              </div>
        </div>
      </div>
    );
  }
}

export default NoResult;
