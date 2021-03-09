import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from '../../../Redux/Actions'

import Axios from '../../../AxiosOrders'
import withErrorHandler from '../../../hoc/WithErrorHandler/WithErrorHandler'
import Button from '../../../components/UI/Button/Button'
import './ContactData.css'
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input'
import { checkValidity } from '../../../Shared/Utility'

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your name'
        },
        validation: { required: true },
        valid: false,
        value: '',
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'street'
        },
        validation: { required: true },
        valid: false,
        value: '',
        touched: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zip Code'
        },
        validation: {
          required: true,
          length: 5
        },
        valid: false,
        value: '',
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        validation: { required: true },
        valid: false,
        value: '',
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-mail'
        },
        validation: { required: true },
        valid: false,
        value: '',
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' }
          ]
        },
        validation: {},
        valid: true,
        value: 'fastest'
      },
    },
    formIsValid: false,
    purchased: false
  }

  orderHandler = (event) => {
    event.preventDefault()
    const formData = {}
    for (const inputID in this.state.orderForm) {
      formData[inputID] = this.state.orderForm[inputID].value
    }
    const order = {
      ingredients: this.props.ings,
      price: this.props.totalPrice,
      orderData: formData,
      userId: this.props.userId
    }
    this.props.onOrderBurger(order, this.props.token, this.props.history)
  }

  inputChangedHandler = (event, inputID) => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormelement = { ...updatedOrderForm[inputID] }
    updatedFormelement.value = event.target.value
    updatedFormelement.valid = checkValidity(updatedFormelement.value, updatedFormelement.validation)
    updatedFormelement.touched = true
    updatedOrderForm[inputID] = updatedFormelement

    let formIsValid = true
    for (const formElement in updatedOrderForm) {
      formIsValid = updatedOrderForm[formElement].valid && formIsValid
    }

    // console.log(updatedFormelement);
    this.setState({
      orderForm: updatedOrderForm,
      formIsValid: formIsValid
    })
  }

  render() {
    let formElementsArray = []
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map((element) => {

          return (<Input
            key={element.id}
            elementType={element.config.elementType}
            elementConfig={element.config.elementConfig}
            value={element.config.value}
            inValid={!element.config.valid}
            shouldValidate={element.config.validation}
            touched={element.config.touched}
            changed={(e) => this.inputChangedHandler(e, element.id)}
          />)
        })}
        <Button btnType='Success' disabled={!this.state.formIsValid}>Order</Button>
      </form>
    )
    if (this.props.loading) {
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

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice.toFixed(2),
    loading: state.order.loading,
    purchased: state.order.purchased,
    token: state.auth.idToken,
    userId: state.auth.userId
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token, history) => {
      dispatch(actions.purchaseBurger(orderData, token, history))
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)
  (withErrorHandler(ContactData, Axios));
