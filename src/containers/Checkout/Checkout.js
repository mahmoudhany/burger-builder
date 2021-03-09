import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

class Checkout extends Component {
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
          ingredients={this.props.ings}
          checkoutContinued={this.checkoutContinued}
          checkoutCancelled={this.checkoutCancelled}
        />
        <Route path={`${this.props.match.path}/contact-data`} component={ContactData} />
      </div>
    )
    return (
      < div >
        {this.props.ings ? checkoutContent : <Redirect to='/' />}
      </div >
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice
  }
}


export default connect(mapStateToProps)(Checkout);
