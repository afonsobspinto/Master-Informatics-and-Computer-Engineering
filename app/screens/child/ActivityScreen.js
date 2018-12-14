import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setActivityStatus, nextActivity } from '../../actions/gameActions'
import { addStars } from '../../actions/childActions'
import { Image, Text, View, StatusBar, BackHandler } from 'react-native'
import EnvVars from '../../constants/EnviromentVars'

import { ProgressBar } from '../../components/Activity/ProgressBar'
import { ProgressClock } from '../../components/Activity/ProgressClock'
import { CompleteButton } from '../../components/Activity/CompleteButton'
import { PauseButton } from '../../components/Activity/PauseButton'
import { CancelButton } from '../../components/Activity/CancelButton'
import { RewardsModal } from '../../components/RewardsModal/RewardsModal'
import { getSource } from '../../helpers/GetSource'

import styles from '../../styles/Activity.style'

export class ActivityScreen extends Component {
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

  intervalFunction = () => {
    if (this.state.isPaused) return
    if (this.state.elapsedTime >= this.props.activity.time.max) this.completeActivity()
    if (this.state.elapsedTime >= this.props.activity.time.min) {
      this.state.isCompletable = true
    }

    this.setState(() => {
      return { elapsedTime: this.state.elapsedTime + this.state.updateRate / 1000 }
    })
  }

  createHistory () {
    fetch(EnvVars.apiUrl + 'routine_manager/add-history/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: this.props.child.id,
        userEmail: this.props.loggedUserEmail,
        routineTitle: this.props.routine.title,
        activityTitle: this.props.activity.title,
        rewardGained: this.props.activity.status.reward,
        elapsedTime: this.state.elapsedTime,
        timeStamp: Date.now()
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === '200') {

        } else {

        }
        return responseJson
      })
      .catch((error) => {
        console.error(error)
      })
  }

  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', this.cancelActivity)
    this.interval = setInterval(this.intervalFunction, this.state.updateRate)
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
    if (this.props.activities.every(activity => activity.status !== undefined)) {
      this.props.navigation.replace('RoutineBonusScreen')
    } else {
      this.props.nextActivity()
      this.props.navigation.replace('Activity')
    }
  }

  backToMenu () {
    if (this.props.activity.status) this.props.addStars(this.props.activity.status.reward)
    this.props.navigation.popToTop()
  }

  resumeActivity () {
    this.setState(() => ({ isPaused: false }))
  }

  render () {
    return (
      <View style={[{ backgroundColor: this.props.activity.color }, styles.activityScreen]} >
        <StatusBar hidden />
        <Image
          style={this.state.isPhoto ? styles.photo : styles.image}
          resizeMode={this.state.isPhoto ? 'cover' : 'center'}
          source={getSource(this.props.activity)} />
        <View style={styles.titleContainer}>
          <Text style={this.state.isPhoto ? styles.photoTitle : styles.title}>{this.props.activity.title}</Text>
        </View>
        {this.props.progressType === 'clock' && !this.state.isCompleted && <ProgressClock showTimer={this.props.showTimer} activityFeedback={this.props.activityFeedback} playSounds={this.props.playSounds} feedbackFrequency={this.props.feedbackFrequency} elapsedTime={this.state.elapsedTime} activityTimes={this.props.activity.time} isPaused={this.state.isPaused} />}
        {!this.state.isCompleted && <View style={styles.buttonContainer}>
          {this.props.progressType === 'bar' && <ProgressBar showTimer={this.props.showTimer} activityFeedback={this.props.activityFeedback} playSounds={this.props.playSounds} feedbackFrequency={this.props.feedbackFrequency} elapsedTime={this.state.elapsedTime} activityTimes={this.props.activity.time} isPaused={this.state.isPaused} />}
          <CancelButton cancelActivity={this.cancelActivity} />
          <PauseButton pauseActivity={this.pauseActivity} resumeActivity={this.resumeActivity} isPaused={this.state.isPaused} />
          <CompleteButton isCompletable={this.state.isCompletable} completeActivity={this.completeActivity} />
        </View>}
        <RewardsModal
          currentActivity={this.props.currentActivity}
          activities={this.props.activities}
          level={this.props.child.level}
          xp={this.props.child.xp}
          nextPress={this.nextActivity}
          backPress={this.backToMenu}
          playSounds={this.props.playSounds} />
      </View>
    )
  }
}

export default connect(
  /* istanbul ignore next */
  state => ({
    progressType: state.settings.activityProgressType,
    showTimer: state.settings.activityShowTimer,
    activityFeedback: state.settings.activityFeedback,
    playSounds: state.settings.playSounds,
    feedbackFrequency: state.settings.feedbackFrequency,
    activity: state.game.routines[state.game.currentRoutine].activities[state.game.currentActivity],
    activities: state.game.routines[state.game.currentRoutine].activities,
    routine: state.game.routines[state.game.currentRoutine],
    currentActivity: state.game.currentActivity,
    loggedUserEmail: state.user.email,
    child: state.child
  }),
  /* istanbul ignore next */
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
  activityFeedback: PropTypes.string.isRequired,
  playSounds: PropTypes.bool.isRequired,
  feedbackFrequency: PropTypes.string.isRequired,
  currentActivity: PropTypes.number.isRequired,
  activities: PropTypes.array.isRequired,
  activity: PropTypes.object.isRequired,
  setActivityStatus: PropTypes.func.isRequired,
  nextActivity: PropTypes.func.isRequired,
  addStars: PropTypes.func.isRequired,
  child: PropTypes.object.isRequired,
  loggedUserEmail: PropTypes.string.isRequired,
  routine: PropTypes.object.isRequired
}
