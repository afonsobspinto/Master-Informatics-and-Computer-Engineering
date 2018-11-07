import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Image, Text, View, StatusBar } from 'react-native'
import { ScreenOrientation } from 'expo'

import { ProgressBar } from '../components/Activity/ProgressBar'
import { ProgressClock } from '../components/Activity/ProgressClock'
import { CompleteButton } from '../components/Activity/CompleteButton'
import { PauseButton } from '../components/Activity/PauseButton'
import { CancelButton } from '../components/Activity/CancelButton'
import { RewardsModal } from '../components/RewardsModal/RewardsModal'
import Images from '../assets/images/images'

import styles from '../styles/Activity.style'

class ActivityScreen extends Component {
  constructor (props) {
    super(props)

    this.state = {
      elapsedTime: 0,
      progressType: '',
      isPhoto: this.props.navigation.state.params.activity.photo !== undefined,
      updateRate: 100, // ms
      isPaused: false,
      isCompleted: false,
      isCompletable: false,
      showTimer: false,
      rewardsCount: 3,
      showRewardsModal: false
    }

    this.pauseActivity = this.pauseActivity.bind(this)
    this.cancelActivity = this.cancelActivity.bind(this)
    this.completeActivity = this.completeActivity.bind(this)
    this.resumeActivity = this.resumeActivity.bind(this)
  }

  static navigationOptions = {
    header: null
  }

  activity = this.props.navigation.state.params.activity

  componentDidMount () {
    ScreenOrientation.allow(ScreenOrientation.Orientation.LANDSCAPE)

    this.interval = setInterval(() => {
      if (this.state.isPaused) return
      if (this.state.progress >= this.activity.time.max) return this.cancelActivity()
      if (this.state.elapsedTime >= this.activity.time.min) {
        this.state.isCompletable = true
      }

      this.setState(() => {
        return { elapsedTime: this.state.elapsedTime + this.state.updateRate / 1000 }
      })
    }, this.state.updateRate)
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
    clearInterval(this.interval)
    this.setState(() => { return { isCompleted: true, showRewardsModal: true } })
  }

  resumeActivity () {
    this.setState(() => ({ isPaused: false }))
  }

  render () {
    return (
      <View style={[{ backgroundColor: this.activity.color }, styles.activityScreen]} >
        <StatusBar hidden />
        <Image
          style={this.state.isPhoto ? styles.photo : styles.image}
          resizeMode={this.state.isPhoto ? 'cover' : 'center'}
          source={Images[this.state.isPhoto ? this.activity.photo : this.activity.image]} />
        <View style={styles.titleContainer}>
          <Text style={this.state.isPhoto ? styles.photoTitle : styles.title}>{this.activity.title}</Text>
        </View>
        {this.props.progressType === 'clock' && <ProgressClock showTimer={this.props.showTimer} elapsedTime={this.state.elapsedTime} activityTimes={this.activity.time} isPaused={this.state.isPaused} />}
        {!this.state.showRewardsModal && <View style={styles.buttonContainer}>
          {this.props.progressType === 'bar' && <ProgressBar showTimer={this.props.showTimer} elapsedTime={this.state.elapsedTime} activityTimes={this.activity.time} isPaused={this.state.isPaused} />}
          <CancelButton style={styles.smallButton} cancelActivity={this.cancelActivity} />
          <PauseButton style={styles.smallButton} pauseActivity={this.pauseActivity} resumeActivity={this.resumeActivity} isPaused={this.state.isPaused} />
          <CompleteButton style={styles.largeButton} isCompletable={this.state.isCompletable} completeActivity={this.completeActivity} />
        </View>}
        <RewardsModal
          show={this.state.showRewardsModal}
          activity={this.activity}
          elapsedTime={this.state.elapsedTime} />
      </View>
    )
  }
}

export default connect(
  state => ({
    progressType: state.settings.activityProgressType,
    showTimer: state.settings.activityShowTimer
  }),
  dispatch => ({

  })
)(ActivityScreen)

ActivityScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  progressType: PropTypes.string.isRequired,
  showTimer: PropTypes.bool.isRequired
}
