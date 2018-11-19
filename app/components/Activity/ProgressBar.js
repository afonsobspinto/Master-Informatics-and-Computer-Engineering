import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import styles, { buttonHeight, timerBar } from '../../styles/Activity.style'
import { Timer } from './Timer'
import * as colors from '../../styles/Colors'

import * as Progress from 'react-native-progress'

export class ProgressBar extends React.Component {
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
      <View style={styles.progressBarContainer}>
        <Progress.Bar
          width={null}
          height={buttonHeight / 1.5}
          borderRadius={0}
          borderWidth={0}
          progress={this.props.elapsedTime / this.times.max}
          color={this.state.color}
        />
        <View style={[{ left: `${this.times.min / this.times.max * 100}%` }, styles.progressBarDivider]} />
        <View style={[{ left: `${this.times.goal / this.times.max * 100}%` }, styles.progressBarDivider]} />
        <View style={[{ left: `${(this.times.goal + (this.times.max - this.times.goal) / 2) / this.times.max * 100}%` }, styles.progressBarDivider]} />
        {this.props.showTimer && <Timer style={timerBar} elapsedTime={this.props.elapsedTime} />}
      </View>
    )
  }
}

ProgressBar.propTypes = {
  elapsedTime: PropTypes.number.isRequired,
  activityTimes: PropTypes.object.isRequired,
  isPaused: PropTypes.bool.isRequired,
  showTimer: PropTypes.bool.isRequired
}
