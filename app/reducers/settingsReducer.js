import { settingTypes } from '../actions/actionTypes'

const initialState = {
  activityProgressType: 'bar',
  activityShowTimer: false,
  visualStyle: 'cartoon'
}

export default function game (state = initialState, { type, payload }) {
  switch (type) {
    case settingTypes.setSettings:
      return { ...state, ...payload }
    case settingTypes.changeActivityProgressType:
      return { ...state, activityProgressType: payload }
    case settingTypes.changeVisualStyle:
      return { ...state, visualStyle: payload }
    case settingTypes.toggleActivityTimer:
      return { ...state, activityShowTimer: !state.activityShowTimer }
    default:
      return state
  }
}
