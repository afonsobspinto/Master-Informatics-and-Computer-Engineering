import { userTypes } from '../actions/actionTypes'

const initialState = {
  email: undefined,
  routines: []
}

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case userTypes.setRoutines:
      return { ...state, routines: payload }
    case userTypes.login:
      return { ...state, email: payload }
    case userTypes.logout:
      return { ...state, email: undefined }
    default:
      return state
  }
}
