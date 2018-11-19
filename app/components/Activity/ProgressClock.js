import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import styles, { clockHeight, timerClock } from '../../styles/Activity.style'
import { Timer } from './Timer'
import * as colors from '../../styles/Colors'

import * as Progress from 'react-native-progress'

export class ProgressClock extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      color: colors.darkGray
    }
    this.times = props.activityTimes
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  componentWillReceiveProps (props) {
    if (props.elapsedTime >= this.times.goal + (this.times.max - this.times.goal) / 2) this.setState(() => ({ color: colors.red }))
    else if (props.elapsedTime >= this.times.goal) this.setState(() => ({ color: colors.yellow }))
    else if (props.elapsedTime > this.times.min) this.setState(() => ({ color: colors.green }))

    if (props.isPaused) this.setState(() => ({ color: colors.darkGray }))
  }

  render () {
    return (
      <View style={styles.progressClockContainer}>
        <Progress.Circle
          progress={this.props.elapsedTime / this.times.max}
          size={clockHeight}
          thickness={clockHeight / 2}
          color={this.state.color}
          unfilledColor={colors.gray}
          borderWidth={0}
        />
        {this.props.showTimer && <Timer style={timerClock} elapsedTime={this.props.elapsedTime} />}
      </View>
    )
  }
}

ProgressClock.propTypes = {
  elapsedTime: PropTypes.number.isRequired,
  activityTimes: PropTypes.object.isRequired,
  isPaused: PropTypes.bool.isRequired,
  showTimer: PropTypes.bool.isRequired
}
