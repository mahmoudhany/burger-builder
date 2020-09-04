import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

import './Burger.css';

const Burger = (props) => {
  let ingredients = Object.keys(props.ingredients).map(igkey => {
    return [...Array(props.ingredients[igkey])].map((_, i) => {
      return <BurgerIngredient key={igkey + i} type={igkey} />
    })
  }).reduce((acc, cur) => {
    return acc.concat(cur)
  }, [])
  if (ingredients.length === 0) {
    ingredients = <p>Please start adding ingredients</p>
  }
  return (
    <div className="Burger">
      <BurgerIngredient type='bread-top' />
      {ingredients}
      <BurgerIngredient type='bread-bottom' />
    </div>
  );
};

export default Burger;
