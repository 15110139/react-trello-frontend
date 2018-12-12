import { API_URL } from '../configs/constants';
import storage from 'utils/storage';
import { push } from 'connected-react-router';

class RestAPIClient {
  constructor(path) {
    this.path = path;
  }

  async request(contextPath, method, payload = {}) {
    try {
      const url = new URL(`${API_URL}/${this.path}${contextPath}`);
      if (method === 'GET')
        Object.keys(payload).forEach(key =>
          url.searchParams.append(key, payload[key])
        );
      console.log(storage.get('USER_CREDENTIAL').token);
      let options = {
        method,
        headers: {
          'access-token': storage.get('USER_CREDENTIAL').token,
          'Content-Type': 'application/json'
        }
      };
      if (method === 'POST' || method === 'PUT')
        options['body'] = JSON.stringify(payload);
      const res = await fetch(url, options);

      if (res.status > 200) {
        const json = await res.json();
        if (json.status === 'INVALID_TOKEN')
          import('../store').then(({ store }) => {
            storage.set('USER_CREDENTIAL', {});
            store.dispatch(push('/home/sign-in'));
          });
        throw json;
      }
      return await res.json();
    } catch (err) {
      /*eslint-disable */
      if (err.toString().includes('Failed to fetch'))
        throw {
          status: 'UNKNOWN_ERROR'
        };
      else throw err;
      /*eslint-enable */
    }
  }

  get = (contextPath, params) => this.request(contextPath, 'GET', params);

  post = (contextPath, body) => this.request(contextPath, 'POST', body);

  put = (contextPath, body) => this.request(contextPath, 'PUT', body);

  delete = contextPath => this.request(contextPath, 'DELETE');
}

export default RestAPIClient;
