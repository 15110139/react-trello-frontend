import RestAPIClient from 'services/RestAPIClient';

class ProjectService extends RestAPIClient {
  constructor() {
    super('project');
  }

  getAllProject = () => {
    return this.get();
  };
}

export const projectService = new ProjectService();
