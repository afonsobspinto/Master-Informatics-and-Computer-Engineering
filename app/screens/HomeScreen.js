import React from 'react'
import { connect } from 'react-redux'
import { Button, Text, View } from 'react-native'
import PropTypes from 'prop-types'

import { toggleActivityProgressType, toggleActivityTimer, toggleRoutinePlayType, toggleActivityFeedback, changeFeedbackFrequency } from '../actions/settingsActions'

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
          title={'Register Screen'}
          onPress={() => { this.props.navigation.navigate('RegisterScreen') }}
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
        <Text />
        <Button
          title={`Feedback Frequency: ${this.props.feedbackFrequency}`}
          onPress={this.props.changeFeedbackFrequency}
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
    feedbackFrequency: state.settings.feedbackFrequency,
    routinePlayType: state.settings.routinePlayType
  }),
  dispatch => ({
    toggleActivityProgressType: () => dispatch(toggleActivityProgressType()),
    toggleActivityTimer: showTimer => dispatch(toggleActivityTimer(showTimer)),
    toggleActivityFeedback: () => dispatch(toggleActivityFeedback()),
    toggleRoutinePlayType: () => dispatch(toggleRoutinePlayType()),
    changeFeedbackFrequency: () => dispatch(changeFeedbackFrequency())
  })
)(HomeScreen)

HomeScreen.propTypes = {
  activityProgressType: PropTypes.string.isRequired,
  activityShowTimer: PropTypes.bool.isRequired,
  activityFeedback: PropTypes.string.isRequired,
  feedbackFrequency: PropTypes.string.isRequired,
  toggleActivityProgressType: PropTypes.func.isRequired,
  toggleActivityTimer: PropTypes.func.isRequired,
  toggleActivityFeedback: PropTypes.func.isRequired,
  changeFeedbackFrequency: PropTypes.func.isRequired,
  routinePlayType: PropTypes.string.isRequired,
  toggleRoutinePlayType: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired
}
