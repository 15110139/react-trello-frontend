import { Droppable, Draggable } from 'react-beautiful-dnd';
import React from 'react';
import Task from './Task';
import { DndContext } from '../constants';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { toJS } from 'utils/toJS';
import { listDataSelector } from '../selectors';
import AddCard from './AddCard';
import { isArray, get, compact } from 'lodash';
class List extends React.Component {
  render() {
    const { projectId } = this.props;
    const { _id, name, tasks } = get(this.props, 'listData', {});
    return (
      <Draggable
        type={DndContext.LIST}
        draggableId={_id}
        index={this.props.index}
      >
        {(provided, snapshot) => {
          return (
            <Container
              innerRef={provided.innerRef}
              {...provided.draggableProps}
            >
              <Title {...provided.dragHandleProps}>{name}</Title>
              <Droppable droppableId={_id} type={DndContext.CARD}>
                {(provided, snapshot) => {
                  return (
                    <CardList
                      innerRef={provided.innerRef}
                      {...provided.droppableProps}
                      isDraggingOver={snapshot.isDraggingOver}
                    >
                      {isArray(tasks) &&
                        compact(tasks).map((id, index) => {
                          return (
                            <Task
                              key={id}
                              taskId={id}
                              projectId={projectId}
                              index={index}
                            />
                          );
                        })}
                      {provided.placeholder}
                    </CardList>
                  );
                }}
              </Droppable>
              <AddCard listId={_id} projectId={projectId} />
            </Container>
          );
        }}
      </Draggable>
    );
  }
}

export const Title = styled.div`
  background-color: #dfe3e6;
  padding: 10px 10px 0 20px;
  margin: 5px 5px 0 5px;
  font-weight: bold;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1), 0 1px 1px 0 rgba(0, 0, 0, 0.1);
`;

const Container = styled.div``;

export const CardList = styled.div`
  background-color: #dfe3e6;
  width: 220px;
  padding: 10px;
  margin: 5px;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1), 0 1px 1px 0 rgba(0, 0, 0, 0.1),
    0 1px 1px -1px rgba(0, 0, 0, 0.1);
  user-select: none;
  &:first-child {
    margin-top: 0;

  },
  &:nth-child(2) {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    
  },
`;

const mapStateToProps = (state, props) => {
  const { listId, projectId } = props;
  return {
    listData: listDataSelector({ projectId, listId })(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(List));
