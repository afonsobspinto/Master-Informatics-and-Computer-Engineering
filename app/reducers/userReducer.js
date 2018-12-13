import { userTypes } from '../actions/actionTypes'

const initialState = {
  email: undefined
}

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case userTypes.login:
      return { ...state, email: payload }
    case userTypes.logout:
      return { ...state, email: payload }
    default:
      return state
  }
}
