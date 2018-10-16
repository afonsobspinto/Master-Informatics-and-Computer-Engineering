import React from 'react'
import { View, StyleSheet } from 'react-native'

import * as Progress from 'react-native-progress'

export class ActivityProgressBar extends React.Component {
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
      <View style={{ alignSelf: 'stretch', margin: 10, height: 70, backgroundColor: '#3F51B5' }} >
        <Progress.Bar
          width={null}
          height={70}
          borderRadius={0}
          borderWidth={0}
          progress={this.state.progress}
          color={this.state.color}
        />
        <View style={styles.progressBarOverlay}>
          <View style={[{ flex: 0.61 }, styles.progressBarDivider]} />
          <View style={[{ flex: 0.26 }, styles.progressBarDivider]} />
          <View style={{ flex: 0.14 }} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  progressBarOverlay: {
    flexDirection: 'row',
    height: 70,
    left: 0,
    right: 0,
    position: 'absolute'
  },
  progressBarDivider: {
    borderRightColor: 'gray',
    borderRightWidth: 4,
    opacity: 0.5
  }
})
