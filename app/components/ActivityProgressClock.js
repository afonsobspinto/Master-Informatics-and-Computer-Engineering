import React from 'react'
import { View } from 'react-native'

import * as Progress from 'react-native-progress'

export class ActivityProgressClock extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      progress: this.props.progress,
      color: this.props.color,
      updateRate: this.props.updateRate,
      duration: this.props.duration
    }

    this.interval = setInterval(() => {
      if (this.state.progress > 0.2) this.state.color = 'green'
      if (this.state.progress >= 0.6 && this.state.progress < 0.85) this.state.color = 'orange'
      if (this.state.progress >= 0.85) this.state.color = 'red'

      this.setState(() => {
        return { progress: this.state.progress + this.state.updateRate / (this.state.duration * 60) }
      })
    }, this.state.updateRate * 1000)
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  render () {
    return (
      <View>
        <Progress.Circle
          progress={this.state.progress}
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
