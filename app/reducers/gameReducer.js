import { gameTypes } from '../actions/actionTypes'

const initialState = {
  routines: [],
  currentActivity: null,
  currentRoutine: null
}

export default function game (state = initialState, { type, payload }) {
  switch (type) {
    case gameTypes.addRoutines:
      return { ...state, routines: payload }
    case gameTypes.setCurrentActivity:
      return { ...state, currentActivity: payload }
    case gameTypes.setCurrentRoutine:
      return { ...state, currentRoutine: payload }
    case gameTypes.setActivityStatus:
      return { ...state,
        routines: state.routines.map(
          (routine, i) => i === state.currentRoutine ? { ...routine,
            activities: routine.activities.map(
              (activity, i) => i === payload.activity ? { ...activity, status: payload.status } : activity
            ) } : routine)
      }
    default:
      return state
  }
}
