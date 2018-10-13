import React from 'react'
import { StatusBar, View } from 'react-native'
import { ScreenOrientation } from 'expo'

import ActivityCarousel from '../components/ActivityCarousel'
import { ACTIVITIES } from '../entries/entries'

export default class SelectActivityScreen extends React.Component {
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
        <ActivityCarousel data={ACTIVITIES} />
      </View>
    )
  }
}
