import React, { Component } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

class FormInput extends Component {
  render() {
    const { placeholder, error } = this.props;
    return (
      <FormControl margin="normal" fullWidth>
        <InputLabel htmlFor="email">{placeholder}</InputLabel>
        <Input id="email" name="email" autoComplete="email" autoFocus />
        <FormHelperText>{error}</FormHelperText>
      </FormControl>
    );
  }
}

export default FormInput;
