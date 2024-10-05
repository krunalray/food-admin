import React,  { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { toHtml } from '../../spk_modules/library/function';

class CommonModal extends Component {

  constructor(props) {
    super(props);
  }

  closeModal(){
    this.props.removeModal();
  }

  render() {
    const { message } = this.props;

    return (
      <div className="common-modal p-1">
        <div className="row">
          <div className="col-sm-12">
            {toHtml(message)}
          </div>
        </div>
      </div>
    );
  }
}
export default CommonModal;
