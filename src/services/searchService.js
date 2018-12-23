import RestAPIClient from 'services/RestAPIClient';
const querystring = require('querystring');

class SearchService extends RestAPIClient {
  constructor() {
    super('search');
  }

  searchUser = request => {
    return this.get(`/searchUser?${querystring.stringify(request)}`);
  };
}

export const searchService = new SearchService();
