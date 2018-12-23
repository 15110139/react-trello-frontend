import { isEmpty, noop, get } from 'lodash';

class SnackbarManager {
  register = snackBar => {
    if (isEmpty(this.snackBar)) this.snackBar = snackBar;
  };

  show = config => {
    const { showSnackbar = noop } = get(this, 'snackBar', {});
    showSnackbar(config);
  };
}

export default new SnackbarManager();
