import { sagas as signInSagas } from './pages/SignIn';
import { sagas as signUpSagas } from './pages/SignUp';

export default [...signInSagas, ...signUpSagas];
