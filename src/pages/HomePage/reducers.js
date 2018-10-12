import { reducers as signInReducers } from './pages/SignIn';
import { reducers as signUpReducers } from './pages/SignUp';

export default {
  ...signInReducers,
  ...signUpReducers
};
