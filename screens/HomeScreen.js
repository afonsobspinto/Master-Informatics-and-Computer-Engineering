import React from 'react'
import { Button, Text, View } from 'react-native'
import PropTypes from 'prop-types'
import { _retrieveSetting, _storeSetting, ACTIVITY_PROGRESS_TYPE, ACTIVITY_SHOW_TIMER } from '../helpers/Settings'

export default class HomeScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      activityProgressType: ACTIVITY_PROGRESS_TYPE.values.bar,
      activityShowTimer: false
    }
  }

  componentDidMount () {
    _retrieveSetting(ACTIVITY_PROGRESS_TYPE.key).then(res => this.setState(() => ({ activityProgressType: res })))
  }

  static navigationOptions = {
    header: null
  }

  changeActivityProgressType = () => {
    if (this.state.activityProgressType === ACTIVITY_PROGRESS_TYPE.values.bar) {
      _storeSetting(ACTIVITY_PROGRESS_TYPE.key, ACTIVITY_PROGRESS_TYPE.values.clock)
      this.setState(() => ({ activityProgressType: ACTIVITY_PROGRESS_TYPE.values.clock }))
    } else {
      _storeSetting(ACTIVITY_PROGRESS_TYPE.key, ACTIVITY_PROGRESS_TYPE.values.bar)
      this.setState(() => ({ activityProgressType: ACTIVITY_PROGRESS_TYPE.values.bar }))
    }
  }

  changeActivityShowTimer = () => {
    if (this.state.activityShowTimer) {
      _storeSetting(ACTIVITY_SHOW_TIMER.key, false)
      this.setState(() => ({ activityShowTimer: false }))
    } else {
      _storeSetting(ACTIVITY_SHOW_TIMER.key, true)
      this.setState(() => ({ activityShowTimer: true }))
    }
  }

  render () {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title='Go to routine screen'
          onPress={() => {
            this.props.navigation.navigate('ChooseRoutineScreen')
          }}
        />
        <Text />
        <Button
          title={`Progress: ${this.state.activityProgressType}`}
          onPress={this.changeActivityProgressType}
        />
        <Text />
        <Button
          title={`Timer: ${this.state.activityShowTimer}`}
          onPress={this.changeActivityShowTimer}
        />
      </View>
    )
  }
}

HomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired
}
