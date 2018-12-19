import React, { Component } from 'react';
import ProjectBoard from './components/ProjectBoard';
import projectDetailContainer from './projectDetailContainer';
import SplashLoading from 'components/base/SplashLoading';
import { noop } from 'lodash';

class ProjectDetail extends Component {
  static defaultProps = {
    listIds: [],
    dispatchMoveTask: noop,
    dispatchMoveList: noop,
    loading: false
  };

  componentDidMount() {
    const { dispatchLoadProjectDetail, projectId } = this.props;
    dispatchLoadProjectDetail(projectId);
  }

  render() {
    const {
      listIds,
      projectId,
      dispatchMoveTask,
      dispatchMoveList,
      loading,
      action
    } = this.props;
    if (loading) return <SplashLoading />;
    return (
      <div style={{ overflow: 'auto', minHeight: '90vh', margin: 10 }}>
        <ProjectBoard
          listIds={listIds}
          projectId={projectId}
          dispatchMoveTask={dispatchMoveTask}
          dispatchMoveList={dispatchMoveList}
          action={action}
        />
      </div>
    );
  }
}

export default projectDetailContainer(ProjectDetail);
