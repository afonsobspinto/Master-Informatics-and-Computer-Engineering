import React from 'react'
import { StatusBar, View } from 'react-native'
import PropTypes from 'prop-types'

import CardCarousel from '../components/Carousel/CardCarousel'
import { demoRoutines } from '../entries/entries'
import { backgroundColor } from '../styles/General.style'

export default class ChooseRoutineScreen extends React.Component {
  static navigationOptions = {
    header: null
  }

  render () {
    return (
      <View style={{ backgroundColor: backgroundColor }}>
        <StatusBar hidden />
        <CardCarousel
          data={demoRoutines}
          navigation={this.props.navigation}
          isRoutine
        />
      </View>
    )
  }
}

ChooseRoutineScreen.propTypes = {
  navigation: PropTypes.object.isRequired
}
