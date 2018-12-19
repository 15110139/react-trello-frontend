import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toJS } from 'utils/toJS';
import { get } from 'lodash';
import {
  createList,
  createTask,
  deleteList,
  loadProjectDetail,
  moveList,
  moveTask,
  resetProjectDetail
} from './actions';
import { actionSelector, errorSelector, listIdsSelector } from './selectors';

export default function projectDetailContainer(MyComponent) {
  class WrappedComponent extends Component {
    isLoading = () => loadProjectDetail.is(this.props.action);

    render() {
      return <MyComponent loading={this.isLoading()} {...this.props} />;
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
        dispatch(loadProjectDetail(projectId)),
      dispatchCreateList: list => dispatch(createList(list)),
      dispatchCreateTask: task => dispatch(createTask(task)),
      dispatchMoveTask: req => dispatch(moveTask(req)),
      dispatchMoveList: req => dispatch(moveList(req)),
      dispatchResetProjectDetail: () => dispatch(resetProjectDetail())
    };
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(toJS(WrappedComponent));
}
