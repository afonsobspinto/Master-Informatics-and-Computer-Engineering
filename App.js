import React from 'react'
import { createStackNavigator } from 'react-navigation'
import HomeScreen from './screens/HomeScreen'
import SingleActivityScreen from './screens/SingleActivityScreen'
import SingleActivityClockScreen from './screens/SingleActivityClockScreen'
import { _setDefault } from './helpers/Settings'
import ChooseRoutineScreen from './screens/ChooseRoutineScreen'
import { Font } from 'expo'

export default class App extends React.Component {
  componentDidMount () {
    _setDefault()
    Font.loadAsync({
      'Baloo': require('./assets/fonts/Baloo-Regular.ttf')
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
  SingleActivity: SingleActivityScreen,
  SingleActivityClock: SingleActivityClockScreen,
  ChooseRoutineScreen: ChooseRoutineScreen
})
