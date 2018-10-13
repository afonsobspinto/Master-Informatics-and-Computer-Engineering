import React from 'react'
import { StatusBar, View } from 'react-native'
import { ScreenOrientation } from 'expo'

import RoutineCarousel from '../components/RoutineCarousel'

export default class CarouselRoutineScreen extends React.Component {
  componentDidMount () {
    ScreenOrientation.allow(ScreenOrientation.Orientation.LANDSCAPE)
  }
  componentWillUnmount () {
    ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT)
  }

  render () {
    const testData = ['Manhas das manhãs', 'Pos-Almoço', 'Fim de semana']

    return (
      <View>
        <StatusBar hidden />
        <RoutineCarousel data={testData} />
      </View>
    )
  }
}
