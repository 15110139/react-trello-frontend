import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import { noop } from 'lodash';

class ConfirmDialog extends React.Component {
  static defaultProps = {
    fullScreen: false
  };

  state = {
    open: false,
    title: '',
    content: '',
    buttons: []
  };

  componentDidMount() {
    const { onRef = noop } = this.props;
    onRef(this);
  }

  showDialog = async config => {
    const { title, content, buttons } = config;
    await this.setState({ title, content, buttons });
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { fullScreen } = this.props;
    const { title, content, open, buttons } = this.state;
    return (
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={this.handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          {buttons.map((button, index) => (
            <Button key={index} onClick={button.onClick} color="primary">
              {button.title}
            </Button>
          ))}
        </DialogActions>
      </Dialog>
    );
  }
}

export default withMobileDialog()(ConfirmDialog);
