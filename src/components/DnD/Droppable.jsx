import { Droppable as ReactDroppable } from 'react-beautiful-dnd';
import React from 'react';

export default function Droppable(Component) {
  return class MyDroppable extends React.Component {
    render() {
      const { droppableId } = this.props;
      return (
        <ReactDroppable droppableId={droppableId}>
          {provided => {
            const EnhancedComponent = React.cloneElement(Component, {
              innerRef: provided.innerRef,
              ...provided.droppableProps
            }, [provided.placeholder])
            return (<EnhancedComponent/>)}
        }
        </ReactDroppable>
      );
    }
  }
}
