import React, { Component } from 'react'
import { View, StatusBar, StyleSheet, Image, Text } from 'react-native'
import { ScreenOrientation } from 'expo'

import { ChildExperienceBar } from '../components/ChildExperienceBar'
import Layout from '../constants/Layout'

export default class ChildMainMenuScreen extends Component {
  static navigationOptions = {
    header: null
  }

  componentDidMount () {
    ScreenOrientation.allow(ScreenOrientation.Orientation.LANDSCAPE_RIGHT)
  }

  componentWillUnmount () {
    ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT)
  }

  render () {
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <StatusBar hidden />
        <View style={{ flex: 1, flexDirection: 'column' }} >
          <View style={{ flex: 1, backgroundColor: '#7986CB' }} />
          <View style={{ flex: 2, flexDirection: 'row' }} >
            <View style={{ flex: 1, backgroundColor: '#7986CB' }} />
            <View style={{ flex: 5, backgroundColor: 'black' }} >
              <ChildExperienceBar />
            </View>
            <View style={{ flex: 1, backgroundColor: '#7986CB' }} />
          </View>
          <View style={{ flex: 1, backgroundColor: '#7986CB' }} />
          <View style={[styles.overlayPadding, styles.experienceBarOverlay]}>
            <View style={{ flex: 9 }} />
            <View style={{ flex: 1 }}>
              <View style={[styles.experienceBarCircle]}>
                <Text style={{ fontWeight: 'bold', fontSize: 22 }} >6</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{ flex: 3, flexDirection: 'row' }}>
          <View style={{ flex: 1, backgroundColor: '#C5CAE9', alignItems: 'center', justifyContent: 'center' }} >
            <Image style={{ width: 200, height: 200 }} source={require('../assets/images/placeholder-avatar.png')} resizeMode='contain' />
          </View>
          <View style={{ flex: 1, backgroundColor: '#C5CAE9' }} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  experienceBarOverlay: {
    flexDirection: 'row',
    height: Layout.window.height * 0.07,
    left: 0,
    right: 0,
    position: 'absolute'
  },
  overlayPadding: {
    paddingTop: Layout.window.height * 0.0675 / 2,
    paddingRight: Layout.window.height * 0.08
  },
  experienceBarCircle: {
    width: Layout.window.height * 0.085,
    height: Layout.window.height * 0.085,
    borderRadius: Layout.window.height * 0.085 / 2,
    backgroundColor: '#C5CAE9',
    borderColor: '#3F51B5',
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
