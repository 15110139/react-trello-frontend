import App from './App';
import { routes as homePageRoutes } from './pages/HomePage'

const routes = [
  {
    component: App,
    routes: [
      homePageRoutes
    ]
  }
];

export default routes;
