import React from 'react';
import './NavigationItem.css'
import { NavLink } from 'react-router-dom';

const NavigationItem = (props) => {
  return (
    <li className='NavigationItem'>
      <NavLink exact
        to={props.link}
        activeClassName='active'
      >
        {props.children}
      </NavLink>
    </li>
  );
};

export default NavigationItem;
