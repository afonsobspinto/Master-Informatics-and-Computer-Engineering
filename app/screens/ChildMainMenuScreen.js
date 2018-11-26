import React, { Component } from 'react'
import { View, StatusBar, Image, TouchableOpacity } from 'react-native'
import { ScreenOrientation } from 'expo'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { toggleLevelUpModal } from '../actions/childActions'
import { ChildExperienceBar } from '../components/ChildMainMenu/ChildExperienceBar'
import { LevelUpModal } from '../components/ChildMainMenu/LevelUpModal'

import Images from '../assets/images/images'

import styles from '../styles/ChildMainMenuScreen.style'

export class ChildMainMenuScreen extends Component {
  constructor (props) {
    super(props)
    this.openShop = this.openShop.bind(this)
    this.closeShop = this.closeShop.bind(this)
    this.onCloseModal = this.onCloseModal.bind(this)
    this.showRewardModal = this.showRewardModal.bind(this)
  }

  state = {
    isShopVisible: false,
    showModal: this.props.showLevelUpModal
  }

  componentDidMount () {
    ScreenOrientation.allow(ScreenOrientation.Orientation.LANDSCAPE)
  }

  componentWillUnmount () {
    ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT)
  }

  openShop () {
    this.setState({ isShopVisible: true })
  }

  closeShop () {
    this.setState({ isShopVisible: false })
  }

  onCloseModal () {
    this.setState({ showModal: false })
    if (this.props.showLevelUpModal) this.props.toggleLevelUpModal()
  }

  showRewardModal () {
    this.setState({ showModal: true })
  }

  render () {
    return (
      <View style={styles.mainMenuContainer}>
        <StatusBar hidden />
        <View style={styles.experienceBarContainer}>
          <ChildExperienceBar
            progress={(this.props.xp - this.props.level * 100) / 100}
            level={this.props.level}
            onPress={this.showRewardModal} />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => { this.props.navigation.navigate('ShopScreen') }}
            activeOpacity={0.9} >
            <Image style={styles.profileImage} resizeMode={'contain'} source={Images.avatar} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => { this.props.navigation.navigate('ChooseRoutineScreen') }}
            activeOpacity={0.9}>
            <Image style={styles.buttonImage} source={Images.ui.play} />
          </TouchableOpacity>
        </View>
        {this.state.showModal && <LevelUpModal
          level={this.props.level}
          xp={this.props.xp}
          isReward={this.props.showLevelUpModal}
          show={this.state.showModal}
          onClosed={this.onCloseModal} />}
      </View>
    )
  }
}

export default connect(
  state => ({
    level: state.child.level,
    xp: state.child.xp,
    showLevelUpModal: state.child.showLevelUpModal
  }),
  dispatch => ({
    toggleLevelUpModal: () => dispatch(toggleLevelUpModal())
  })
)(ChildMainMenuScreen)

ChildMainMenuScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  level: PropTypes.number.isRequired,
  xp: PropTypes.number.isRequired,
  showLevelUpModal: PropTypes.bool.isRequired,
  toggleLevelUpModal: PropTypes.func.isRequired
}
