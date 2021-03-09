import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from '../../Redux/Actions/'

import Axios from '../../AxiosOrders'
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'
// import { act } from 'react-dom/test-utils';


class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  }
  componentDidMount() {
    this.props.onInitIngredients()
  }
  // update Purchase State
  updatePurchaseState = (ingredients) => {
    const sumIngredients = Object.values(ingredients).reduce((prev, cur) => {
      return prev + cur
    }, 0)

    return sumIngredients > 0
  }
  // purchase Handler
  purchaseHandler = () => {
    if (this.props.isAuth) {
      this.setState({
        purchasing: true
      })
    } else {
      this.props.setAuthRedirectPath('/checkout')
      this.props.history.push('/auth')
    }
  }
  //modalClosed
  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false
    })
  }
  purchaseContinueHandler = () => {
    this.props.history.push('/checkout')
  }
  render() {
    const disabledInfo = {
      ...this.props.ings
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null

    let burger = this.props.error ? <p>Can't load ingredients</p> : <Spinner />
    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />

          <BuildControls
            ingredients={this.props.ings}
            ingredientAdded={this.props.onAddIngredients}
            ingredientRemoved={this.props.onRemoveIngredients}
            disabled={disabledInfo}
            price={(this.props.totalPrice.toFixed(2))}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
            isAuth={this.props.isAuth}
          />
        </Aux>
      )
      orderSummary = <OrderSummary
        ingredients={this.props.ings}
        totalPrice={this.props.totalPrice.toFixed(2)}
        modalClosed={this.purchaseCancelHandler}
        purchaseContinue={this.purchaseContinueHandler}
      />
    }
    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler} >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuth: state.auth.idToken !== null
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onAddIngredients: (ingName) => dispatch(
      actions.addIngredient(ingName)
    ),
    onRemoveIngredients: (ingName) => dispatch(
      actions.removeIngredient(ingName)
    ),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    setAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, Axios));
