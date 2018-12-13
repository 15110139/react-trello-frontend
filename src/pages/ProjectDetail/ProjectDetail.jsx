import React, { Component } from 'react';
import ProjectBoard from './components/ProjectBoard';
import projectDetailContainer from './projectDetailContainer';

class ProjectDetail extends Component {
  componentDidMount() {
    const { dispatchLoadProjectDetail, projectId } = this.props;
    dispatchLoadProjectDetail(projectId);
  }

  render() {
    const {
      listIds,
      projectId,
      dispatchMoveTask,
      dispatchMoveList
    } = this.props;
    return (
      <div style={{ overflow: 'auto', minHeight: '90vh', margin: 10 }}>
        <ProjectBoard
          listIds={listIds}
          projectId={projectId}
          dispatchMoveTask={dispatchMoveTask}
          dispatchMoveList={dispatchMoveList}
        />
      </div>
    );
  }
}

export default projectDetailContainer(ProjectDetail);
