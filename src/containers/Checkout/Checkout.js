import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

class Checkout extends Component {

  componentWillMount() {
    // if (this.props.location.state) {
    //   const { ingredients, totalPrice } = this.props.location.state
    //   this.setState({
    //     ingredients,
    //     totalPrice: totalPrice
    //   })
    // } else {
    //   // this.props.history.goBack()
    // }
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
          ingredients={this.props.ings}
          checkoutContinued={this.checkoutContinued}
          checkoutCancelled={this.checkoutCancelled}
        />
        <Route path={`${this.props.match.path}/contact-data`} component={ContactData} />
      </div>
    )
    return (
      < div >
        {
          this.props.ings ?
            checkoutContent :
            <h1 style={{ textAlign: 'center' }}>Please go back to burger builder to create your favourite burger :D</h1>
        }
      </div >
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ings: state.ingredients,
    totalPrice: state.totalPrice
  }
}


export default connect(mapStateToProps)(Checkout);
