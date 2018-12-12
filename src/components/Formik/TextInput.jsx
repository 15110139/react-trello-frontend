import React, { Component } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

class TextInput extends Component {
  defautProps = {
    field: {},
    form: {}
  };
  render() {
    const {
      title,
      field,
      form: { touched, errors },
      floatingLabel = true,
      ...rest
    } = this.props;
    const { name } = field;
    return (
      <FormControl
        margin="dense"
        error={touched[name] && !!errors[name]}
        {...rest}
      >
        {floatingLabel && <InputLabel htmlFor={name}>{title}</InputLabel>}
        <Input {...field} {...rest} />
        {touched[name] &&
          errors[name] && <FormHelperText>{errors[name]}</FormHelperText>}
      </FormControl>
    );
  }
}

export default TextInput;
