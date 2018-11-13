import React from 'react'
import { StatusBar, View, Text } from 'react-native'
import { connect } from 'react-redux'
import { setCurrentRoutine, nextActivity } from '../actions/gameActions'
import PropTypes from 'prop-types'

import CardCarousel from '../components/Carousel/CardCarousel'
import styles from '../styles/CardCarousel.style'

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
    this.props.setCurrentRoutine(routine)
    this.props.navigation.navigate('ChooseActivityScreen')
  }

  onButtonPress = (routine) => {
    this.props.setCurrentRoutine(routine)
    this.props.nextActivity()
    this.props.navigation.navigate('Activity')
  }

  render () {
    if (!this.props.routines.every(routine => routine.activities.every(activity => activity.status !== undefined))) {
      return (
        <View style={styles.screenBackground}>
          <StatusBar hidden />
          <CardCarousel
            data={this.props.routines.filter(routine => !routine.activities.every(activity => activity.status !== undefined))}
            onPress={this.onPress}
            onButtonPress={this.onButtonPress}
          />
        </View>
      )
    } else {
      return (<View style={[styles.screenBackground, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={styles.tooltip}>Sem rotinas para jogar.{'\n'}Volta amanhã!</Text>
      </View>)
    }
  }
}

export default connect(
  state => ({
    routines: state.game.routines
  }),
  dispatch => ({
    setCurrentRoutine: routine => dispatch(setCurrentRoutine(routine)),
    nextActivity: () => dispatch(nextActivity())
  })
)(ChooseRoutineScreen)

ChooseRoutineScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  routines: PropTypes.array.isRequired,
  setCurrentRoutine: PropTypes.func.isRequired,
  nextActivity: PropTypes.func.isRequired
}
