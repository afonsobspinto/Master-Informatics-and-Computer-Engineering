import React from 'react'
import { createStackNavigator } from 'react-navigation'
import HomeScreen from './screens/HomeScreen'
import SingleActivityScreen from './screens/SingleActivityScreen'
import SingleActivityClockScreen from './screens/SingleActivityClockScreen'

export default class App extends React.Component {
  render () {
    return (
      <AppStackNavigator />
    )
  }
}

const AppStackNavigator = createStackNavigator({
  Home: HomeScreen,
  SingleActivity: SingleActivityScreen,
  SingleActivityClock: SingleActivityClockScreen
})
