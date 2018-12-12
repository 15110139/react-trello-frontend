import { Draggable } from 'react-beautiful-dnd';
import React from 'react';
import { DndContext } from '../constants';
import styled from 'styled-components';
import { taskDataSelector } from '../selectors';
import { connect } from 'react-redux';
import { toJS } from 'utils/toJS';

class Task extends React.PureComponent {
  render() {
    const {
      taskData: { _id, name },
      index
    } = this.props;
    return (
      <Draggable index={index} draggableId={_id} type={DndContext.CARD}>
        {(provided, snapshot) => (
          <Container
            innerRef={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {name}
          </Container>
        )}
      </Draggable>
    );
  }
}

const Container = styled.div`
  width: 200px;
  padding: 10px;
  margin: 10px 0;
  background-color: white;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1), 0 1px 1px 0 rgba(0, 0, 0, 0.1),
    0 1px 1px -1px rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  &:first-child {
    margin-top: 0;
  }
  ,
  &:last-child {
    margin-bottom: 0;
  }
  &:hover {
    background-color: ghostwhite;
  }
`;

const mapStateToProps = (state, props) => {
  const { taskId, projectId } = props;
  return {
    taskData: taskDataSelector({ projectId, taskId })(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(Task));
