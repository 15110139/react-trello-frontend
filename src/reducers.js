import { reducers as projectListReducers } from './pages/ProjectList';
import { reducers as signUpReducers } from './pages/SignUp';
import { reducers as projectDetailReducers } from './pages/ProjectDetail';
import { reducers as signInReducers } from './pages/SignIn';

import { combineReducers } from 'redux';

export default combineReducers({
  ...signInReducers,
  ...signUpReducers,
  ...projectListReducers,
  ...projectDetailReducers
});
