import React from 'react';
import { default as MaterialSnackbar } from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import themeVariables from '../../theme';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import WarningIcon from '@material-ui/icons/Warning';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';

const backgroundColorMap = {
  error: themeVariables.palette.error.dark,
  success: green[600],
  info: themeVariables.palette.primary.dark,
  warning: amber[700]
};

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

class Snackbar extends React.Component {
  state = {
    open: false,
    variant: 'default',
    message: ''
  };

  showSnackbar = async config => {
    try {
      const { message = '', variant } = config;
      await this.setState({ message, variant });
      this.setState({ open: true });
    } catch (err) {}
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { message } = this.state;
    return (
      <MaterialSnackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={this.state.open}
        autoHideDuration={3000}
        onClose={this.handleClose}
        ContentProps={{
          'aria-describedby': 'message-id'
        }}
        message={<span id="message-id">{message}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            styles={{ padding: 3 }}
            onClick={this.handleClose}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
    );
  }
}

export default Snackbar;
