import React, { Component } from 'react';
import styled from 'styled-components';
import Project from './components/Project';
import CreateProject from './components/CreateProject';
import SplashLoading from 'components/base/SplashLoading';
import { noop } from 'lodash';
import projectListContainer from './ProjectListContainer';

class ProjectList extends Component {
  static defaultProps = {
    createProject: noop,
    projects: [],
    loading: false
  };

  render() {
    const {
      projects,
      dispatchCreateProject,
      loading,
      dispatchDeleteProject,
      action
    } = this.props;
    if (loading) return <SplashLoading />;
    return (
      <React.Fragment>
        <Container>
          {projects.map((projectId, index) => (
            <Project
              key={projectId}
              projectId={projectId}
              dispatchDeleteProject={dispatchDeleteProject}
              index={index}
              action={action}
            />
          ))}
          {
            <CreateProject
              createProject={dispatchCreateProject}
              index={projects.length}
            />
          }
        </Container>
      </React.Fragment>
    );
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export default projectListContainer(ProjectList);
