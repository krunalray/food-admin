import React, { Component } from 'react';

class select extends Component {

  render() {
    const { input, disabled, type, meta, values } = this.props;

    var selectbox = values.map((option_value, index) => {
      if(option_value.price){

        var additional_price  = '';
        additional_price = (
          (option_value.discount_text != undefined && option_value.discount_text != false )
          ?
          ['( '+option_value.discount_text, ' / '+option_value.price_text+' )']
          :
          '( '+option_value.price_text+' )'
        )

        return (
          <option key={"product.option."+index+option_value.option_value_id} value={`${option_value.product_option_value_id}`} >
            {option_value.name} {additional_price}
          </option>
        )
      } else {
        return (
          <option key={"product.option."+index+option_value.option_value_id} value={`${option_value.product_option_value_id}`} > {option_value.name} </option>
        )
      }
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
