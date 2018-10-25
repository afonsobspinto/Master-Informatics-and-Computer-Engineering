import React from 'react'
import { createStackNavigator } from 'react-navigation'
import HomeScreen from './screens/HomeScreen'
import ActivityScreen from './screens/ActivityScreen'
import { _setDefault } from './helpers/Settings'
import ChooseRoutineScreen from './screens/ChooseRoutineScreen'
import ChooseActivityScreen from './screens/ChooseActivityScreen'
import { Font } from 'expo'

export default class App extends React.Component {
  async componentDidMount () {
    _setDefault()
    await Font.loadAsync({
      'LinotteBold': require('./assets/fonts/Linotte-Bold.ttf')
    })
  }

  render () {
    return (
      <AppStackNavigator />
    )
  }
}

const AppStackNavigator = createStackNavigator({
  Home: HomeScreen,
  Activity: ActivityScreen,
  ChooseRoutineScreen: ChooseRoutineScreen,
  ChooseActivityScreen: ChooseActivityScreen
})
