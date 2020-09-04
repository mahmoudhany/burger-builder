import React, { Component } from 'react';
import Aux from '../../../hoc/Aux'
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(key => {
      const capitlizedKey = key.charAt(0).toUpperCase() + key.slice(1)
      return (
        <li key={key}>
          <span>{capitlizedKey}: {this.props.ingredients[key]}</span>
        </li>)
    })
    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A Burger with the following ingredients</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p>Continue to checkout ?</p>
        <p><strong>Total Price: {this.props.totalPrice}</strong></p>
        <Button btnType='Danger' clicked={this.props.modalClosed}>CANCEL</Button>
        <Button btnType='Success' clicked={this.props.purchaseContinue}>CONTINUE</Button>
      </Aux >
    )
  }
}

export default OrderSummary;
