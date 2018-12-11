import { userTypes } from './actionTypes'

export function login (email) {
  return {
    type: userTypes.login,
    payload: email
  }
}

export function logout () {
  return {
    type: userTypes.login,
    payload: ''
  }
}
