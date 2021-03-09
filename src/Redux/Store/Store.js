import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk';
// import createSagaMiddleware from 'redux-saga'
import burgerBuilderReducer from '../Reducers/burgerBuilder'
import orderReducer from '../Reducers/order'
import authReducer from '../Reducers/auth'
// import { watchAuth } from "../sagas";


const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer,
  auth: authReducer
})
// const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
)
// sagaMiddleware.run(watchAuth)

export default store;
