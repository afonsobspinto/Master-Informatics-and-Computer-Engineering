import React from 'react'
import { StatusBar, View } from 'react-native'
import { ScreenOrientation } from 'expo'

import CardCarousel from '../components/Carousel/CardCarousel'
import { ROUTINES, ACTIVITIES } from '../entries/entries'

export default class CarouselRoutineScreen extends React.Component {
  static navigationOptions = {
    header: null
  }

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
      <View style={{ backgroundColor: '#fff7ae' }}>
        <StatusBar hidden />
        <CardCarousel data={this.state.isRoutinesMenu ? ROUTINES : ACTIVITIES} />
      </View>
    )
  }
}
