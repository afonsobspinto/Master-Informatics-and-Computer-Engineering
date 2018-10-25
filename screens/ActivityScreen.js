import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import { ScreenOrientation } from 'expo'

// import { ActivityProgressBar } from '../components/ActivityProgressBar'
// import { ActivityProgressClock } from '../components/ActivityProgressClock'
import { CompleteButton } from '../components/Activity/CompleteButton'
import { PauseButton } from '../components/Activity/PauseButton'
import { CancelButton } from '../components/Activity/CancelButton'

import styles from '../styles/Activity.style'

export default class SingleActivityScreen extends Component {
  constructor (props) {
    super(props)
    this.pauseActivity = this.pauseActivity.bind(this)
    this.cancelActivity = this.cancelActivity.bind(this)
    this.completeActivity = this.completeActivity.bind(this)
    this.resumeActivity = this.resumeActivity.bind(this)
  }

  static navigationOptions = {
    header: null
  }

  state = {
    progress: 0,
    taskDurationMinutes: 0.1,
    taskTitle: 'Lavar os dentes',
    updateRate: 0.075,
    isPaused: false,
    isCompletable: false,
    progressType: this.props.navigation.state.params.progressType
  }

  componentDidMount () {
    ScreenOrientation.allow(ScreenOrientation.Orientation.LANDSCAPE_RIGHT)

    this.interval = setInterval(() => {
      if (this.state.isPaused) return
      if (this.state.progress >= 1) return this.cancelActivity()
      if (this.state.progress > 0.2) {
        this.state.isCompletable = true
      }

      this.setState(() => {
        return { progress: this.state.progress + this.state.updateRate / (this.state.taskDurationMinutes * 60) }
      })
    }, this.state.updateRate * 1000)
  }

  componentWillUnmount () {
    ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT)
    clearInterval(this.interval)
  }

  pauseActivity (e) {
    e.preventDefault()
    this.setState(() => ({ isPaused: true }))
  }

  cancelActivity () {
    this.props.navigation.goBack()
  }

  completeActivity () {
    this.props.navigation.goBack()
  }

  resumeActivity (e) {
    e.preventDefault()
    this.setState(() => ({ isPaused: false }))
  }

  render () {
    /* let progressComponent

    if (this.state.progressType === 'bar') {
      progressComponent =
        <ActivityProgressBar
          progress={this.state.progress}
          updateRate={this.state.updateRate}
          duration={this.state.taskDurationMinutes}
          isPaused={this.state.isPaused}
        />
    } else if (this.state.progressType === 'clock') {
      progressComponent =
        <ActivityProgressClock
          progress={this.state.progress}
          updateRate={this.state.updateRate}
          duration={this.state.taskDurationMinutes}
          isPaused={this.state.isPaused}
        />
    } */

    return (
      <View style={{ flex: 1, flexDirection: 'row' }} >
        <StatusBar hidden />
        {/* <View style={{ flex: 1, flexDirection: 'column', margin: 6, marginRight: 0 }} >
          <View style={[{ flex: 1.5, backgroundColor: '#7986CB' }, styles.centerItem]} >
            <Text style={styles.taskName} >{this.state.taskTitle}</Text>
          </View>
          <View style={[{ flex: 5, backgroundColor: '#C5CAE9' }, styles.centerItem]} >
            <Image style={styles.themeImage} source={require('../assets/images/act-brush-teeth.png')} />
          </View>
        </View>
        <View style={{ flex: 1, flexDirection: 'column', margin: 6, marginLeft: 0 }} >
          <View style={[{ flex: 5 }, styles.centerItem]} >
            {progressComponent}
          </View>
          <View style={{ flex: 3 }} >
            <ActivityButtons
              activityPaused={this.state.isPaused}
              pauseActivity={this.pauseActivity}
              resumeActivity={this.resumeActivity}
              cancelActivity={this.cancelActivity}
              completeActivity={this.completeActivity}
              isCompletable={this.state.isCompletable}
            />
          </View>
        </View> */}
        <View style={styles.buttonContainer}>
          <CancelButton style={styles.smallButton} cancelActivity={this.cancelActivity} />
          <PauseButton style={styles.smallButton} pauseActivity={this.pauseActivity} resumeActivity={this.resumeActivity} isPaused={this.state.isPaused} />
          <CompleteButton style={styles.largeButton} isCompletable={this.state.isCompletable} completeActivity={this.completeActivity} />
        </View>
      </View>
    )
  }
}
