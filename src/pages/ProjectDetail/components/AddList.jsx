import React, { Component } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import projectDetailContainer from '../projectDetailContainer';
import { createList, createListSuccess } from '../actions';
import CircularProgress from '@material-ui/core/CircularProgress';
import ClickAwayListener from '@material-ui/core/ClickAwayListener/ClickAwayListener';

class AddList extends Component {
  state = {
    list: ''
  };

  handleClickAway = () => {
    // if (this.state.list) this.createList();
  };

  onChange = e => {
    this.setState({ list: e.target.value });
  };

  isLoading = () => createList.is(this.props.action);

  createList = () => {
    const { dispatchCreateList, projectId } = this.props;
    const { list } = this.state;
    dispatchCreateList({ name: list, projectId });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    this.createList();
  };

  componentDidUpdate(prevProps) {
    if (this.props.action !== prevProps.action) {
      if (createListSuccess.is(this.props.action)) {
        this.setState({ list: '' });
      }
    }
  }

  render() {
    const { list } = this.state;
    const loading = this.isLoading();
    return (
      <ClickAwayListener onClickAway={this.handleClickAway}>
        <Container>
          <form
            onSubmit={this.handleFormSubmit}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <input
              placeholder={'Add new list'}
              type={'text'}
              style={{
                fontSize: 14,
                paddingTop: 8,
                paddingBottom: 8
              }}
              value={list}
              disabled={loading}
              onChange={this.onChange}
            />
            <Button
              color="primary"
              variant="contained"
              type={'submit'}
              disabled={loading || !list}
            >
              {loading ? <CircularProgress size={18} /> : '+'}
            </Button>
          </form>
        </Container>
      </ClickAwayListener>
    );
  }
}

const Container = styled.div`
  display: inline;
  background-color: #dfe3e6;
  min-width: 220px;
  height: 38px;
  padding: 10px;
  margin: 5px;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1), 0 1px 1px 0 rgba(0, 0, 0, 0.1),
    0 1px 1px -1px rgba(0, 0, 0, 0.1);
  user-select: none;
`;

export default projectDetailContainer(AddList);
