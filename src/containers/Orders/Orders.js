import React, { Component } from 'react';
import Order from '../../components/Order/Order'
import Axios from '../../AxiosOrders'
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  }
  componentDidMount() {
    Axios.get('/orders.json')
      .then(res => {
        const fetchedOrders = []
        for (const key in res.data) {
          fetchedOrders.push({
            id: key,
            ...res.data[key],
          })
        }
        this.setState({ orders: fetchedOrders, loading: false })
      })
      .catch(err => {
        this.setState({ loading: false })
      })
  }
  render() {
    return (
      <div>
        {this.state.orders.map(order => {
          return <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}
          />
        })}
      </div>
    );
  }
}

export default WithErrorHandler(Orders, Axios);
