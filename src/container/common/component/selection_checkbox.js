import React, {Component, PropTypes} from 'react';
import _ from 'lodash';

class SelectionCheckbox extends Component {
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
        const { label, results, field, title, key, value_id, image_url } = this.props;
        //console.log("this.props>>>>>", this.props);
        const { onBlur } = field;
        const values = this.getCurrentValues();

        return (
          <div>
            {results.map((result, index) => {
              const isChecked = values.indexOf(result[value_id]+':'+result.name) > -1;
              return (
                <div className="item" key={"checkbox."+value_id+"."+index}>
                  <label className="scheckbox">
                    <div className="item-img-container">
                      {
                        (result.image != undefined && result.image)
                        ?
                        <img className="img-fluid" src={image_url+result.image} alt={result.name} />
                        :
                        <i className="fa fa-camera"></i>
                      }
                    </div>
                    <div className="item-title">
                      {result.name}
                    </div>
                    <input
                      {...field}
                      type="checkbox"
                      className=""
                      onChange={event => this.handleChange(event, result[value_id]+':'+result.name)}
                      onBlur={() => onBlur(values)}
                      checked={isChecked}
                      value={result[value_id]+':'+result.name}
                    />
                    <span className="checkmark"></span>
                  </label>
                </div>
              );
            })}
          </div>
        );
    }
}
export default SelectionCheckbox;
