import React from 'react'
import { View } from 'react-native'
import styles from '../../styles/Activity.style'
import * as colors from '../../styles/Colors'

import * as Progress from 'react-native-progress'

export class ProgressBar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      color: colors.darkGray
    }

    this.interval = setInterval(() => {
      if (this.props.progress >= 0.85) this.setState(() => ({ color: colors.red }))
      else if (this.props.progress >= 0.6) this.setState(() => ({ color: colors.yellow }))
      else if (this.props.progress > 0.2) this.setState(() => ({ color: colors.green }))

      if (!this.props.isPaused) this.setState(() => ({ progress: this.props.progress + this.props.updateRate / (this.props.duration * 60) }))
      else this.setState(() => ({ color: colors.darkGray }))
    }, this.props.updateRate * 1000)
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  render () {
    return (
      <View style={styles.progressBarContainer}>
        <Progress.Bar
          width={null}
          height={70}
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
