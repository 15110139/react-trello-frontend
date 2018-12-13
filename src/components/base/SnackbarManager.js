import { isEmpty } from 'lodash';

class SnackbarManager {
  register = snackBar => {
    if (isEmpty(this.snackBar)) this.snackBar = snackBar;
  };

  show = config => {
    this.snackBar.showSnackbar(config);
  };
}

export default new SnackbarManager();
