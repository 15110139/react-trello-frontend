import RestAPIClient from 'services/RestAPIClient';

class ListService extends RestAPIClient {
  constructor() {
    super('list');
  }

  //body: { name, projectId }
  createList = body => {
    return this.post('/createNewList', body);
  };

  moveList = body => {
    return this.put('/moveList', body);
  };

  deleteList = listId => {
    return this.delete(`/removeList/${listId}`);
  };
}

export const listService = new ListService();
