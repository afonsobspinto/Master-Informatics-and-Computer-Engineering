import React from 'react'
import { createStackNavigator } from 'react-navigation'
import HomeScreen from './screens/HomeScreen'
import SingleActivityScreen from './screens/SingleActivityScreen'
import SingleActivityClockScreen from './screens/SingleActivityClockScreen'
import { _setDefault } from './helpers/Settings'
import ChooseRoutineScreen from './screens/ChooseRoutineScreen'
import CarouselRoutineScreen from "./screens/CarouselRoutineScreen";

export default class App extends React.Component {
  componentDidMount () {
    _setDefault()
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
  RoutineScreen: ChooseRoutineScreen,
  CarouselRoutineScreen: CarouselRoutineScreen
})
