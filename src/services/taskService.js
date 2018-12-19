import RestAPIClient from 'services/RestAPIClient';

class TaskService extends RestAPIClient {
  constructor() {
    super('task');
  }

  // body: { name, projectId, listId }
  createTask = body => {
    return this.post('/createNewTask', body);
  };

  // body: { taskId, listId, position }
  moveTask = body => {
    return this.put('/moveTask', body);
  };

  deleteTask = taskId => {
    return this.delete(`/removeTask/${taskId}`);
  };
}

export const taskService = new TaskService();
