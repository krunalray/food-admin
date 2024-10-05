import React,  { Component, PropTypes } from 'react';

import  Loading  from './loading';

class modalConfirmation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading:false
    };
  }

  closeModal(){
    this.props.removeModal();
  }

  deleteConfim(data){
    this.props.removeModal();
    this.props.onDeleteConfim(data);
  }

  render() {
    const { data } = this.props;
    const { isLoading } = this.state;
    return (
      <div className="common-modal p-1">
        { isLoading ? <Loading /> : null }
        <div className="row">
          <div className="col-sm-12 pb-3">
            Are you sure you want to delete <b>{data}</b>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <button onClick={()=>this.deleteConfim(data)} className="btn btn-danger mr-2 btn-block">Yes</button>
          </div>
          <div className="col-sm-6">
            <button onClick={()=>this.closeModal()} className="btn btn-secondary mr-2 btn-block">No</button>
          </div>
        </div>
      </div>
    );
  }
}

export default modalConfirmation;
