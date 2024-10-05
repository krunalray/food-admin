import React, { Component } from 'react';

class textarea extends Component {


  render() {
  
    const { input, icon, label, help, is_label, type, meta } = this.props;
    var inputLabel = '';
    if(is_label) {
      inputLabel = <label>{label}</label>;
    }
    return (
      <div>
        {inputLabel}
        <textarea {...input} placeholder={label} className="form-control" />
        {meta.touched && ((meta.error && <span className="error">{meta.error}</span>) || (meta.warning && <span className="error">{meta.warning}</span>))}
        {
          help
          ?
          <small className="help">{help}</small>
          :
          null
        }
      </div>
    )
  }
}

export default textarea;
