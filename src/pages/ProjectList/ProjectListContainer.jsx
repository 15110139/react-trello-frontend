import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadProjects, resetProject } from './actions';
import ProjectList from './ProjectList';
import { projectsSelector, actionSelector, errorSelector } from './selectors';
import { toJS } from 'utils/toJS';

class ProjectListContainer extends Component {
  componentDidMount() {
    const { dispatchLoadProject } = this.props;
    dispatchLoadProject();
  }

  componentWillUnmount() {
    this.props.dispatchResetProject();
  }

  render() {
    const { projects, action } = this.props;
    return <ProjectList projects={projects} action={action} />;
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
    dispatchResetProject: () => dispatch(resetProject())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(ProjectListContainer));
