import React, { Component } from 'react'
import { Text, View, Image, StatusBar, StyleSheet, TouchableOpacity } from 'react-native'
import { ScreenOrientation } from 'expo'

import * as Progress from 'react-native-progress'
import { ActivityButtons } from '../components/ActivityButtons'

export default class SingleActivityClockScreen extends Component {
  constructor (props) {
    super(props)
    this.pauseActivity = this.pauseActivity.bind(this)
  }

  state = {
    progress: 0,
    taskDurationMinutes: 2,
    taskTitle: 'Lavar os dentes',
    color: 'rgb(169,169,169)',
    updateRate: 0.5,
    isPaused: false
  }

  componentDidMount () {
    ScreenOrientation.allow(ScreenOrientation.Orientation.LANDSCAPE_RIGHT)

    const interval = setInterval(() => {
      if (this.state.isPaused === true) return
      if (this.state.progress >= 1) return clearInterval(interval)
      if (this.state.progress > 0.2) this.state.color = 'green'
      if (this.state.progress >= 0.6 && this.state.progress < 0.85) this.state.color = 'orange'
      if (this.state.progress >= 0.85) this.state.color = 'red'

      if (!this.state.isPaused) {
        this.setState(() => {
          return { progress: this.state.progress + this.state.updateRate / (this.state.taskDurationMinutes * 60) }
        })
      }
    }, this.state.updateRate * 1000)
  }

  componentWillUnmount () {
    ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT)
  }

  pauseActivity () {
    this.setState(() => { return { isPaused: true } })
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
      return (
        <View style={styles.flexColumn}>
          <StatusBar hidden />
          <View style={{ flex: 1, flexDirection: 'row', marginHorizontal: 10, marginTop: 10 }} >
            <View style={styles.flexColumn}>
              <View style={[{ height: 50, backgroundColor: '#7986CB' }, styles.centerItem]} >
                <Text style={styles.taskName} >{ this.state.taskTitle }</Text>
              </View>
              <View style={[{ height: 40, backgroundColor: '#3F51B5' }, styles.centerItem]} >
                <Text style={styles.taskDuration} >{ this.state.taskDurationMinutes } minutos</Text>
              </View>
            </View>
          </View>
          <View style={{ flex: 3, flexDirection: 'row', marginLeft: 10, marginBottom: 10 }}>
            <View style={[{ flex: 2, backgroundColor: '#C5CAE9' }, styles.centerItem]} >
              <Image style={styles.themeImage} source={require('../assets/images/act-brush-teeth.png')} />
            </View>
            <View style={{ flex: 3, flexDirection: 'row', marginRight: 10 }} >
              <View style={styles.flexColumn}>
                <View style={[{ flex: 3 }, styles.centerItem]}>
                  <Progress.Circle
                    progress={this.state.progress}
                    size={125}
                    thickness={60}
                    color={this.state.color}
                    borderColor={'#7986CB'}
                    borderWidth={3}
                  />
                </View>
                <View style={{ flex: 2, flexDirection: 'row' }}>
                  <ActivityButtons pauseActivity={this.pauseActivity} />
                </View>
              </View>
            </View>
          </View>
        </View>
      )
    }
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
    borderRightColor: 'black',
    borderRightWidth: 4
  },
  centerItem: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  themeImage: {
    width: 200,
    height: 200
  },
  taskName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 32
  },
  taskDuration: {
    color: 'white',
    fontSize: 16
  },
  flexColumn: {
    flex: 1,
    flexDirection: 'column'
  },
  resumeButton: {
    tintColor: '#303F9F',
    width: 150,
    height: 150
  }
})
