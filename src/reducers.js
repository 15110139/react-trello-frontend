import { reducers as projectListReducers } from './pages/ProjectList';
import { reducers as signUpReducers } from './pages/SignUp';
import { reducers as projectDetailReducers } from './pages/ProjectDetail';
import { reducers as signInReducers } from './pages/SignIn';
import { reducers as searchUserReducers } from './components/SearchUser';

import { combineReducers } from 'redux';

export default combineReducers({
  ...signInReducers,
  ...signUpReducers,
  ...projectListReducers,
  ...projectDetailReducers,
  ...searchUserReducers
});
