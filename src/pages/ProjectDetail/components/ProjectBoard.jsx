import React from 'react';
import styled from 'styled-components';
import { Droppable, DragDropContext } from 'react-beautiful-dnd';
import { DndContext } from '../constants';
import List from './List';
import AddList from './AddList';
import { isArray, noop, compact, isEmpty } from 'lodash';
import './style.css';

const Container = styled.div`
  display: flex;
`;

class ProjectBoard extends React.Component {
  static defaultProps = {
    listIds: []
  };

  onTaskMove = (taskId, srcIndex, srcId, desId, desIndex) => {
    const { dispatchMoveTask = noop, projectId } = this.props;
    dispatchMoveTask({ projectId, taskId, srcId, desId, srcIndex, desIndex });
  };

  onListMove = (listId, srcIndex, desIndex) => {
    const { dispatchMoveList = noop, projectId } = this.props;
    dispatchMoveList({ projectId, listId, srcIndex, desIndex });
  };

  onDragEnd = result => {
    const { type } = result;
    switch (type) {
      case DndContext.LIST: {
        const { destination } = result;
        if (destination) {
          const {
            draggableId,
            source: { index: srcIndex },
            destination: { index: desIndex }
          } = result;
          this.onListMove(draggableId, srcIndex, desIndex);
        }
        break;
      }

      case DndContext.CARD: {
        const { destination } = result;
        if (destination) {
          const {
            draggableId,
            source: { index: srcIndex, droppableId: srcDropableId },
            destination: { index: desIndex, droppableId: desDropableId }
          } = result;
          this.onTaskMove(
            draggableId,
            srcIndex,
            srcDropableId,
            desDropableId,
            desIndex
          );
        }
        break;
      }
      default: {
        break;
      }
    }
  };

  render() {
    const { listIds, projectId, action } = this.props;
    return (
      <React.Fragment>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable
            droppableId="all-list"
            type={DndContext.LIST}
            direction="horizontal"
            onDragEnd={this.onDragEnd}
          >
            {(provided, snapshot) => (
              <React.Fragment>
                <Container
                  innerRef={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {isArray(listIds) &&
                    compact(listIds).map((listId, index) => (
                      <List
                        isDragging={snapshot.isDragging}
                        key={listId}
                        listId={listId}
                        projectId={projectId}
                        index={index}
                        action={action}
                      />
                    ))}
                  {provided.placeholder}
                  <AddList projectId={projectId} />
                </Container>
              </React.Fragment>
            )}
          </Droppable>
        </DragDropContext>
      </React.Fragment>
    );
  }
}

export default ProjectBoard;
