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
    ScreenOrientation.allow(ScreenOrientation.Orientation.LANDSCAPE)
  }

  componentWillUnmount () {
    ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT)
  }

  render () {
    return (
      <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#C5CAE9' }}>
        <StatusBar hidden />
        <View style={styles.experienceBarContainer}>
          <ChildExperienceBar />
        </View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 0.75 }} />
          <View style={{ flex: 2, flexDirection: 'column' }}>
            <View style={styles.profileImageContainer}>
              <Image style={styles.profileImage} source={require('../assets/images/placeholder-avatar.png')} />
            </View>
            <View style={{ flex: 2 }}>
              <View style={styles.currencyContainer}>
                <Image style={styles.currencyIcon} source={require('../assets/images/yellow_star.png')} resizeMode='contain' />
                <Text style={{ fontSize: 22, fontWeight: 'bold' }} >100</Text>
              </View>
            </View>
          </View>
          <View style={{ flex: 2, flexDirection: 'column' }}>
            <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
              <Image style={{ width: Layout.window.width * 0.3, height: Layout.window.height * 0.3, tintColor: '#9999FF' }} source={require('../assets/images/resume-button.png')} resizeMode='contain' />
            </View>
            <View style={{ flex: 2 }} />
          </View>
          <View style={{ flex: 0.75 }} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  experienceBarContainer: {
    marginHorizontal: Layout.window.width * 0.2,
    marginVertical: Layout.window.height * 0.075
  },
  profileImageContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Layout.window.height * 0.025
  },
  profileImage: {
    width: Layout.window.width * 0.4,
    height: Layout.window.width * 0.4,
    borderRadius: Layout.window.width * 0.4 / 2,
    borderWidth: 1
  },
  currencyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  currencyIcon: {
    width: Layout.window.width * 0.08,
    height: Layout.window.height * 0.08,
    marginHorizontal: Layout.window.width * 0.02
  }
})
