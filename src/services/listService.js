import RestAPIClient from 'services/RestAPIClient';

class ListService extends RestAPIClient {
  constructor() {
    super('list');
  }

  //body: { name, projectId }
  createList = body => {
    return this.post('/createNewList', body);
  };
}

export const listService = new ListService();
