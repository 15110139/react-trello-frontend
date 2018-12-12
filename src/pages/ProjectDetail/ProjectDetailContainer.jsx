import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toJS } from 'utils/toJS';
import { get } from 'lodash';
import ProjectDetail from './ProjectDetail';
import { loadProjectDetail } from './actions';
import { actionSelector, errorSelector, listIdsSelector } from './selectors';

class ProjectDetailContainer extends Component {
  componentDidMount() {
    const { projectId, dispatchLoadProjectDetail } = this.props;
    dispatchLoadProjectDetail({ projectId });
  }

  render() {
    const { listIds, projectId } = this.props;
    return (
      <div>
        <ProjectDetail listIds={listIds} projectId={projectId} />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { projectId } = get(props, 'match.params', props);
  return {
    projectId,
    action: actionSelector(projectId)(state),
    error: errorSelector(projectId)(state),
    listIds: listIdsSelector(projectId)(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchLoadProjectDetail: projectId =>
      dispatch(loadProjectDetail(projectId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(ProjectDetailContainer));
