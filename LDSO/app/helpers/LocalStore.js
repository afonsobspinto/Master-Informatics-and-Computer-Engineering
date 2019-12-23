import { AsyncStorage } from 'react-native'

export const _storeJson = async (key, json) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(json))
  } catch (error) {
    console.error(`Error saving ${key} : ${json}`)
  }
}

export const _retrieveJson = async (key) => {
  try {
    const json = await AsyncStorage.getItem(key)
    if (json !== null) {
      return JSON.parse(json)
    }
  } catch (error) {
    console.error(`Error retrieving ${key}`)
  }
}
