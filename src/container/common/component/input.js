import React, { Component } from 'react';
//import { Field, reduxForm } from 'redux-form';

class Input extends Component {

  render() {
    //console.log("input props found>>>>>>>>>", this.props);
    const { input, icon, label, is_label, isRequired, isDisabled, type, meta, defaultChecked, is_input_group } = this.props;

    var reqClassName = '';
    if(isRequired){
      var reqClassName = 'required';
    }

    var inputLabel = '';
    if(is_label) {
      inputLabel = <label className={"control-label "+reqClassName}>{label}</label>;
    }
    let disabled = false;
    if(isDisabled) {
      disabled = true;
    }
    if(type == "checkbox"){
      return (
        <div className="form-check">
          <label className="form-check-label">
            <input {...input} className="form-check-input mr-2" type={type} /> {label}
          </label>
          {meta.touched && ((meta.error && <div className="error">{meta.error}</div>) || (meta.warning && <div className="error">{meta.warning}</div>))}
        </div>
      )
    } else if (type == "scheckbox"){
      return (
        <div className="form-check">
          <label className="form-check-label">
            {
              (defaultChecked != undefined && defaultChecked == true)
              ?
              <input {...input} type={"checkbox"}  className="form-check-input mr-2" value="true" defaultChecked={true} />
              :
              <input {...input} type={"checkbox"}  className="form-check-input mr-2" />
            }
            {label}
            <span className="checkmark"></span>
          </label>
          {meta.touched && ((meta.error && <div className="error">{meta.error}</div>) || (meta.warning && <div className="error">{meta.warning}</div>))}
        </div>
      )
      /*return (
        <div className="checkbox">
          <label className="checkbox-label">
            <input {...input} type={"checkbox"} /> {label}
            <span className="checkmark"></span>
          </label>
          {meta.touched && ((meta.error && <div className="error">{meta.error}</div>) || (meta.warning && <div className="error">{meta.warning}</div>))}
        </div>
      )*/
    }
    if(icon && is_input_group == undefined) {
      return (
        <React.Fragment>
          {inputLabel}
          <div className="input-group flex-nowrap">
            <span className="input-group-text"><i className={icon}></i></span>
            <input {...input} placeholder={label} type={type} className="form-control" />
          </div>
          {meta.touched && ((meta.error && <span className="error">{meta.error}</span>) || (meta.warning && <span className="error">{meta.warning}</span>))}
          </React.Fragment>
      )
    } else if(icon && is_input_group) {
      return (
        <React.Fragment>
          {inputLabel}
          <div className="input-group flex-nowrap">
            <span className="input-group-text"><i className={icon}></i></span>
            <input {...input} placeholder={label} type={type} className="form-control" />
          </div>
          {meta.touched && ((meta.error && <span className="error">{meta.error}</span>) || (meta.warning && <span className="error">{meta.warning}</span>))}
          </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          {inputLabel}
          <input {...input} placeholder={label} type={type} disabled={disabled} className="form-control" />
          {meta.touched && ((meta.error && <span className="error">{meta.error}</span>) || (meta.warning && <span className="error">{meta.warning}</span>))}
          </React.Fragment>
      )
    }
  }
}

export default Input;
