import RestAPIClient from 'services/RestAPIClient';

class TaskService extends RestAPIClient {
  constructor() {
    super('task');
  }

  //body: { name, projectId, listId }
  createTask = body => {
    return this.post('/createNewTask', body);
  };
}

export const taskService = new TaskService();
