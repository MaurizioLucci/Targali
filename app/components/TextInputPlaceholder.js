import React, { Component } from "react";
import { TextInput } from 'react-native';

class TextInputPlaceholder extends Component {
  constructor() {
    super();
    this.state = { placeholder: this.props.text.length == 0 }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(ev) {
    this.setState({ placeholder: ev.nativeEvent.text.length == 0 });
    this.props.onChange && this.props.onChange(ev);
  }
  render() {
    const { placeholderStyle, style, onChange, ...rest } = this.props;

    return <TextInput
      {...rest}
      onChange={this.handleChange}
      style={this.state.placeholder ? [style, placeholderStyle] : style}
      />
  }
}

export default TextInputPlaceholder
