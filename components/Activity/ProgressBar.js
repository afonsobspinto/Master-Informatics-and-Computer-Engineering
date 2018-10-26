import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import styles, { buttonHeight } from '../../styles/Activity.style'
import * as colors from '../../styles/Colors'

import * as Progress from 'react-native-progress'

export class ProgressBar extends React.Component {
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
      <View style={styles.progressBarContainer}>
        <Progress.Bar
          width={null}
          height={buttonHeight / 1.5}
          borderRadius={0}
          borderWidth={0}
          progress={this.props.progress}
          color={this.state.color}
        />
        <View style={[{ left: '20%' }, styles.progressBarDivider]} />
        <View style={[{ left: '60%' }, styles.progressBarDivider]} />
        <View style={[{ left: '85%' }, styles.progressBarDivider]} />
      </View>
    )
  }
}

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
  isPaused: PropTypes.bool.isRequired
}
