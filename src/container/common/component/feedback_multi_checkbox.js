import React, {Component, PropTypes} from 'react';
import { htmlDecode } from '../../spk_modules/library/function';
import _ from 'lodash';

class FeedbackMultiCheckboxField extends Component {
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
                const isChecked = values.indexOf(option.feedback_question_option_id) > -1;

                return (
                  <div className="mr-2" style={{ display: "inline-block" }} key={"feedback.option.value.checkbox."+option.feedback_question_id+"."+option.feedback_question_option_id}>
                    <label className="checkbox">
                      <input
                        {...field}
                        type="checkbox"
                        onChange={event => this.handleChange(event, option.feedback_question_option_id)}
                        onBlur={() => onBlur(values)}
                        checked={isChecked}
                        value={option.feedback_question_option_id}
                      />
                      {htmlDecode(option.name)}
                    </label>
                  </div>
                );
              })}
          </div>
        );
    }
}


export default FeedbackMultiCheckboxField;
