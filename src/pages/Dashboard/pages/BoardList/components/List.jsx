import { Droppable, Draggable } from 'react-beautiful-dnd'
import React from 'react'
import Card from './Card'
import { DndContext } from '../constants';

const getListStyle = (isDraggingOver, isDragging) => ({
  background: 'pink',
  padding: 8,
  margin: 8,
  width: 300,
  borderRadius: '10px',
  boxShadow: '1px 1px 3px #424242',
})

const ListCard = ({cards}) => {
    const list = Array.from(cards).map((card) => <Card  key={card.id} title={card.title} id={card.id} />)
    return <div>{list}</div>
}

class List extends React.Component {

  onCreateCard = () => {};

  render() {
    const { id, title } = this.props;
    return (
      <Draggable key={id} draggableId={id} type={DndContext.LIST}>
        {(provided, snapshot) => (
          <div>
            <div ref={provided.innerRef} style={provided.draggableStyle} {...provided.dragHandleProps}>
              <Droppable droppableId={id} type={DndContext.CARD}>
                {(provided, snapshot) => (
                  <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver, snapshot.isDragging)}>
                    <b style={{ fontSize: 22 }}>{title}</b>
                    <br />
                    <ListCard cards={[]}/>
                    {provided.placeholder}
                    <div>
                      <form onSubmit={this.onCreateCard}>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter card name"
                        />
                        <button type="submit" className="btn">
                          {' '}
                          <span className="glyphicon glyphicon-plus" />{' '}
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </Droppable>
            </div>
            {provided.placeholder}
          </div>
        )}
      </Draggable>
    )
  }
}

export default List
