import React, {Component, PropTypes} from 'react';
import { PermissionCheckbox as SubPermissionCheckbox } from '../../common/component';
import _ from 'lodash';

class PermissionCheckbox extends Component {
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

    handleChange(event, id, result) {
      const {field} = this.props;
      const {onChange} = field;
      const values = this.getCurrentValues();
      var value_id = this.props.value_id;

      if (event.target.checked) {
        if(result['sub_menu'] && result['sub_menu'].length > 0){
          result['sub_menu'].map((item) => {
            values.push(item[value_id]);
          });
        }
        values.push(id);
      } else {
        if(result['sub_menu'] && result['sub_menu'].length > 0){
          result['sub_menu'].map((item) => {
            values.splice(values.indexOf(item[value_id]), 1);
          });
        }
        values.splice(values.indexOf(id), 1);
      }

      return onChange(values);
    }

    render() {
        const { label, results, field, title, key, value_id } = this.props;
        const { onBlur } = field;
        const values = this.getCurrentValues();


        return (
          <div>
            {results.map(result => {
              const isChecked = values.indexOf(result[value_id]) > -1;
  
              return (
                <div className="form-check mt-2" key={"checkbox."+value_id+"."+result[value_id]}>
                  <label className="form-check-label">
                    <input
                      {...field}
                      type="checkbox"
                      className="form-check-input mr-2"
                      onChange={(e) => {
                        this.handleChange(e, result[value_id], result)
                      }}
                      onBlur={() => onBlur(values)}
                      checked={isChecked}
                      value={result[value_id]}
                    />
                    {result.name}
                    {
                      (result['sub_menu'] != undefined && result['sub_menu'].length > 0)
                      ?
                      <SubPermissionCheckbox results={result['sub_menu']} value_id={value_id} field={field} />
                      :
                      null
                    }
                  </label>

                </div>
              );
            })}
          </div>
        );
    }
}
export default PermissionCheckbox;
