import React, { Component } from 'react'
import { Text, View, Image, StatusBar, StyleSheet, TouchableOpacity } from 'react-native'
import { ScreenOrientation } from 'expo'

import AnimatedBar from 'react-native-animated-bar'

export default class SingleActivity extends Component {
  state = {
    progress: 0,
    taskDurationMinutes: 1,
    taskTitle: 'Lavar os dentes',
    color: 'grey',
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
        this.setState(state => {
          return { progress: this.state.progress + this.state.updateRate / (this.state.taskDurationMinutes * 60) }
        })
      }
    }, this.state.updateRate * 1000)
  }
  componentWillUnmount () {
    ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT)
  }
  pauseActivity () {
    this.setState(state => { return { isPaused: true } })
  }
  resumeActivity () {
    this.setState(state => { return { isPaused: false } })
  }
  render () {
    if (this.state.isPaused === true) {
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
        <View style={styles.flexColumn} >
          <StatusBar hidden />
          <View style={[{ alignSelf: 'stretch', margin: 10, height: 70, backgroundColor: '#3F51B5' }, styles.centerItem]} >
            <AnimatedBar
              progress={this.state.progress}
              height={70}
              borderColor='white'
              barColor={this.state.color}
              duration={50}
            />
            <View style={styles.progressBarOverlay}>
              <View style={[{ flex: 0.61 }, styles.progressBarDivider]} />
              <View style={[{ flex: 0.26 }, styles.progressBarDivider]} />
              <View style={{ flex: 0.14 }} />
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', marginHorizontal: 10, marginBottom: 10 }} >
            <View style={[{ width: 250, backgroundColor: '#C5CAE9' }, styles.centerItem]} >
              <Image style={styles.themeImage} source={require('../assets/images/act-brush-teeth.png')} />
            </View>
            <View style={styles.flexColumn} >
              <View style={[{ height: 70, backgroundColor: '#7986CB' }, styles.centerItem]} >
                <Text style={styles.taskName} >{ this.state.taskTitle }</Text>
              </View>
              <View style={[{ height: 60, backgroundColor: '#3F51B5' }, styles.centerItem]} >
                <Text style={styles.taskDuration} >{ this.state.taskDurationMinutes } minutos</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row' }} >
                <View style={[{ flex: 0.95 }, styles.buttonBackground]} >
                  <TouchableOpacity onPress={() => this.pauseActivity()}>
                    <Image style={styles.pauseButton} source={require('../assets/images/nav-pause.png')} />
                  </TouchableOpacity>
                </View>
                <View style={[{ flex: 1 }, styles.buttonBackground]} >
                  <TouchableOpacity>
                    <Image style={styles.cancelButton} source={require('../assets/images/nav-cancel.png')} />
                  </TouchableOpacity>
                </View>
                <View style={[{ flex: 1 }, styles.buttonBackground]} >
                  <TouchableOpacity>
                    <Image style={styles.confirmButton} source={require('../assets/images/nav-complete.png')} />
                  </TouchableOpacity>
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
    fontSize: 35
  },
  taskDuration: {
    color: 'white',
    fontSize: 18
  },
  flexColumn: {
    flex: 1,
    flexDirection: 'column'
  },
  buttonBackground: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#303F9F'
  },
  pauseButton: {
    tintColor: 'white',
    width: 100,
    height: 90
  },
  cancelButton: {
    tintColor: 'white',
    width: 80,
    height: 80
  },
  confirmButton: {
    tintColor: 'white',
    width: 80,
    height: 80
  },
  resumeButton: {
    tintColor: '#303F9F',
    width: 150,
    height: 150
  }
})
