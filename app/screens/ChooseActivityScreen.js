import React from 'react'
import { StatusBar, View } from 'react-native'
import PropTypes from 'prop-types'

import CardCarousel from '../components/Carousel/CardCarousel'
import { backgroundColor } from '../styles/General.style'

export default class ChooseActivityScreen extends React.Component {
  constructor (props) {
    super(props)
    this.onPress = this.onPress.bind(this)
  }

  static navigationOptions = {
    header: null
  }

  onPress = (activity) => {
    this.props.navigation.navigate('Activity', { activity: activity })
  }

  render () {
    const activities = this.props.navigation.getParam('activities', [])

    return (
      <View style={{ backgroundColor: backgroundColor }}>
        <StatusBar hidden />
        <CardCarousel data={activities} onPress={this.onPress} />
      </View>
    )
  }
}

ChooseActivityScreen.propTypes = {
  navigation: PropTypes.object.isRequired
}
