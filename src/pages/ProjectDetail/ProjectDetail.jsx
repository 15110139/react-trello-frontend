import React, { Component } from 'react';
import ProjectBoard from './components/ProjectBoard';

class ProjectDetail extends Component {
  render() {
    const { listIds, projectId } = this.props;
    return (
      <div>
        <ProjectBoard listIds={listIds} projectId={projectId} />
      </div>
    );
  }
}

export default ProjectDetail;
