import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteProject, loadProjects, resetProject } from './actions';
import { projectsSelector, actionSelector, errorSelector } from './selectors';
import { toJS } from 'utils/toJS';

export default function projectListContainer(MyComponent) {
  class ProjectListContainer extends Component {
    componentDidMount() {
      const { dispatchLoadProject } = this.props;
      dispatchLoadProject();
    }

    isLoading = () => loadProjects.is(this.props.action);

    render() {
      return <MyComponent {...this.props} loading={this.isLoading()} />;
    }
  }

  const mapStateToProps = state => {
    return {
      action: actionSelector(state),
      error: errorSelector(state),
      projects: projectsSelector(state)
    };
  };

  const mapDispatchToProps = dispatch => {
    return {
      dispatchLoadProject: req => dispatch(loadProjects(req)),
      dispatchResetProject: () => dispatch(resetProject()),
      dispatchDeleteProject: req => dispatch(deleteProject(req))
    };
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(toJS(ProjectListContainer));
}
