import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';

class MyAutosuggest extends Component {

  constructor() {
    super();

    this.state = {
      suggesValue: '',
      suggestions: []
    };
    this.getSuggestionValue = this.getSuggestionValue.bind(this);
  }
  // https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
  escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  getSuggestions = (value, suggestions) => {
    const escapedValue = this.escapeRegexCharacters(value);

    if (escapedValue === '') {
      return [];
    }

    //const regex = new RegExp('^' + escapedValue, 'i');
    const regex = new RegExp(escapedValue, 'i');
    //console.log("getSuggestions suggestions>>>>>>>", suggestions);
    
    if(this.props.onSkipExpression !== undefined) {
      return suggestions;
    } else {
      return suggestions.filter(suggestion => regex.test(suggestion.name));
    }
  }

  renderSuggestion(suggestion) {
    return (
      <span>{suggestion.name}</span>
    );
  }

  getSuggestionValue(suggestion) {
    //console.log("suggestion>>>>>>", suggestion);
    if(this.props.value_id != undefined){
      this.state.suggesValue = suggestion[this.props.value_id].toString();
    } else {
      this.state.suggesValue = suggestion.name;
    }
    return suggestion.name;
  }

  onChange = (_, { newValue }) => {
    /*this.setState({
      suggesValue: newValue
    });*/
    //console.log("this.state>>>>>", this.state.suggesValue);
    const { id, onChange } = this.props;

    //console.log("suggestions >>>>>>>", this.state.suggestions);
    //console.log("this.state.suggesValue>>>>>>", this.state.suggesValue);
    //suggestion[this.props.value_id].toString()
    if(this.state.suggestions.length < 1){
      this.state.suggesValue = '';
    }
    onChange(id, newValue, this.state.suggesValue);
  };

  onSuggestionsFetchRequested = ({ value }) => {
    /*this.setState({
      suggestions: this.getSuggestions(value)
    });*/
    value = this.escapeRegexCharacters(value);
    if (value === '') {
      this.setState({
        suggestions: []
      });
    } else {
      var _this = this;
      this.props.onSuggestionsFetchRequested(value, function(err, result) {
        // console.log("autosuggest result>>>>>>", result);
        _this.setState({
          suggestions: _this.getSuggestions(value, result)
        });
      });
      //this.props.onSuggestionsFetchRequested(value);
      /*this.setState({
        suggestions: this.getSuggestions(value)
      });*/
    }
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    //console.log("this.props>>>>>", this.props);
    const { name, value, id, placeholder, value_id, onSuggestionSelected, onSkipExpression } = this.props;
    const { suggesValue, suggestions } = this.state;
    //console.log("suggestions>>>>>", suggestions);
    const inputProps = {
      name,
      placeholder,
      value,
      onChange: this.onChange,
      className: "form-control"
    };

    return (
      <Autosuggest
        id={id}
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
        onSuggestionSelected={onSuggestionSelected}
      />
    );
  }
}

export default MyAutosuggest;
