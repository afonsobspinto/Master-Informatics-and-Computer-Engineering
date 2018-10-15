import React from 'react'
import { StatusBar, View } from 'react-native'
import { ScreenOrientation } from 'expo'

import RoutineCarousel from '../components/RoutineCarousel'
import { ROUTINES, ACTIVITIES } from '../entries/entries'

export default class CarouselRoutineScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isRoutinesMenu: true
    }
  }
  componentDidMount () {
    ScreenOrientation.allow(ScreenOrientation.Orientation.LANDSCAPE)
  }
  componentWillUnmount () {
    ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT)
  }

  render () {
    return (
      <View>
        <StatusBar hidden />
        <RoutineCarousel data={this.state.isRoutinesMenu ? ROUTINES : ACTIVITIES} />
      </View>
    )
  }
}
