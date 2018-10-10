import React, { Component } from 'react'
import { Text, View, Image, StatusBar, StyleSheet } from 'react-native'
import { ScreenOrientation } from 'expo'

import AnimatedBar from 'react-native-animated-bar'

export default class SingleActivity extends Component {
  state = {
    progress: 0,
    taskDurationMinutes: 15,
    taskTitle: 'Lavar os dentes',
    color: 'grey',
    updateRate: 0.5
  }
  componentDidMount () {
    ScreenOrientation.allow(ScreenOrientation.Orientation.LANDSCAPE_RIGHT)

    const interval = setInterval(() => {
      if (this.state.progress >= 1) return clearInterval(interval)
      if (this.state.progress > 0.2) this.state.color = 'green'
      if (this.state.progress > 0.6 && this.state.progress < 0.85) this.state.color = 'orange'
      if (this.state.progress > 0.85) this.state.color = 'red'

      this.setState(state => {
        return { progress: this.state.progress + this.state.updateRate / (this.state.taskDurationMinutes * 60) }
      })
    }, this.state.updateRate * 1000)
  }
  componentWillUnmount () {
    ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT)
  }
  render () {
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
                <Image style={styles.pauseButton} source={require('../assets/images/nav-pause.png')} />
              </View>
              <View style={[{ flex: 1 }, styles.buttonBackground]} >
                <Image style={styles.cancelButton} source={require('../assets/images/nav-cancel.png')} />
              </View>
              <View style={[{ flex: 1 }, styles.buttonBackground]} >
                <Image style={styles.confirmButton} source={require('../assets/images/nav-complete.png')} />
              </View>
            </View>
          </View>
        </View>
      </View>
    )
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
  }
})
