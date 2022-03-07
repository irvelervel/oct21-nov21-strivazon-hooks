import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import cartReducer from '../reducers/cartReducer'
import userReducer from '../reducers/userReducer'
import bookReducer from '../reducers/bookReducer'

import thunk from 'redux-thunk'
import localStorage from 'redux-persist/lib/storage'
// this is the default storage engine, localStorage

import { persistReducer, persistStore } from 'redux-persist'
import { encryptTransform } from 'redux-persist-transform-encrypt'

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

const persistConfig = {
  key: 'root',
  storage: localStorage,
  transforms: [
    encryptTransform({
      secretKey: process.env.REACT_APP_SECRET_PERSIST_KEY,
    }),
  ],
}

const bigReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
  book: bookReducer,
})

const persistedReducer = persistReducer(persistConfig, bigReducer)
// persistedReducer is a "reducer with memory"

const configureStore = createStore(
  persistedReducer,
  initialState,
  aComposeFunctionThatAlwaysWorks(applyMiddleware(thunk))
)
// 1) the main reducer function
// 2) the initial state for the redux store
// 3) any enhancer/middleware function

const persistor = persistStore(configureStore)

export { configureStore, persistor }
