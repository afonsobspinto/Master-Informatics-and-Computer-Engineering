import React, { Component } from 'react'
import { Text, View, Image, StatusBar, StyleSheet, TouchableOpacity } from 'react-native'
import { ScreenOrientation } from 'expo'

import { ActivityButtons } from '../components/ActivityButtons'
import { ActivityProgressBar } from '../components/ActivityProgressBar'

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
      color: 'grey',
      updateRate: 0.075,
      isPaused: false
    }

    componentDidMount () {
      ScreenOrientation.allow(ScreenOrientation.Orientation.LANDSCAPE_RIGHT)

      this.interval = setInterval(() => {
        if (this.state.isPaused) return
        if (this.state.progress >= 1) return this.cancelActivity()
        if (this.state.progress > 0.2) this.state.color = 'green'
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
        return (
          <View style={styles.flexColumn} >
            <StatusBar hidden />
            <ActivityProgressBar
              progress={this.state.progress}
              color={this.state.color}
              updateRate={this.state.updateRate}
              duration={this.state.taskDurationMinutes}
            />
            <View style={{ flex: 1, flexDirection: 'row', marginHorizontal: 10, marginBottom: 10 }} >
              <View style={[{ width: 250, backgroundColor: '#C5CAE9' }, styles.centerItem]} >
                <Image style={styles.themeImage} source={require('../assets/images/act-brush-teeth.png')} />
              </View>
              <View style={styles.flexColumn} >
                <View style={[{ marginHorizontal: 1, height: 70, backgroundColor: '#7986CB' }, styles.centerItem]} >
                  <Text style={styles.taskName} >{ this.state.taskTitle }</Text>
                </View>
                <View style={[{ marginHorizontal: 1, height: 60, backgroundColor: '#3F51B5' }, styles.centerItem]} >
                  <Text style={styles.taskDuration} >{ this.state.taskDurationMinutes } minutos</Text>
                </View>
                <ActivityButtons pauseActivity={this.pauseActivity} cancelActivity={this.cancelActivity} completeActivity={this.completeActivity} />
              </View>
            </View>
          </View>
        )
      }
    }
}

const styles = StyleSheet.create({
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
  resumeButton: {
    tintColor: '#303F9F',
    width: 150,
    height: 150
  }
})
