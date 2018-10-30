import React, { Component } from 'react'
import { View, StatusBar, Image, Text, TouchableOpacity } from 'react-native'
import { ScreenOrientation } from 'expo'
import PropTypes from 'prop-types'

import { ChildExperienceBar } from '../components/MainMenu/ChildExperienceBar'
import { MainMenuProfile } from '../components/MainMenu/MainMenuProfile'

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
              <TouchableOpacity onPress={() => { this.props.navigation.navigate('ChooseRoutineScreen') }}>
                <Image style={styles.playButton} source={require('../assets/images/navigation/play.png')} />
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

ChildMainMenuScreen.propTypes = {
  navigation: PropTypes.object.isRequired
}
