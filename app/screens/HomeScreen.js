import React from 'react'
import { connect } from 'react-redux'
import { Button, Text, View } from 'react-native'
import PropTypes from 'prop-types'

import { toggleActivityProgressType, toggleActivityTimer, toggleRoutinePlayType, toggleActivityFeedback } from '../actions/settingsActions'

class HomeScreen extends React.Component {
  render () {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title={'Parent Screen'}
          onPress={() => { this.props.navigation.navigate('ParentScreen') }}
        />
        <Text />
        <Button
          title={`Progress: ${this.props.activityProgressType}`}
          onPress={this.props.toggleActivityProgressType}
        />
        <Text />
        <Button
          title={`Timer: ${this.props.activityShowTimer}`}
          onPress={this.props.toggleActivityTimer}
        />
        <Text />
        <Button
          title={`Routine: ${this.props.routinePlayType}`}
          onPress={this.props.toggleRoutinePlayType}
        />
        <Text />
        <Button
          title={`Feedback: ${this.props.activityFeedback}`}
          onPress={this.props.toggleActivityFeedback}
        />
      </View>
    )
  }
}

export default connect(
  state => ({
    activityProgressType: state.settings.activityProgressType,
    activityShowTimer: state.settings.activityShowTimer,
    activityFeedback: state.settings.activityFeedback,
    routinePlayType: state.settings.routinePlayType
  }),
  dispatch => ({
    toggleActivityProgressType: () => dispatch(toggleActivityProgressType()),
    toggleActivityTimer: showTimer => dispatch(toggleActivityTimer(showTimer)),
    toggleActivityFeedback: () => dispatch(toggleActivityFeedback()),
    toggleRoutinePlayType: () => dispatch(toggleRoutinePlayType())
  })
)(HomeScreen)

HomeScreen.propTypes = {
  activityProgressType: PropTypes.string.isRequired,
  activityShowTimer: PropTypes.bool.isRequired,
  activityFeedback: PropTypes.string.isRequired,
  toggleActivityProgressType: PropTypes.func.isRequired,
  toggleActivityTimer: PropTypes.func.isRequired,
  toggleActivityFeedback: PropTypes.func.isRequired,
  routinePlayType: PropTypes.string.isRequired,
  toggleRoutinePlayType: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired
}
