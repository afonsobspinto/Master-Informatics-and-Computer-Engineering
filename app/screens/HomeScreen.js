import React from 'react'
import { connect } from 'react-redux'
import { Button, Text, View } from 'react-native'
import PropTypes from 'prop-types'

import { changeActivityProgressType, toggleActivityTimer } from '../actions/settingsActions'

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  }

  changeActivityProgressType = () => {
    if (this.props.activityProgressType === 'bar') {
      this.props.changeActivityProgressType('clock')
    } else {
      this.props.changeActivityProgressType('bar')
    }
  }

  changeActivityShowTimer = () => {
    this.props.toggleActivityTimer()
  }

  render () {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title='Go to main menu'
          onPress={() => {
            this.props.navigation.navigate('ChildMainMenu')
          }}
        />
        <Text />
        <Button
          title={`Progress: ${this.props.activityProgressType}`}
          onPress={this.changeActivityProgressType}
        />
        <Text />
        <Button
          title={`Timer: ${this.props.activityShowTimer}`}
          onPress={this.changeActivityShowTimer}
        />
      </View>
    )
  }
}

export default connect(
  state => ({
    activityProgressType: state.settings.activityProgressType,
    activityShowTimer: state.settings.activityShowTimer
  }),
  dispatch => ({
    changeActivityProgressType: progressType => dispatch(changeActivityProgressType(progressType)),
    toggleActivityTimer: showTimer => dispatch(toggleActivityTimer(showTimer))
  })
)(HomeScreen)

HomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  activityProgressType: PropTypes.string.isRequired,
  activityShowTimer: PropTypes.bool.isRequired,
  changeActivityProgressType: PropTypes.func.isRequired,
  toggleActivityTimer: PropTypes.func.isRequired
}
