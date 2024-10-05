import React, { Component } from 'react';
import Switch from "react-switch";

class ReactSwitch extends Component {

  constructor() {
    super();

    this.state = { checked: false };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked) {
    //console.log("asdsadf>>>>>>>>>", checked);
    this.setState({ checked });
  }

  render() {
    const { input } = this.props;

    //console.log("input>>>>>>>>>", input);

    //const checked = this.state.checked;

    return (
      <div>
        <Switch
          onChange={(event) => {
            this.handleChange(event)
            input.onChange(event);
          }}
          checked={input.checked}
        />
      </div>
    );
  }
}

export default ReactSwitch;
