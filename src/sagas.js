import { sagas as signInSagas } from './pages/SignIn';
import { sagas as signUpSagas } from './pages/SignUp';
import { sagas as projectListSagas } from './pages/ProjectList';
import { sagas as projectDetailSagas } from './pages/ProjectDetail';
import { sagas as searchUserSagas } from './components/SearchUser';

export default [
  ...signInSagas,
  ...signUpSagas,
  ...projectListSagas,
  ...projectDetailSagas,
  ...searchUserSagas
];
