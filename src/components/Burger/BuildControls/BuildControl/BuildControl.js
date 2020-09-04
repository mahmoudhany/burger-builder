import React from 'react';
import './BuildControl.css';

const BuildControl = (props) => {
  // const { label } = props.label
  return (
    <div className='BuildControl'>
      <button className="Less" onClick={props.removed} disabled={props.disabled}>-</button>
      <div className='Label'>{props.label}</div>
      <button className="More" onClick={props.added}>+</button>
    </div>
  );
};

export default BuildControl;
