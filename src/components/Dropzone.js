import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import '../index.css'

const Dropzone = ({ isDropDisabled, PRODUCTS, id }) => (
  <div className="column col-2">
    <div className="divider" data-content={id.toUpperCase()} />
    <Droppable droppableId={id} isDropDisabled={isDropDisabled}>
      {provided => {
        return (
          <div className="menu product-list" {...provided.droppableProps} ref={provided.innerRef}>
            {PRODUCTS.map(({ name }, index) => (
              <Product key={name} name={name} index={index} />
            ))}
            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
  </div>
);

const Product = ({ name, index }) => (
  <Draggable key={name} draggableId={name} index={index}>
    {provided => {
      return (
        <div
          className="menu-item tile tile-centered"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <figure style={{ backgroundColor: 'transparent'}} className="avatar tile-icon">
            <img src={`./Product_icons/${name.toLowerCase().replace(' ', '-')}.svg`} alt={name} />
          </figure>
          <div className="tile-content">{name}</div>
        </div>
      );
    }}
  </Draggable>
);

export default Dropzone;
