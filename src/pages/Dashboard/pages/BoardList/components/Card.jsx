import { Draggable } from 'react-beautiful-dnd';
import React from 'react';
import { DndContext } from '../constants';
const grid = 8;

const getItemStyle = (draggableStyle, isDragging) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  boxShadow: '1px 1px 2px grey',
  // change background colour if dragging
  background: isDragging ? '#31d600' : 'white',

  // styles we need to apply on draggables
  ...draggableStyle
});

class Card extends React.Component {
  onCardClick = event => {};

  render() {
    const { title, id } = this.props;
    return (
      <Draggable key={id} draggableId={id} type={DndContext.CARD}>
        {(provided, snapshot) => (
          <div onClick={this.onCardClick}>
            <div
              ref={provided.innerRef}
              style={getItemStyle(provided.draggableStyle, snapshot.isDragging)}
              {...provided.dragHandleProps}
            >
              {title}
            </div>
            {provided.placeholder}
          </div>
        )}
      </Draggable>
    );
  }
}

export default Card;
