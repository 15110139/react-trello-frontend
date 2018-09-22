import { API_URL } from '../config';

class RestAPIClient {
  constructor(path) {
    this.path = path;
  }

  request(contextPath, method, payload) {
    const url = new URL(`${API_URL}/${this.path}/${contextPath}`);
    if (method === 'GET') Object.keys(payload).forEach(key => url.searchParams.append(key, payload[key]));
    let options = {
      method,
      headers :{
        'Content-Type': 'application/json'
      }
    };
    if (method === 'POST' || method === 'PUT') options['body'] = JSON.stringify(payload);
    return fetch(url, options)
  }

  get = (contextPath, params) => this.request(contextPath, 'GET', params);

  post = (contextPath, body) => this.request(contextPath, 'POST', body);

  put = (contextPath, body) => this.request(contextPath, 'PUT', body);

  delete = (contextPath) => this.request(contextPath, 'DELETE');
}

export default RestAPIClient;
