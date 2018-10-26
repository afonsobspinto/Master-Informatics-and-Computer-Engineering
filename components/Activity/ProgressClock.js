import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import styles, { clockHeight } from '../../styles/Activity.style'
import * as colors from '../../styles/Colors'

import * as Progress from 'react-native-progress'

export class ProgressClock extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      color: colors.darkGray
    }
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  componentWillReceiveProps (props) {
    if (props.progress >= 0.85) this.setState(() => ({ color: colors.red }))
    else if (props.progress >= 0.6) this.setState(() => ({ color: colors.yellow }))
    else if (props.progress > 0.2) this.setState(() => ({ color: colors.green }))

    if (props.isPaused) this.setState(() => ({ color: colors.darkGray }))
  }

  render () {
    return (
      <View style={styles.progressClockContainer}>
        <Progress.Circle
          progress={this.props.progress}
          size={clockHeight}
          thickness={clockHeight / 2}
          color={this.state.color}
          unfilledColor={colors.gray}
          borderWidth={0}
        />
      </View>
    )
  }
}

ProgressClock.propTypes = {
  progress: PropTypes.number.isRequired,
  isPaused: PropTypes.bool.isRequired
}
