import React, { Component } from 'react';
import Navbar from './components/Navbar';
import styled from 'styled-components';
import Project from './components/Project';
import CreateProject from './components/CreateProject';

export default class ProjectList extends Component {
  render() {
    const { projects, createProject } = this.props;
    return (
      <Container>
        {projects.map(projectId => (
          <Project key={projectId} projectId={projectId} />
        ))}
        <CreateProject createProject={createProject} />
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
