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

export function changeActivityProgressType (progressType) {
  return {
    type: settingTypes.changeActivityProgressType,
    payload: progressType
  }
}

export function toggleActivityTimer () {
  return {
    type: settingTypes.toggleActivityTimer,
    payload: null
  }
}
