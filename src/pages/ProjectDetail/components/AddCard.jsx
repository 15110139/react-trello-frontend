import React, { Component } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button/Button';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { createTask, createTaskSuccess } from '../actions';
import projectDetailContainer from '../projectDetailContainer';
import { noop } from 'lodash';

class AddCard extends Component {
  static defaultProps = {
    dispatchCreateTask: noop
  };

  state = {
    toggle: false,
    task: ''
  };

  onChange = e => {
    this.setState({ task: e.target.value });
  };

  createTask = () => {
    const { task } = this.state;
    const { listId, projectId, dispatchCreateTask } = this.props;
    dispatchCreateTask({ name: task, listId, projectId });
  };

  isLoading = () => createTask.is(this.props.action);

  handleFormSubmit = e => {
    e.preventDefault();
    this.createTask();
  };

  handleClickAway = () => {
    this.setState({
      toggle: false,
      task: ''
    });
  };

  componentDidUpdate(prevProps) {
    if (this.props.action !== prevProps.action) {
      if (createTaskSuccess.is(this.props.action)) {
        if (this.state.toggle) this.toggleInput();
        this.setState({ task: '' });
      }
    }
  }

  toggleInput = () => {
    this.setState(prevState => ({ toggle: !prevState.toggle }));
  };

  renderForm = () => {
    const loading = this.isLoading();
    const { task } = this.state;
    return (
      <React.Fragment>
        <form
          onSubmit={this.handleFormSubmit}
          style={{
            display: 'flex',
            flexFlow: 'row wrap',
            alignItems: 'center'
          }}
        >
          <input
            type={'text'}
            autoFocus
            style={{
              fontSize: 14,
              paddingTop: 8,
              paddingBottom: 8,
              verticalAlign: 'middle'
            }}
            value={task}
            disabled={loading}
            onChange={this.onChange}
          />
          <Button
            color="primary"
            variant="contained"
            type={'submit'}
            disabled={loading || !task}
          >
            {loading ? <CircularProgress size={18} /> : '+'}
          </Button>
        </form>
      </React.Fragment>
    );
  };

  render() {
    const { toggle } = this.state;
    return !toggle ? (
      <Container onClick={this.toggleInput}>Add new task</Container>
    ) : (
      <ClickAwayListener onClickAway={this.handleClickAway}>
        <FormContainer>{this.renderForm()}</FormContainer>
      </ClickAwayListener>
    );
  }
}

const Container = styled.div`
  margin: 0 5px;
  padding: 10px 10px 10px 20px;
  background-color: #dfe3e6;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1), 0 1px 1px -1px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  &:hover {
    background-color: gainsboro;
  }
`;

const FormContainer = styled.div`
  width: 220px;
  display: inline-block;
  padding: 10px;
  margin: 0 5px;
  background-color: #dfe3e6;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1), 0 1px 1px -1px rgba(0, 0, 0, 0.1);
`;

export default projectDetailContainer(AddCard);
