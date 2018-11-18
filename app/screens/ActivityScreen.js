import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setActivityStatus, nextActivity } from '../actions/gameActions'
import { addStars } from '../actions/childActions'
import { Image, Text, View, StatusBar, BackHandler } from 'react-native'

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
      isPhoto: this.props.activity.photo !== undefined,
      updateRate: 100, // ms
      isPaused: false,
      isCompleted: false,
      isCompletable: false
    }

    this.pauseActivity = this.pauseActivity.bind(this)
    this.cancelActivity = this.cancelActivity.bind(this)
    this.completeActivity = this.completeActivity.bind(this)
    this.resumeActivity = this.resumeActivity.bind(this)
    this.nextActivity = this.nextActivity.bind(this)
    this.backToMenu = this.backToMenu.bind(this)
  }

  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPres', this.cancelActivity)
    this.interval = setInterval(() => {
      if (this.state.isPaused) return
      if (this.state.elapsedTime >= this.props.activity.time.max) this.completeActivity()
      if (this.state.elapsedTime >= this.props.activity.time.min) {
        this.state.isCompletable = true
      }

      this.setState(() => {
        return { elapsedTime: this.state.elapsedTime + this.state.updateRate / 1000 }
      })
    }, this.state.updateRate)
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this.cancelActivity)
    clearInterval(this.interval)
  }

  pauseActivity () {
    this.setState(() => ({ isPaused: true }))
  }

  cancelActivity () {
    this.props.navigation.popToTop()
    return true // To be called by andrdid back button
  }

  completeActivity () {
    clearInterval(this.interval)
    const status = {
      completed: true,
      reward: this.state.elapsedTime > this.props.activity.time.max ? 0
        : this.state.elapsedTime < this.props.activity.time.goal ? 3
          : this.state.elapsedTime < this.props.activity.time.goal + (this.props.activity.time.max - this.props.activity.time.goal) / 2 ? 2 : 1,
      time: parseInt(this.state.elapsedTime)
    }
    this.props.setActivityStatus(this.props.activity, status)
    this.setState(() => { return { isCompleted: true } })
  }

  nextActivity () {
    if (this.props.activity.status) this.props.addStars(this.props.activity.status.reward)
    this.props.nextActivity()
    this.props.navigation.replace('Activity')
  }

  backToMenu () {
    if (this.props.activity.status) this.props.addStars(this.props.activity.status.reward)
    this.props.navigation.popToTop()
  }

  resumeActivity () {
    this.setState(() => ({ isPaused: false }))
  }

  returnURIorImage = () => {
    // TODO: This checks whether the photo attribute is type URI and should probably just eventually be totally changed to URI.
    if (this.props.activity.photo !== undefined && this.props.activity.photo.includes('file://')) {
      return { uri: this.props.activity.photo }
    } else {
      return Images[this.state.isPhoto ? this.props.activity.photo : this.props.activity.image]
    }
  }

  render () {
    return (
      <View style={[{ backgroundColor: this.props.activity.color }, styles.activityScreen]} >
        <StatusBar hidden />
        <Image
          style={this.state.isPhoto ? styles.photo : styles.image}
          resizeMode={this.state.isPhoto ? 'cover' : 'center'}
          source={this.returnURIorImage()} />
        <View style={styles.titleContainer}>
          <Text style={this.state.isPhoto ? styles.photoTitle : styles.title}>{this.props.activity.title}</Text>
        </View>
        {this.props.progressType === 'clock' && !this.state.isCompleted && <ProgressClock showTimer={this.props.showTimer} elapsedTime={this.state.elapsedTime} activityTimes={this.props.activity.time} isPaused={this.state.isPaused} />}
        {!this.state.isCompleted && <View style={styles.buttonContainer}>
          {this.props.progressType === 'bar' && <ProgressBar showTimer={this.props.showTimer} elapsedTime={this.state.elapsedTime} activityTimes={this.props.activity.time} isPaused={this.state.isPaused} />}
          <CancelButton style={styles.smallButton} cancelActivity={this.cancelActivity} />
          <PauseButton style={styles.smallButton} pauseActivity={this.pauseActivity} resumeActivity={this.resumeActivity} isPaused={this.state.isPaused} />
          <CompleteButton style={styles.largeButton} isCompletable={this.state.isCompletable} completeActivity={this.completeActivity} />
        </View>}
        <RewardsModal
          currentActivity={this.props.currentActivity}
          activities={this.props.activities}
          nextPress={this.nextActivity}
          backPress={this.backToMenu} />
      </View>
    )
  }
}

export default connect(
  state => ({
    progressType: state.settings.activityProgressType,
    showTimer: state.settings.activityShowTimer,
    activity: state.game.routines[state.game.currentRoutine].activities[state.game.currentActivity],
    activities: state.game.routines[state.game.currentRoutine].activities,
    currentActivity: state.game.currentActivity
  }),
  dispatch => ({
    setActivityStatus: (activity, status) => dispatch(setActivityStatus(activity, status)),
    nextActivity: () => dispatch(nextActivity()),
    addStars: stars => dispatch(addStars(stars))
  })
)(ActivityScreen)

ActivityScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  progressType: PropTypes.string.isRequired,
  showTimer: PropTypes.bool.isRequired,
  currentActivity: PropTypes.number.isRequired,
  activities: PropTypes.array.isRequired,
  activity: PropTypes.object.isRequired,
  setActivityStatus: PropTypes.func.isRequired,
  nextActivity: PropTypes.func.isRequired,
  addStars: PropTypes.func.isRequired
}
