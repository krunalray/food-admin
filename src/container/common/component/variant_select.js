import React, { Component } from 'react';

class VariantSelect extends Component {

  render() {
    const { input, disabled, type, meta, values } = this.props;
    //console.log("values>>>>>>>.", values);
    var selectbox = values.map((option_value, index) => {
      return (
        <option key={"product.variation.select.value."+index+option_value.option_value_id} value={`${option_value.option_value_id}`} > {option_value.name} </option>
      )
    });
    return (
      <div>
        <select {...input} className="form-control m-b-05">
          <option value="">--Please Select--</option>
          { selectbox }
        </select>
      </div>
    )
  }
}

export default VariantSelect;
