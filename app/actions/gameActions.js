import { gameTypes } from './actionTypes'

export function addRoutines (routines) {
  return {
    type: gameTypes.addRoutines,
    payload: routines
  }
}

export function setCurrentRoutine (routineIndex) {
  return {
    type: gameTypes.setCurrentRoutine,
    payload: routineIndex
  }
}

export function setCurrentActivity (activityIndex) {
  return {
    type: gameTypes.setCurrentActivity,
    payload: activityIndex
  }
}

export function setActivityStatus (activityIndex, status) {
  return {
    type: gameTypes.setActivityStatus,
    payload: {
      activity: activityIndex,
      status
    }
  }
}
