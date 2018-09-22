import React from 'react'
import styled from 'styled-components'
import { Droppable, DragDropContext } from 'react-beautiful-dnd'
import List from './component/List'

const Container = styled.div`
  min-width: 100vw;
  display: inline-flex;
  overflow: scroll;
  height: 100%;
`

const getBoardStyle = isDraggingOver => ({
  display: 'inline-flex',
})

class Board extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [
        {
          id: 1,
          title: 'List 1',
          cards: [
            {
              id: 1,
              title: 'Card 1'
            }
          ]
        }
      ],
    }
    this.onDragEnd = this.onDragEnd.bind(this)
  }
  moveCard(cardId, cardIndex, sourceId, desId, desIndex) {

  }
  moveList(listId, listIndex, destination) {

  }
  indexFromId(array, id) {

  }
  onDragEnd(result) {

  }


  render() {
    return (
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Container>
            <Droppable droppableId="droppable" type="LIST" direction="horizontal">
              {(provided, snapshot) => (
                <div ref={provided.innerRef} style={getBoardStyle(snapshot.isDraggingOver)}>
                  {this.state.list.map((item, index) => (
                    <List
                      key={item.id}
                      id={item.id}
                      title={item.title}
                      cards={item.cards}
                    />
                  ))}
                  {provided.placeholder}
                  <div
                    style={{
                      display: 'block',
                      width: 250,
                      height: 200,
                      background: 'pink',
                      margin: 8,
                      borderRadius: 10,
                      boxShadow: '1px 1px 3px #424242',
                    }}
                  >
                    <form
                      onSubmit={e => {
                        e.preventDefault()
                        this.props.onAddLane(this.props.id, this.state.laneName)
                        this.setState({ laneName: '' })
                      }}
                    >
                      <input
                        style={{ width: '90%', marginTop: 35, height: 57,marginLeft: 10 }}
                        type="text"
                        className="form-control"
                        placeholder="Enter list name"
                        value={this.state.laneName}
                        onChange={e => this.setState({ laneName: e.target.value })}
                      />
                      <button
                        type="submit"
                        disabled={!this.state.laneName}
                        style={{ width: '90%', height: 55, marginTop: 20 }}
                        className="btn"
                      >
                        {' '}
                        <span style={{ fontSize: 30 }} className="glyphicon glyphicon-plus" />{' '}
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </Droppable>
          </Container>
        </DragDropContext>
    )
  }
}

export default Board
