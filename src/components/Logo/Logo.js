import React from 'react';
import BurgerLogo from '../../assets/images/burger-logo.png'
import './Logo.css'

const Logo = () => {
  return (
    <div className='Logo'>
      <img src={BurgerLogo} alt="Logo" />
    </div>
  );
};

export default Logo;
