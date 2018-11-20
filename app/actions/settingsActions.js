import { settingTypes } from './actionTypes'

export function setSettings (settings) {
  return {
    type: settingTypes.setSettings,
    payload: settings
  }
}

export function changeVisualStyle (visualStyle) {
  return {
    type: settingTypes.changeVisualStyle,
    payload: visualStyle
  }
}

export function toggleActivityProgressType () {
  return {
    type: settingTypes.toggleActivityProgressType,
    payload: null
  }
}

export function toggleActivityTimer () {
  return {
    type: settingTypes.toggleActivityTimer,
    payload: null
  }
}

export function toggleActivityFeedback () {
  return {
    type: settingTypes.toggleActivityFeedback,
    payload: null
  }
}

export function toggleRoutinePlayType () {
  return {
    type: settingTypes.toggleRoutinePlayType,
    payload: null
  }
}
