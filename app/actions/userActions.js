import { userTypes } from './actionTypes'

export function login (email) {
  return {
    type: userTypes.login,
    payload: email
  }
}

export function logout () {
  return {
    type: userTypes.login
  }
}

export function setRoutines (routines) {
  return {
    type: userTypes.setRoutines,
    payload: routines
  }
}
