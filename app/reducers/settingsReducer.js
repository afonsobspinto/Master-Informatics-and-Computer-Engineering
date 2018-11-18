import { settingTypes } from '../actions/actionTypes'

const initialState = {
  activityProgressType: 'bar',
  activityShowTimer: false,
  activityFeedback: 'visual',
  visualStyle: 'cartoon',
  routinePlayType: 'choose'
}

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case settingTypes.setSettings:
      return { ...state, ...payload }
    case settingTypes.toggleActivityProgressType:
      return { ...state, activityProgressType: state.activityProgressType === 'bar' ? 'clock' : 'bar' }
    case settingTypes.changeVisualStyle:
      return { ...state, visualStyle: payload }
    case settingTypes.toggleActivityTimer:
      return { ...state, activityShowTimer: !state.activityShowTimer }
    case settingTypes.toggleActivityFeedback:
      if (state.activityFeedback === 'visual') {
        return { ...state, activityFeedback: 'sound' }
      } else if (state.activityFeedback === 'sound') {
        return { ...state, activityFeedback: 'vibration' }
      } else if (state.activityFeedback === 'vibration') {
        return { ...state, activityFeedback: 'visual' }
      }
      break
    case settingTypes.toggleRoutinePlayType:
      return { ...state, routinePlayType: state.routinePlayType === 'choose' ? 'auto' : 'choose' }
    default:
      return state
  }
}
