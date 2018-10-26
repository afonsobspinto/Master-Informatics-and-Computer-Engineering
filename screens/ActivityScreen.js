import React, { Component } from 'react'
import { Image, Text, View, StatusBar } from 'react-native'
import PropTypes from 'prop-types'
import { ScreenOrientation } from 'expo'

import { ProgressBar } from '../components/Activity/ProgressBar'
import { ProgressClock } from '../components/Activity/ProgressClock'
import { CompleteButton } from '../components/Activity/CompleteButton'
import { PauseButton } from '../components/Activity/PauseButton'
import { CancelButton } from '../components/Activity/CancelButton'
import Images from '../assets/images/images'

import styles from '../styles/Activity.style'

export default class ActivityScreen extends Component {
  constructor (props) {
    super(props)
    this.pauseActivity = this.pauseActivity.bind(this)
    this.cancelActivity = this.cancelActivity.bind(this)
    this.completeActivity = this.completeActivity.bind(this)
    this.resumeActivity = this.resumeActivity.bind(this)
  }

  static navigationOptions = {
    header: null
  }

  activity = this.props.navigation.state.params.activity

  state = {
    progress: 0,
    progressType: this.props.navigation.state.params.progressType,
    updateRate: 0.075,
    isPaused: false,
    isCompletable: false
  }

  componentDidMount () {
    ScreenOrientation.allow(ScreenOrientation.Orientation.LANDSCAPE)

    this.interval = setInterval(() => {
      if (this.state.isPaused) return
      if (this.state.progress >= 1) return this.cancelActivity()
      if (this.state.progress > 0.2) {
        this.state.isCompletable = true
      }

      this.setState(() => {
        return { progress: this.state.progress + this.state.updateRate / this.activity.duration }
      })
    }, this.state.updateRate * 1000)
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  pauseActivity () {
    this.setState(() => ({ isPaused: true }))
  }

  cancelActivity () {
    this.props.navigation.popToTop()
  }

  completeActivity () {
    this.props.navigation.popToTop()
  }

  resumeActivity () {
    this.setState(() => ({ isPaused: false }))
  }

  render () {
    return (
      <View style={[{ backgroundColor: this.activity.color }, styles.activityScreen]} >
        <StatusBar hidden />
        <Image style={styles.image} resizeMode={'center'} source={Images[this.activity.image]} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{this.activity.title}</Text>
        </View>
        {this.state.progressType === 'clock' && <ProgressClock progress={this.state.progress} isPaused={this.state.isPaused} />}
        <View style={styles.buttonContainer}>
          {this.state.progressType === 'bar' && <ProgressBar progress={this.state.progress} isPaused={this.state.isPaused} />}
          <CancelButton style={styles.smallButton} cancelActivity={this.cancelActivity} />
          <PauseButton style={styles.smallButton} pauseActivity={this.pauseActivity} resumeActivity={this.resumeActivity} isPaused={this.state.isPaused} />
          <CompleteButton style={styles.largeButton} isCompletable={this.state.isCompletable} completeActivity={this.completeActivity} />
        </View>
      </View>
    )
  }
}

ActivityScreen.propTypes = {
  navigation: PropTypes.object.isRequired
}
