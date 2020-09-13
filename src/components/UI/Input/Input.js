import React from 'react';
import './Input.css';

const Input = (props) => {
  let inputElement = null;
  const inputClassName = (props.inValid && props.shouldValidate && props.touched) ?
    'InputElement Invalid' : 'InputElement'
  switch (props.elementType) {
    case ('input'):
      inputElement = <input
        className={inputClassName}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed}
      />
      break;
    case ('textarea'):
      inputElement = <textarea
        className={inputClassName}
        {...props}
        value={props.value}
        onChange={props.changed}
      />
      break;
    case ('select'):
      inputElement = (
        <select
          className={inputClassName}
          value={props.value}
          onChange={props.changed}
        >
          <option value='deliveryMethod'>--Delivery Method</option>
          {
            props.elementConfig.options.map(option => (
              <option key={option.value} value={option.value}>{option.displayValue}</option>
            ))
          }
        </select >
      )
      break;
    default:
      inputElement = <input
        className='InputElement'
        {...props}
        value={props.value}
      />
      break;
  }

  return (
    <div className='Input'>
      <label className='Label'>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
