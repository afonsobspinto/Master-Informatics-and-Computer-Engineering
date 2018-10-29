import React, { Component } from 'react'
import { View, StatusBar, StyleSheet, Image, Text, TouchableOpacity } from 'react-native'
import { ScreenOrientation } from 'expo'

import { ChildExperienceBar } from '../components/ChildExperienceBar'
import Layout from '../constants/Layout'
import { MainMenuProfile } from '../components/MainMenuProfile'

export default class ChildMainMenuScreen extends Component {
  constructor (props) {
    super(props)
    this.openProfile = this.openProfile.bind(this)
    this.closeProfile = this.closeProfile.bind(this)
  }

  state = {
    isProfileVisible: false,
    childLevel: 6,
    currentLevelProgress: 0.45,
    currencyEarned: 282
  }

  static navigationOptions = {
    header: null
  }

  componentDidMount () {
    ScreenOrientation.allow(ScreenOrientation.Orientation.LANDSCAPE)
  }

  componentWillUnmount () {
    ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT)
  }

  openProfile () {
    this.setState({ isProfileVisible: true })
  }

  closeProfile () {
    this.setState({ isProfileVisible: false })
  }

  render () {
    return (
      <View style={styles.mainMenuContainer}>
        <StatusBar hidden />
        <MainMenuProfile
          isProfileVisible={this.state.isProfileVisible}
          closeProfile={this.closeProfile}
          currencyEarned={this.state.currencyEarned}
        />
        <View style={styles.experienceBarContainer}>
          <ChildExperienceBar progress={this.state.currentLevelProgress} level={this.state.childLevel} />
        </View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 0.75 }} />
          <View style={{ flex: 2, flexDirection: 'column' }}>
            <View style={styles.profileImageContainer}>
              <TouchableOpacity onPress={this.openProfile} >
                <Image style={styles.profileImage} source={require('../assets/images/placeholder-avatar.png')} />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 2 }}>
              <View style={styles.currencyContainer}>
                <Image style={styles.currencyIcon} source={require('../assets/images/yellow_star.png')} resizeMode='contain' />
                <Text style={styles.currencyFont} >{this.state.currencyEarned}</Text>
              </View>
            </View>
          </View>
          <View style={{ flex: 2, flexDirection: 'column' }}>
            <View style={styles.playButtonContainer}>
              <TouchableOpacity>
                <Image style={styles.playButton} source={require('../assets/images/resume-button.png')} />
              </TouchableOpacity>
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
  mainMenuContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#C5CAE9'
  },
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
    width: Layout.window.width * 0.06,
    height: Layout.window.height * 0.06,
    marginHorizontal: Layout.window.width * 0.02
  },
  currencyFont: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  playButton: {
    width: Layout.window.width * 0.3,
    height: Layout.window.width * 0.3,
    borderRadius: Layout.window.width * 0.3 / 2,
    borderColor: '#0080FF',
    borderWidth: 2,
    tintColor: '#9999FF'
  },
  playButtonContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
