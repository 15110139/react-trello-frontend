import { isEmpty, get, noop } from 'lodash';

class ConfirmDialogManager {
  register = dialog => {
    if (isEmpty(this.dialog)) this.dialog = dialog;
  };

  show = config => {
    const showDialog = get(this, 'dialog.showDialog', noop);
    showDialog(config);
  };

  close = () => {
    const handleClose = get(this, 'dialog.handleClose', noop);
    handleClose();
  };
}

export default new ConfirmDialogManager();
