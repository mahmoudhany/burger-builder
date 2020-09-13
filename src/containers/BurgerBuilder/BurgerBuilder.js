import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actionTypes from '../../Redux/Actions/Actions'

import Axios from '../../AxiosOrders'
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'


class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false
  }
  componentDidMount() {
    // Axios.get("https://burger-builder-76bee.firebaseio.com/ingredients.json")
    //   .then(response => {
    //     this.setState({
    //       ingredients: response.data
    //     })
    //   })
    //   .catch(() => this.setState({ error: true }))
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
    this.setState({
      purchasing: true
    })
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

    let burger = this.state.error ? <p>Can't load ingredients</p> : <Spinner />
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
    if (this.state.loading) {
      orderSummary = <Spinner />
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
    ings: state.ingredients,
    totalPrice: state.totalPrice
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onAddIngredients: (ingName) => dispatch({
      type: actionTypes.ADD_INGREDIENT,
      ingredientName: ingName
    }),
    onRemoveIngredients: (ingName) => dispatch({
      type: actionTypes.REMOVE_INGREDIENT,
      ingredientName: ingName
    })
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, Axios));
