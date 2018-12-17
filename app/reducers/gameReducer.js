import { gameTypes } from '../actions/actionTypes'

const initialState = {
  routines: [],
  currentActivity: -1,
  currentRoutine: -1
}

export default function game (state = initialState, { type, payload }) {
  switch (type) {
    case gameTypes.addCustomActivity:
      return { ...state,
        routines: state.routines.map(
          (routine) => routine.title === payload.routineTitle ? { ...routine,
            activities: routine.activities.concat(payload.activity) } : routine)
      }

    case gameTypes.addRoutines:
      return { ...state, routines: payload }

    case gameTypes.setCurrentActivity:
      return { ...state, currentActivity: state.routines[state.currentRoutine].activities.findIndex(activity => activity.title === payload.title) }

    case gameTypes.setCurrentRoutine:
      return { ...state, currentRoutine: state.routines.findIndex(routine => routine.title === payload.title) }

    case gameTypes.setActivityStatus:
      return { ...state,
        routines: state.routines.map(
          (routine, i) => i === state.currentRoutine ? { ...routine,
            activities: routine.activities.map(
              activity => activity.title === payload.activity.title ? { ...activity, status: payload.status } : activity
            ) } : routine)
      }

    case gameTypes.nextActivity:
      return { ...state, currentActivity: state.routines[state.currentRoutine].activities.findIndex(activity => activity.status === undefined) }

    default:
      return state
  }
}
