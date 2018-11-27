import React from 'react'
import { View, Vibration, Animated } from 'react-native'
import { Audio } from 'expo'
import PropTypes from 'prop-types'
import styles, { buttonHeight, timerBar } from '../../styles/Activity.style'
import { Timer } from './Timer'
import * as colors from '../../styles/Colors'
import Layout from '../../constants/Layout'

import * as Progress from 'react-native-progress'

const SUCCESS_COLOR = 'red'
const ORIGINAL_COLOR = 'transparent'
const ORIGINAL_VALUE = 0
const SUCCESS_VALUE = 1

export class ProgressBar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      color: colors.darkGray,
      playedFeedback: false,
      feedbackCycles: 0
    }
    this.times = props.activityTimes
    this.frequency = 0
    this.feedbackBorderWidth = 0
    this.feedbackElevation = new Animated.Value(6)
    this.borderColor = new Animated.Value(ORIGINAL_VALUE)
    this.borderWidth = new Animated.Value(0)
  }

  componentWillUnmount () {
    Vibration.cancel()
    clearInterval(this.interval)
  }

  componentDidMount () {
    this.assignFeedbackFrequency()
  }

  assignFeedbackFrequency () {
    switch (this.props.feedbackFrequency) {
      case 'slow':
        this.frequency = 3
        break
      case 'normal':
        this.frequency = 2
        break
      case 'fast':
        this.frequency = 1
        break
      default:
        break
    }
  }

  playSound = async () => {
    const soundObject = new Audio.Sound()
    try {
      await soundObject.loadAsync(require('../../assets/sounds/alarmclockbeeps.mp3'))
      this.audioPlayer1 = soundObject
      this.audioPlayer1.playAsync()
      this.audioPlayer1.setPositionAsync(0)
      this.audioPlayer1.setRateAsync(3, false)
    } catch (error) { }
  }

  borderFeedback = () => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(this.feedbackElevation, {
          duration: 700,
          toValue: 20
        }),
        Animated.timing(this.borderColor, {
          duration: 700,
          toValue: SUCCESS_VALUE
        }),
        Animated.timing(this.borderWidth, {
          duration: 700,
          toValue: 3
        })
      ]),

      Animated.parallel([
        Animated.timing(this.feedbackElevation, {
          duration: 700,
          toValue: 6
        }),
        Animated.timing(this.borderColor, {
          duration: 700,
          toValue: ORIGINAL_VALUE
        }),
        Animated.timing(this.borderWidth, {
          duration: 700,
          toValue: 0
        })
      ])
    ]).start()
  }

  activityFeedback () {
    if (this.props.activityFeedback === 'visual') {
      this.borderFeedback()
    } else if (this.props.activityFeedback === 'sound') {
      this.playSound()
    } else if (this.props.activityFeedback === 'vibration') {
      try {
        Vibration.vibrate(250, true)
      } catch (error) {
        console.log('This device cannot vibrate')
      }
    }
  }

  componentWillReceiveProps (props) {
    console.log('this.state.playedFeedback = ' + this.state.playedFeedback)
    if (props.elapsedTime >= this.times.goal + (this.times.max - this.times.goal) / 2) {
      this.setState(() => ({ color: colors.red }))

      if (!this.state.playedFeedback || this.state.feedbackCycles % (15 * this.frequency) === 0) {
        this.activityFeedback()
        this.setState(() => ({ playedFeedback: true, feedbackCycles: this.state.feedbackCycles + 1 }))
      } else {
        this.setState(() => ({ feedbackCycles: this.state.feedbackCycles + 1 }))
      }
    } else if (props.elapsedTime >= this.times.goal) this.setState(() => ({ color: colors.yellow }))
    else if (props.elapsedTime > this.times.min) this.setState(() => ({ color: colors.green }))

    if (props.isPaused) {
      this.setState(() => ({ color: colors.darkGray }))
      Vibration.cancel()
    }
  }

  render () {
    let feedbackBorderColor = this.borderColor.interpolate({
      inputRange: [ORIGINAL_VALUE, SUCCESS_VALUE],
      outputRange: [ORIGINAL_COLOR, SUCCESS_COLOR]
    })

    return (
      <Animated.View style={[styles.progressBarContainer, { elevation: this.feedbackElevation, borderColor: feedbackBorderColor, borderWidth: this.borderWidth }]}>
        <Progress.Bar
          width={null}
          height={buttonHeight / 1.5}
          borderRadius={Layout.window.height * 0.24 / 3}
          borderWidth={this.feedbackBorderWidth}
          borderColor={'red'}
          progress={this.props.elapsedTime / this.times.max}
          color={this.state.color}
        />
        <View style={[{ left: `${this.times.min / this.times.max * 100}%` }, styles.progressBarDivider]} />
        <View style={[{ left: `${this.times.goal / this.times.max * 100}%` }, styles.progressBarDivider]} />
        <View style={[{ left: `${(this.times.goal + (this.times.max - this.times.goal) / 2) / this.times.max * 100}%` }, styles.progressBarDivider]} />
        {this.props.showTimer && <Timer style={timerBar} remainingTime={this.times.max - this.props.elapsedTime} />}
      </Animated.View>
    )
  }
}

ProgressBar.propTypes = {
  elapsedTime: PropTypes.number.isRequired,
  activityTimes: PropTypes.object.isRequired,
  isPaused: PropTypes.bool.isRequired,
  showTimer: PropTypes.bool.isRequired,
  activityFeedback: PropTypes.string.isRequired,
  feedbackFrequency: PropTypes.string.isRequired
}
