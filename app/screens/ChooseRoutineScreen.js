import React from 'react'
import { StatusBar, View } from 'react-native'
import { connect } from 'react-redux'
import { setCurrentRoutine } from '../actions/gameActions'
import PropTypes from 'prop-types'

import CardCarousel from '../components/Carousel/CardCarousel'
import { demoRoutines } from '../entries/entries'
import { backgroundColor } from '../styles/General.style'

class ChooseRoutineScreen extends React.Component {
  constructor (props) {
    super(props)
    this.onPress = this.onPress.bind(this)
    this.onButtonPress = this.onButtonPress.bind(this)
  }

  static navigationOptions = {
    header: null
  }

  onPress = (routine) => {
    this.props.navigation.navigate('ChooseActivityScreen', { activities: routine.activities })
  }

  onButtonPress = (routine) => {
    this.props.navigation.navigate('Activity', { activity: routine.activities[0] })
  }

  render () {
    return (
      <View style={{ backgroundColor: backgroundColor }}>
        <StatusBar hidden />
        <CardCarousel
          data={demoRoutines}
          onPress={this.onPress}
          onButtonPress={this.onButtonPress}
        />
      </View>
    )
  }
}

export default connect(
  state => ({
    routines: state.game.routines
  }),
  dispatch => ({
    setCurrentRoutine: routineIndex => dispatch(setCurrentRoutine(routineIndex))
  })
)(ChooseRoutineScreen)

ChooseRoutineScreen.propTypes = {
  navigation: PropTypes.object.isRequired
}
