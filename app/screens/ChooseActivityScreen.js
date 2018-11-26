import React from 'react'
import { StatusBar, View } from 'react-native'
import { connect } from 'react-redux'
import { setCurrentActivity } from '../actions/gameActions'
import PropTypes from 'prop-types'

import CardCarousel from '../components/Carousel/CardCarousel'
import { backgroundColor } from '../styles/Colors'

export class ChooseActivityScreen extends React.Component {
  constructor (props) {
    super(props)
    this.onPress = this.onPress.bind(this)
  }

  onPress = (activity) => {
    this.props.setCurrentActivity(activity)
    this.props.navigation.navigate('Activity')
  }

  render () {
    return (
      <View style={{ backgroundColor: backgroundColor }}>
        <StatusBar hidden />
        <CardCarousel
          data={this.props.activities.filter(activity => activity.status === undefined)}
          onPress={this.onPress} />
      </View>
    )
  }
}

export default connect(
  state => ({
    activities: state.game.routines[state.game.currentRoutine].activities
  }),
  dispatch => ({
    setCurrentActivity: routine => dispatch(setCurrentActivity(routine))
  })
)(ChooseActivityScreen)

ChooseActivityScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  activities: PropTypes.array.isRequired,
  setCurrentActivity: PropTypes.func.isRequired
}
