import { SET_USER_NAME } from '../actions'
import { initialState } from '../store'

// let's write our reducer! :)
const userReducer = (state = initialState.user, action) => {
  switch (action.type) {
    case SET_USER_NAME:
      return {
        ...state,
        name: action.payload,
      }

    default:
      return state
  }
}

export default userReducer
