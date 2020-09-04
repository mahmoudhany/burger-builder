import React from 'react';
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import './Toolbar.css'

const Toolbar = (props) => {
  return (
    <header className='Toolbar'>
      <button onClick={props.clicked}>
        <i className="fa fa-bars" aria-hidden="true"></i>
      </button>
      <div className='Toolbar-logo'>
        <Logo />
      </div>
      <nav className='DesktopOnly'>
        <NavigationItems />
      </nav>
    </header>
  );
};

export default Toolbar;
