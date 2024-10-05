import React, {Component, PropTypes} from 'react';
import { htmlDecode } from '../../spk_modules/library/function';
import _ from 'lodash';

class MultiCheckboxField extends Component {
    constructor() {
      super();
      this.getCurrentValues = this.getCurrentValues.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }

    getCurrentValues() {
        const { field } = this.props;
        const { value, initialValue } = field;

        let previousValues = [];
        if (!_.isUndefined(value) && value !== '') {
          previousValues = value;
        }
        else if (!_.isUndefined(initialValue) && initialValue !== '') {
          previousValues = initialValue;
        }

        const currentValues = _.isArray(previousValues) ? [...previousValues] : [previousValues];

        return currentValues;
    }

    handleChange(event, id) {
        const {field} = this.props;
        const {onChange} = field;
        const values = this.getCurrentValues();

        if (event.target.checked) {
          values.push(id);
        }
        else {
          values.splice(values.indexOf(id), 1);
        }
        return onChange(values);
    }

    render() {
        const {label, options, field, title, key } = this.props;
        const {onBlur} = field;
        const values = this.getCurrentValues();

        return (
          <div>
              {options.map(option => {
                  const isChecked = values.indexOf(option.product_option_value_id) > -1;
                  var additional_price  = '';
                  if(option.price > 0 ){
                    additional_price = (
                      (option.discount_text != undefined && option.discount_text != false )
                      ?
                      <span>
                        (<span className="price-new mr-1">{option.discount_text}</span>
                        <span className="price-old">{option.price_text}</span>)
                      </span>
                      :
                      <span>({option.price_text})</span>
                    )
                    /*additional_price = (
                      <span>
                      ( {
                          (option.discount_text != undefined && option.discount_text != false )
                          ?
                          option.discount_text
                          :
                          option.price_text
                        }
                      )
                      </span>
                    )*/
                  }
                  return (
                    <div className="before-checkbox" key={"product.option.value.checkbox."+option.product_option_id+"."+option.product_option_value_id}>
                      <label className="checkbox" >
                        <input
                          {...field}
                          type="checkbox"
                          onChange={event => this.handleChange(event, option.product_option_value_id)}
                          onBlur={() => onBlur(values)}
                          checked={isChecked}
                          value={option.product_option_value_id}
                        />
                        {htmlDecode(option.name)} {additional_price}
                      </label>
                    </div>
                  );
              })}
          </div>
        );
    }
}


export default MultiCheckboxField;
