import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0
  }
  componentWillMount() {
    if (this.props.location.state) {
      const { ingredients, totalPrice } = this.props.location.state
      this.setState({
        ingredients,
        totalPrice: totalPrice
      })
    } else {
      // this.props.history.goBack()
    }
  }
  checkoutContinued = () => {
    this.props.history.replace('/checkout/contact-data')
  }
  checkoutCancelled = () => {
    this.props.history.goBack()
  }
  render() {
    const checkoutContent = (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutContinued={this.checkoutContinued}
          checkoutCancelled={this.checkoutCancelled}
        />
        <Route
          path={`${this.props.match.path}/contact-data`}
          render={
            (props) =>
              <ContactData
                ingredients={this.state.ingredients}
                totalPrice={this.state.totalPrice}
                {...props}
              />
          }
        />
      </div>
    )
    return (
      < div >
        {
          this.state.ingredients ?
            checkoutContent :
            <h1 style={{ textAlign: 'center' }}>Please go back to burger builder to create your favourite burger :D</h1>
        }
      </div >
    );
  }
}

export default Checkout;
