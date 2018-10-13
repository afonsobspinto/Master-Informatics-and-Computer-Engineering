import React from 'react'
import { StatusBar, View } from 'react-native'
import { ScreenOrientation } from 'expo'

import RoutineCarousel from '../components/RoutineCarousel'
import { ROUTINES } from '../entries/entries'

export default class CarouselRoutineScreen extends React.Component {
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
        <RoutineCarousel data={ROUTINES} />
      </View>
    )
  }
}
