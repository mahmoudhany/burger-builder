import React, { Component } from 'react';
import Axios from '../../../AxiosOrders'
import Button from '../../../components/UI/Button/Button'
import './ContactData.css'
import Spinner from '../../../components/UI/Spinner/Spinner';


class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  }
  orderHandler = (event) => {
    const { ingredients, totalPrice } = this.props
    event.preventDefault()
    this.setState({
      loading: true
    })
    const order = {
      ingredients: ingredients,
      price: totalPrice,
      custmer: {
        name: 'Mahmoud Hany',
        address: {
          contry: 'Cairo, Egypt',
          zipCode: '12345',
        },
        email: 'mhany.dev@gmail.com'
      },
      deliveryMethod: 'fast'
    }
    Axios.post('/orders.json', order)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push('/')
      })
      .catch(error => this.setState({ loading: false }))
  }
  render() {
    let form = (
      <form action="">
        <input className='Input' type="text" name="name" placeholder='Your Name' />
        <input className='Input' type="email" name="email" placeholder='Your E-mail' />
        <input className='Input' type="text" name="street" placeholder='Street' />
        <input className='Input' type="text" name="postal" placeholder='Postal Code' />
        <Button btnType='Success' clicked={this.orderHandler}>Order</Button>
      </form>
    )
    if (this.state.loading) {
      form = <Spinner />
    }
    return (
      <div className='ContactData'>
        <h4>Enter Your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
