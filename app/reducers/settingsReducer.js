import { settingTypes } from '../actions/actionTypes'

const initialState = {
  activityProgressType: 'bar',
  activityShowTimer: false,
  visualStyle: 'cartoon',
  routinePlayType: 'choose'
}

export default function game (state = initialState, { type, payload }) {
  switch (type) {
    case settingTypes.setSettings:
      return { ...state, activityProgressType: state.activityProgressType === 'bar' ? 'clock' : 'bar' }
    case settingTypes.changeVisualStyle:
      return { ...state, visualStyle: payload }
    case settingTypes.toggleActivityTimer:
      return { ...state, activityShowTimer: !state.activityShowTimer }
    case settingTypes.toggleRoutinePlayType:
      return { ...state, routinePlayType: state.routinePlayType === 'choose' ? 'auto' : 'choose' }
    default:
      return state
  }
}
