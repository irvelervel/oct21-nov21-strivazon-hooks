import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import cartReducer from '../reducers/cartReducer'
import userReducer from '../reducers/userReducer'
import bookReducer from '../reducers/bookReducer'

import thunk from 'redux-thunk'

const aComposeFunctionThatAlwaysWorks =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const initialState = {
  // let's create a carte "slice"
  cart: {
    products: [],
  },
  user: {
    name: '',
  },
  book: {
    stock: [],
    isError: false,
    isLoading: true,
  },
}

const bigReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
  book: bookReducer,
})

export const configureStore = createStore(
  bigReducer,
  initialState,
  aComposeFunctionThatAlwaysWorks(applyMiddleware(thunk))
)
// 1) the main reducer function
// 2) the initial state for the redux store
// 3) any enhancer/middleware function
