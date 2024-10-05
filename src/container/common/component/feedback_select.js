import React, { Component } from 'react';

class select extends Component {

  render() {
    const { input, disabled, type, meta, values } = this.props;

    var selectbox = values.map((option_value, index) => {
      return (
        <option key={"feedback.option."+index+option_value.feedback_question_id} value={`${option_value.feedback_question_option_id}`} > {option_value.name} </option>
      )
    });
    return (
      <div>
        <select {...input} className="form-control m-b-05">
          <option value="">--Please Select--</option>
          { selectbox }
        </select>
        {meta.touched && ((meta.error && <span className="error btn-block">{meta.error}</span>) || (meta.warning && <span className="error btn-block">{meta.warning}</span>))}
      </div>
    )
  }
}

export default select;
