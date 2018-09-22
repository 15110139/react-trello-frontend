import HomePage from './HomePage';
import { routes as signInRoutes } from './pages/SignIn';
import { routes as signUpRoutes } from './pages/SignUp';

export default {
  path: '',
  exact: true,
  component: HomePage,
  routes: [
    signInRoutes,
    signUpRoutes
  ]
}
