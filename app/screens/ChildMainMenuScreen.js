import React, { Component } from 'react'
import { View, StatusBar, Image, TouchableOpacity } from 'react-native'
import { ScreenOrientation } from 'expo'
import PropTypes from 'prop-types'

import { ChildExperienceBar } from '../components/MainMenu/ChildExperienceBar'
import { MainMenuProfile } from '../components/MainMenu/MainMenuProfile'

import Images from '../assets/images/images'

import styles from '../styles/ChildMainMenuScreen.style'

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
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={this.openProfile}
            activeOpacity={0.9} >
            <Image style={styles.profileImage} source={require('../assets/images/placeholder-avatar.png')} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => { this.props.navigation.navigate('ChooseRoutineScreen') }}
            activeOpacity={0.9}>
            <Image style={styles.buttonImage} source={Images.ui.play} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

ChildMainMenuScreen.propTypes = {
  navigation: PropTypes.object.isRequired
}
