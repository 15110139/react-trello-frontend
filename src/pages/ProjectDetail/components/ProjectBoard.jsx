import React from 'react';
import styled from 'styled-components';
import { Droppable, DragDropContext } from 'react-beautiful-dnd';
import { DndContext } from '../constants';
import List from './List';

const Container = styled.div`
  display: flex;
`;

class ProjectBoard extends React.Component {
  static defaultProps = {
    listIds: []
  };

  onTaskMove = (taskId, taskIndex, sourceId, desId, desIndex) => {
    console.log(taskId, 'taskId');
    console.log(taskIndex, 'taskIndex');
    console.log(sourceId, 'sourceId');
    console.log(desId, 'desId');
    console.log(desIndex, 'desIndex');
  };

  onListMove = (listId, listIndex, destination) => {
    console.log(listId, 'listId');
    console.log(listIndex, 'listIndex');
    console.log(destination, 'desination');
  };

  indexFromId(array, id) {}
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
        console.log(result.source);
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
    const { listIds, projectId } = this.props;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable
          droppableId="all-list"
          type={DndContext.LIST}
          direction="horizontal"
          onDragEnd={this.onDragEnd}
        >
          {(provided, snapshot) => (
            <Container
              innerRef={provided.innerRef}
              {...provided.droppableProps}
            >
              {listIds.map((listId, index) => (
                <List
                  key={listId}
                  listId={listId}
                  projectId={projectId}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </Container>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

export default ProjectBoard;
