import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from '../../Redux/Actions'

import Order from '../../components/Order/Order'
import Axios from '../../AxiosOrders'
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'
import Spinner from '../../components/UI/Spinner/Spinner'

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders(this.props.token, this.props.userId)
  }
  render() {
    let orders = <Spinner />
    if (!this.props.loading) {
      orders = (
        this.props.orders.length === 0 ?
          <h1 style={{ textAlign: 'center' }}>No orders to show</h1>
          :
          this.props.orders.map(order => {
            return <Order
              key={order.id}
              ingredients={order.ingredients}
              price={order.price}
            />
          })
      )
    }
    return (
      <div>
        {orders}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.idToken,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(Orders, Axios));
