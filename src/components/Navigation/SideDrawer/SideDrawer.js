import React from 'react';
import Logo from '../../Logo/Logo'
import Aux from '../../../hoc/Aux'
import NavigationItems from '../NavigationItems/NavigationItems'
import Backdrop from '../../UI/Backdrop/Backdrop'
import './SideDrawer.css'

const SideDrawer = (props) => {
  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={`SideDrawer ${props.open ? 'Open' : 'Close'}`} >
        <div className='SideDrawer-logo'>
          <Logo />
        </div>
        <nav onClick={props.closed}>
          <NavigationItems isAuthenticated={props.isAuthenticated} />
        </nav>
      </div>
    </Aux >
  );
};

export default SideDrawer;
