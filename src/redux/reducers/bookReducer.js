import { GET_BOOKS, GET_BOOKS_ERROR, GET_BOOKS_LOADING } from '../actions'
import { initialState } from '../store'

// let's write our reducer! :)
const bookReducer = (state = initialState.book, action) => {
  switch (action.type) {
    case GET_BOOKS:
      return {
        ...state,
        stock: action.payload,
      }

    case GET_BOOKS_ERROR:
      return {
        ...state,
        isError: true,
      }

    case GET_BOOKS_LOADING:
      return {
        ...state,
        isLoading: false,
      }

    default:
      return state
  }
}

export default bookReducer
