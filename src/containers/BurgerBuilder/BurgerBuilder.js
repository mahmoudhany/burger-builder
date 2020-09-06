import React, { Component } from 'react';
import Axios from '../../AxiosOrders'
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'

const INGREDIENTS_PRICE = {
  bacon: 0.5,
  cheese: 0.8,
  meat: 1.5,
  salad: 0.4,
}
class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  }
  componentDidMount() {
    Axios.get("https://burger-builder-76bee.firebaseio.com/ingredients.json")
      .then(response => {
        this.setState({
          ingredients: response.data
        })
      })
      .catch(() => this.setState({ error: true }))
  }
  // add Ingredient
  addIngredient = (type) => {
    const updatedCount = this.state.ingredients[type] + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount;
    const totalPrice = this.state.totalPrice + INGREDIENTS_PRICE[type]
    this.setState({
      ingredients: updatedIngredients,
      totalPrice
    })
    this.updatePurchaseState(updatedIngredients)
  }
  // remove Ingredient
  removeIngredient = type => {
    const updatedCount = this.state.ingredients[type] - 1
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount;
    const totalPrice = this.state.totalPrice - INGREDIENTS_PRICE[type]

    this.setState({
      ingredients: updatedIngredients,
      totalPrice
    })
    this.updatePurchaseState(updatedIngredients)
  }
  // update Purchase State
  updatePurchaseState = (ingredients) => {
    const sumIngredients = Object.values(ingredients).reduce((prev, cur) => {
      return prev + cur
    }, 0)
    this.setState({
      purchasable: sumIngredients > 0
    })
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
    this.props.history.push({
      pathname: '/checkout',
      state: {
        ingredients: this.state.ingredients,
        totalPrice: this.state.totalPrice.toFixed(2)
      }
    })
  }
  render() {
    const disabledInfo = {
      ...this.state.ingredients
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null

    let burger = this.state.error ? <p>Can't load ingredients</p> : <Spinner />
    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />

          <BuildControls
            ingredients={this.state.ingredients}
            ingredientAdded={this.addIngredient}
            ingredientRemoved={this.removeIngredient}
            disabled={disabledInfo}
            price={(this.state.totalPrice.toFixed(2))}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
          />
        </Aux>
      )
      orderSummary = <OrderSummary
        ingredients={this.state.ingredients}
        modalClosed={this.purchaseCancelHandler}
        purchaseContinue={this.purchaseContinueHandler}
        totalPrice={this.state.totalPrice.toFixed(2)}
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

export default withErrorHandler(BurgerBuilder, Axios);
