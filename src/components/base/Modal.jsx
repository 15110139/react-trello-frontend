import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { noop } from 'lodash';
import withMobileDialog from '@material-ui/core/withMobileDialog';

class Modal extends React.Component {
  static defaultProps = {
    show: false,
    handleClose: noop,
    actions: [],
    title: ''
  };

  render() {
    const {
      show = false,
      actions,
      title = '',
      content = null,
      handleClose = noop,
      ...rest
    } = this.props;
    return (
      <Dialog
        open={show}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        {...rest}
      >
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        {content}
        {actions && <DialogActions>{actions}</DialogActions>}
      </Dialog>
    );
  }
}

export default withMobileDialog()(Modal);
