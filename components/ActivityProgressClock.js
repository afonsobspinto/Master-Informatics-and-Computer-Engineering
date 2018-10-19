import React from 'react'
import { View } from 'react-native'

import * as Progress from 'react-native-progress'

export class ActivityProgressClock extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      progress: this.props.progress,
      color: 'gray',
      updateRate: this.props.updateRate,
      duration: this.props.duration,
      isPaused: this.props.isPaused
    }

    this.interval = setInterval(() => {
      if (this.props.progress > 0.2) this.state.color = 'green'
      if (this.props.progress >= 0.6 && this.props.progress < 0.85) this.state.color = 'orange'
      if (this.props.progress >= 0.85) this.state.color = 'red'

      if (!this.props.isPaused) {
        this.setState(() => {
          return { progress: this.props.progress + this.props.updateRate / (this.props.duration * 60) }
        })
      }
    }, this.props.updateRate * 1000)
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  render () {
    return (
      <View>
        <Progress.Circle
          progress={this.props.progress}
          size={125}
          thickness={60}
          color={this.state.color}
          borderColor={'#7986CB'}
          borderWidth={2}
        />
      </View>
    )
  }
}
