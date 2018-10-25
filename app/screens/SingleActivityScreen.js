import React, { Component } from 'react'
import { Text, View, Image, StatusBar, TouchableOpacity } from 'react-native'
import { ScreenOrientation } from 'expo'

import { ActivityButtons } from '../components/ActivityButtons'
import { ActivityProgressBar } from '../components/ActivityProgressBar'
import { ActivityProgressClock } from '../components/ActivityProgressClock'
import styles from '../styles/SingleActivityScreen.style'

export default class SingleActivityScreen extends Component {
  constructor (props) {
    super(props)
    this.pauseActivity = this.pauseActivity.bind(this)
    this.cancelActivity = this.cancelActivity.bind(this)
    this.completeActivity = this.completeActivity.bind(this)
  }

  static navigationOptions = {
    header: null
  }

  state = {
    progress: 0,
    taskDurationMinutes: 0.1,
    taskTitle: 'Lavar os dentes',
    color: 'rgb(128,128,128)',
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
        this.state.color = 'green'
        this.state.isCompletable = true
      }
      if (this.state.progress >= 0.6 && this.state.progress < 0.85) this.state.color = 'orange'
      if (this.state.progress >= 0.85) this.state.color = 'red'

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
    this.setState(() => { return { isPaused: true } })
  }

  cancelActivity () {
    this.props.navigation.goBack()
  }

  completeActivity () {
    this.props.navigation.goBack()
  }

  resumeActivity () {
    this.setState(() => { return { isPaused: false } })
  }

  render () {
    if (this.state.isPaused) {
      return (
        <View style={[{ flex: 1 }, styles.centerItem]}>
          <StatusBar hidden />
          <TouchableOpacity onPress={() => this.resumeActivity()}>
            <Image style={styles.resumeButton} source={require('../assets/images/resume-button.png')} />
          </TouchableOpacity>
        </View>
      )
    } else {
      if (this.state.progressType === 'bar') {
        return (
          <View style={styles.flexColumn} >
            <StatusBar hidden />
            <ActivityProgressBar progress={this.state.progress} color={this.state.color} updateRate={this.state.updateRate} duration={this.state.taskDurationMinutes} />
            <View style={{ flex: 1, flexDirection: 'row', marginHorizontal: 10, marginBottom: 10 }} >
              <View style={[{ width: 250, backgroundColor: '#C5CAE9' }, styles.centerItem]} >
                <Image style={styles.themeImage} source={require('../assets/images/act-brush-teeth.png')} />
              </View>
              <View style={styles.flexColumn} >
                <View style={[{ marginHorizontal: 1, height: 70, backgroundColor: '#7986CB' }, styles.centerItem]} >
                  <Text style={styles.taskName} >{this.state.taskTitle}</Text>
                </View>
                <View style={[{ marginHorizontal: 1, height: 60, backgroundColor: '#3F51B5' }, styles.centerItem]} >
                  <Text style={styles.taskDuration} >{this.state.taskDurationMinutes} minutos</Text>
                </View>
                <ActivityButtons pauseActivity={this.pauseActivity} cancelActivity={this.cancelActivity} completeActivity={this.completeActivity} isCompletable={this.state.isCompletable} />
              </View>
            </View>
          </View>
        )
      } else if (this.state.progressType === 'clock') {
        return (
          <View style={styles.flexColumn}>
            <StatusBar hidden />
            <View style={{ flex: 1, flexDirection: 'row', marginHorizontal: 10, marginTop: 10 }} >
              <View style={styles.flexColumn}>
                <View style={[{ height: 50, backgroundColor: '#7986CB' }, styles.centerItem]} >
                  <Text style={styles.taskName} >{this.state.taskTitle}</Text>
                </View>
                <View style={[{ height: 40, backgroundColor: '#3F51B5' }, styles.centerItem]} >
                  <Text style={styles.taskDuration} >{this.state.taskDurationMinutes} minutos</Text>
                </View>
              </View>
            </View>
            <View style={{ flex: 3, flexDirection: 'row', marginLeft: 10, marginBottom: 10 }}>
              <View style={[{ flex: 2, backgroundColor: '#C5CAE9' }, styles.centerItem]} >
                <Image style={styles.themeImage} source={require('../assets/images/act-brush-teeth.png')} resizeMode='contain' />
              </View>
              <View style={{ flex: 3, flexDirection: 'row', marginRight: 10 }} >
                <View style={styles.flexColumn}>
                  <View style={[{ flex: 3 }, styles.centerItem]}>
                    <ActivityProgressClock progress={this.state.progress} color={this.state.color} updateRate={this.state.updateRate} duration={this.state.taskDurationMinutes} />
                  </View>
                  <View style={{ flex: 2, flexDirection: 'row' }}>
                    <ActivityButtons pauseActivity={this.pauseActivity} cancelActivity={this.cancelActivity} completeActivity={this.completeActivity} isCompletable={this.state.isCompletable} />
                  </View>
                </View>
              </View>
            </View>
          </View>
        )
      }
    }
  }
}
