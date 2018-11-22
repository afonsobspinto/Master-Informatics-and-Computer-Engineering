import React from 'react'
import { Vibration, Animated } from 'react-native'
import { Audio } from 'expo'
import PropTypes from 'prop-types'
import styles, { clockHeight, timerClock } from '../../styles/Activity.style'
import { Timer } from './Timer'
import * as colors from '../../styles/Colors'

import * as Progress from 'react-native-progress'

const SUCCESS_COLOR = 'red'
const ORIGINAL_COLOR = 'black'
const ORIGINAL_VALUE = 0
const SUCCESS_VALUE = 1

export class ProgressClock extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      color: colors.darkGray,
      playedFeedback: false,
      feedbackCycles: 0
    }
    this.times = props.activityTimes
    this.feedbackBorderWidth = 0
    this.feedbackElevation = new Animated.Value(6)
    this.borderColor = new Animated.Value(ORIGINAL_VALUE)
    this.borderWidth = new Animated.Value(0)
  }

  componentWillUnmount () {
    Vibration.cancel()
    clearInterval(this.interval)
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
      Vibration.vibrate(250, true)
    }
  }

  componentWillReceiveProps (props) {
    if (props.elapsedTime >= this.times.goal + (this.times.max - this.times.goal) / 2) {
      this.setState(() => ({ color: colors.red }))

      if (!this.state.playedFeedback || this.state.feedbackCycles % 25 === 0) {
        this.activityFeedback()
        this.setState(() => ({ playedFeedback: true, feedbackCycles: this.state.feedbackCycles + 1 }))
      } else {
        this.setState(() => ({ feedbackCycles: this.state.feedbackCycles + 1 }))
      }
    } else if (props.elapsedTime >= this.times.goal) this.setState(() => ({ color: colors.yellow }))
    else if (props.elapsedTime > this.times.min) this.setState(() => ({ color: colors.green }))

    if (props.isPaused) this.setState(() => ({ color: colors.darkGray }))
  }

  render () {
    let feedbackBorderColor = this.borderColor.interpolate({
      inputRange: [ORIGINAL_VALUE, SUCCESS_VALUE],
      outputRange: [ORIGINAL_COLOR, SUCCESS_COLOR]
    })

    return (
      <Animated.View style={[styles.progressClockContainer, { elevation: this.feedbackElevation, backgroundColor: feedbackBorderColor }]}>
        <Progress.Circle
          progress={this.props.elapsedTime / this.times.max}
          size={clockHeight}
          thickness={clockHeight / 2}
          color={this.state.color}
          unfilledColor={colors.gray}
          borderWidth={0}
        />
        {this.props.showTimer && <Timer style={timerClock} elapsedTime={this.props.elapsedTime} />}
      </Animated.View>
    )
  }
}

ProgressClock.propTypes = {
  elapsedTime: PropTypes.number.isRequired,
  activityTimes: PropTypes.object.isRequired,
  isPaused: PropTypes.bool.isRequired,
  showTimer: PropTypes.bool.isRequired,
  activityFeedback: PropTypes.string.isRequired
}
