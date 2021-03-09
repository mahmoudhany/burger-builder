import * as actionTypes from './ActionTypes'
import Axios from '../../AxiosOrders'

export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name
  }
}
export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name
  }
}

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients
  }
}

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  }
}

export const initIngredients = () => {
  return dispatch => {
    Axios.get("https://burger-builder-76bee.firebaseio.com/ingredients.json")
      .then(response => {
        dispatch(setIngredients(response.data))
      })
      .catch(() => {
        dispatch(fetchIngredientsFailed())
      })
  }
}
