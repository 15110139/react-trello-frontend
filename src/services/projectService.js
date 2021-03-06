import RestAPIClient from 'services/RestAPIClient';

class ProjectService extends RestAPIClient {
  constructor() {
    super('project');
  }

  getAllProject = () => {
    return this.get('/getListProjectByUser');
  };

  createProject = project => {
    return this.post('/createNewProjectByUser', project);
  };

  getProjectDetail = projectId => {
    return this.get(`/getListAndTaskByProjectId/${projectId}`);
  };

  deleteProject = projectId => {
    return this.delete(`/removeProject/${projectId}`);
  };

  addMember = body => {
    return this.put(`/addMember`, body);
  };
}

export const projectService = new ProjectService();
