import React, { Component } from 'react';
import Navbar from './components/Navbar';
import styled from 'styled-components';
import Project from './components/Project';
import AddProject from './components/AddProject';

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Container>
          <Project />
          <Project />
          <Project />
          <Project />
          <Project />
          <Project />
          <Project />
          <AddProject />
        </Container>
      </div>
    );
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
