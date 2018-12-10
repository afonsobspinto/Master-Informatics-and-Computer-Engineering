import { settingTypes } from '../actions/actionTypes'

const initialState = {
  activityProgressType: 'bar',
  activityShowTimer: false,
  activityFeedback: 'visual',
  feedbackFrequency: 'normal',
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
      return { ...state, visualStyle: state.visualStyle === 'cartoon' ? 'photo' : 'cartoon' }
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
      return state
    case settingTypes.changeFeedbackFrequency:
      if (state.feedbackFrequency === 'slow') {
        return { ...state, feedbackFrequency: 'normal' }
      } else if (state.feedbackFrequency === 'normal') {
        return { ...state, feedbackFrequency: 'fast' }
      } else if (state.feedbackFrequency === 'fast') {
        return { ...state, feedbackFrequency: 'slow' }
      }
      return state
    case settingTypes.toggleRoutinePlayType:
      return { ...state, routinePlayType: state.routinePlayType === 'choose' ? 'auto' : 'choose' }
    default:
      return state
  }
}
