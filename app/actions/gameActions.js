import { gameTypes } from './actionTypes'

export function addRoutines (routines) {
  return {
    type: gameTypes.addRoutines,
    payload: routines
  }
}

export function setCurrentRoutine (routine) {
  return {
    type: gameTypes.setCurrentRoutine,
    payload: routine
  }
}

export function setCurrentActivity (activity) {
  return {
    type: gameTypes.setCurrentActivity,
    payload: activity
  }
}

export function setActivityStatus (activity, status) {
  return {
    type: gameTypes.setActivityStatus,
    payload: { activity, status }
  }
}

export function nextActivity () {
  return {
    type: gameTypes.nextActivity
  }
}

export function addCustomActivity (routineTitle, activity) {
  return {
    type: gameTypes.addCustomActivity,
    payload: { routineTitle, activity }
  }
}
