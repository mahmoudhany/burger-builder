import React from 'react';
import './BuildControls.css';
import BuildControl from './BuildControl/BuildControl'

const BuildControls = (props) => {

  const controls = Object.keys(props.ingredients).map(item => ({
    label: item.charAt(0).toUpperCase() + item.slice(1),
    type: item
  }))

  return (
    <div className="BuildControls">
      <p>Total Price: <strong>{props.price}</strong></p>
      {controls.map((control) => (
        <BuildControl
          key={control.label}
          label={control.label}
          added={() => props.ingredientAdded(control.type)}
          removed={() => props.ingredientRemoved(control.type)}
          disabled={props.disabled[control.type]}
        />
      ))}
      <button
        className='OrderButton'
        disabled={!props.purchasable}
        onClick={props.ordered}
      >
        ORDER NOW
      </button>
    </div>
  );
};

export default BuildControls;
