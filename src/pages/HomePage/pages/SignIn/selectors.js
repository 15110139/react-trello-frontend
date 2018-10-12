import { createSelectorsA } from 'utils/redux';
import { context } from './constants';
const [actionSelector, errorSelector] = createSelectorsA(context, [
  'action',
  'error'
]);

export { actionSelector, errorSelector };
