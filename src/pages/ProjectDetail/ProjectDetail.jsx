import React, { Component } from 'react';
import ProjectBoard from './components/ProjectBoard';
import projectDetailContainer from './projectDetailContainer';

class ProjectDetail extends Component {
  componentDidMount() {
    const { dispatchLoadProjectDetail, projectId } = this.props;
    console.log(projectId);
    dispatchLoadProjectDetail(projectId);
  }

  render() {
    const { listIds, projectId } = this.props;
    console.log(projectId);
    return (
      <div style={{ overflow: 'auto', minHeight: '90vh' }}>
        <ProjectBoard listIds={listIds} projectId={projectId} />
      </div>
    );
  }
}

export default projectDetailContainer(ProjectDetail);
