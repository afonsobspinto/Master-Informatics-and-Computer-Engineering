import { AsyncStorage } from 'react-native'

export const VISUAL_STYLE = Object.freeze({
  key: 'settings:visual_style',
  values: {
    cartoon: 'cartoon',
    photo: 'photo'
  }
})

export const ACTIVITY_PROGRESS_TYPE = Object.freeze({
  key: 'settings:activity_progress_type',
  values: {
    bar: 'bar',
    clock: 'clock'
  }
})

export const ACTIVITY_SHOW_TIMER = Object.freeze({
  key: 'settings:activity_show_timer'
})

export const _storeSetting = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(`Error saving ${key} : ${value}`)
  }
}

export const _retrieveSetting = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key)
    if (value !== null) {
      return JSON.parse(value)
    }
  } catch (error) {
    console.error(`Error retrieving ${key}`)
  }
}

export const _setDefault = async () => {
  _storeSetting(ACTIVITY_PROGRESS_TYPE.key, ACTIVITY_PROGRESS_TYPE.values.bar)
  _storeSetting(ACTIVITY_SHOW_TIMER.key, false)
}
