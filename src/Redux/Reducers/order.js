import * as actionTypes from '../Actions/ActionTypes'
import { updateObject } from '../../Shared/Utility'

const initialState = {
  orders: [],
  loading: false,
  purchased: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_START:
      return updateObject(state, {
        loading: true
      })
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = {
        ...action.orderData,
        id: action.orderId,
      }
      return updateObject(state, {
        orders: [...state.orders, newOrder],
        loading: false,
        purchased: true
      })
    case actionTypes.PURCHASE_BURGER_FAIL:
      return updateObject(state, {
        loading: false,
        purchased: false
      })
    case actionTypes.FETCH_ORDERS_START:
      return updateObject(state, {
        loading: true
      })
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return updateObject(state, {
        orders: action.orders,
        loading: false
      })
    case actionTypes.FETCH_ORDERS_FAIL:
      return updateObject(state, {
        loading: false
      })
    default:
      return state;
  }
}

export default reducer;
