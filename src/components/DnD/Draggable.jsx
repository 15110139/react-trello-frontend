import { Draggable as ReactDraggable } from 'react-beautiful-dnd';
import React from 'react';

export default function Draggable(Component) {
  return class MyDraggable extends React.Component {
    render() {
      const { DraggableId } = this.props;
      return (
        <ReactDraggable DraggableId={DraggableId}>
          {provided => {
            const EnhancedComponent = React.cloneElement(
              Component,
              {
                innerRef: provided.innerRef,
                ...provided.DraggableProps
              },
              [provided.placeholder]
            );
            return <EnhancedComponent />;
          }}
        </ReactDraggable>
      );
    }
  };
}
