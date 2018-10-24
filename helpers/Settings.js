import { AsyncStorage } from 'react-native'
import { VISUAL_SYTLE } from './SettingTypes'

export const _storeSetting = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch (error) {
    console.error(`Error saving ${key} : ${value}`)
  }
}

export const _retrieveSetting = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key)
    if (value !== null) {
      return value
    }
  } catch (error) {
    console.error(`Error retrieving ${key}`)
  }
}

export const _setDefault = async () => {
  _storeSetting(VISUAL_SYTLE, 'photo')
}
