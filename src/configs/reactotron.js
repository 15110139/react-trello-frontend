import Reactotron, { openInEditor } from 'reactotron-react-js';
import { reactotronRedux } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';
import apisaucePlugin from 'reactotron-apisauce';

const reactotron = Reactotron.configure()
  // .use(openInEditor())
  .use(sagaPlugin())
  .use(apisaucePlugin({}))
  .use(reactotronRedux())
  .connect();
export default reactotron;
