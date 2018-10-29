import React from 'react'
import { StatusBar, View } from 'react-native'
import PropTypes from 'prop-types'

import CardCarousel from '../components/Carousel/CardCarousel'
import { backgroundColor } from '../styles/General.style'

export default class ChooseActivityScreen extends React.Component {
  static navigationOptions = {
    header: null
  }

  render () {
    const activities = this.props.navigation.getParam('activities', [])

    return (
      <View style={{ backgroundColor: backgroundColor }}>
        <StatusBar hidden />
        <CardCarousel data={activities} navigation={this.props.navigation} />
      </View>
    )
  }
}

ChooseActivityScreen.propTypes = {
  navigation: PropTypes.object.isRequired
}
