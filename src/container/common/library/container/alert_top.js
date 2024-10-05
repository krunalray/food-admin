import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeAlertTop } from '../system/action';

class AlertTop extends Component {

  componentWillMount(){
    this.props.removeAlertTop();
  }

  removeAlert(){
    this.props.removeAlertTop();
  }

  render() {
    const { alert } = this.props;
    if(alert !== undefined && alert.message) {
      setTimeout(() => {
        this.removeAlert();
      }, 3000);

      return (
        <div className={"alert-dismissible fixed-top text-center alert alert-"+alert.className}>
          <button type="button" className="close" data-dismiss="alert" aria-label="Close"><i className='fa fa-times-circle'></i></button>
          { alert.title ? <strong>{alert.title} :</strong> : '' }{alert.message}
        </div>
      )
    } else {
      return null;
    }

  }
}

function mapStateToProps(state) {
  return {
    alert: state.library.alert,
  }
}
export default connect(mapStateToProps, { removeAlertTop })(AlertTop);
