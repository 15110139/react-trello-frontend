import { reducers as homePageReducers } from './pages/HomePage';
import { combineReducers } from 'redux';

export default combineReducers({
  ...homePageReducers
});
