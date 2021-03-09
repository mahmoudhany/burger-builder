import React from 'react';
import './Order.css'

const Order = (props) => {
  const ingredientOutput = Object.keys(props.ingredients).map((key) => {
    return <span
      key={key}
      style={{
        textTransform: 'capitalize',
        display: 'inline-block',
        margin: '0 8px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '5px'
      }}
    >
      {key}: {props.ingredients[key]}
    </span>
  })
  return (
    <div className='Order'>
      <p>Ingredients: {ingredientOutput}</p>
      <p>Price: <strong>{props.price} USD</strong></p>
    </div>
  );
};

export default Order;
