import React from 'react'
import { StatusBar, View } from 'react-native'
import { ScreenOrientation } from 'expo'

import CardCarousel from '../components/Carousel/CardCarousel'
import { ROUTINES } from '../entries/entries'

export default class ChooseRoutineScreen extends React.Component {
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
        <CardCarousel data={ROUTINES} />
      </View>
    )
  }
}
