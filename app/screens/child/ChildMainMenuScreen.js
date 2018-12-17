import React, { Component } from 'react'
import { View, StatusBar, Image, TouchableOpacity } from 'react-native'
import { ScreenOrientation } from 'expo'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { toggleLevelUpModal } from '../../actions/childActions'
import { addRoutines } from '../../actions/gameActions'
import { ChildExperienceBar } from '../../components/ChildMainMenu/ChildExperienceBar'
import { LevelUpModal } from '../../components/ChildMainMenu/LevelUpModal'
import { Avatar } from '../../components/ChildMainMenu/Avatar'
import EnvVars from '../../constants/EnviromentVars'

import Images from '../../assets/images/images'

import styles from '../../styles/ChildMainMenuScreen.style'

export class ChildMainMenuScreen extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isShopVisible: false,
      showModal: false,
      reward: { name: '', photo: undefined }
    }

    this.openShop = this.openShop.bind(this)
    this.closeShop = this.closeShop.bind(this)
    this.onCloseModal = this.onCloseModal.bind(this)
    this.showRewardModal = this.showRewardModal.bind(this)
  }

  componentDidMount () {
    ScreenOrientation.allow(ScreenOrientation.Orientation.LANDSCAPE)
  }

  componentWillUnmount () {
    ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT)
  }

  componentWillMount () {
    let url = `${EnvVars.apiUrl}routine_manager/get-daily-routine?selectedChildID=${this.props.childID}`
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === '200') {
          this.props.addRoutines(JSON.parse(responseJson.response))
        } else {

        }
        return responseJson
      })
      .catch((error) => {
        console.error(error)
      })
    this.fetchChildReward()
  }

  fetchChildReward = () => {
    let url = `${EnvVars.apiUrl}routine_manager/get-reward?selectedChildID=${this.props.childID}`
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === '200') {
          let reward = JSON.parse(responseJson.response).map(reward => ({ title: reward.name, ...reward }))[0]
          if (reward) {
            this.setState({ reward, showModal: this.props.showLevelUpModal })
          } else {
            this.setState({ reward: { name: '', photo: undefined } })
          }
        } else {

        }
        return responseJson
      })
      .catch((error) => {
        console.error(error)
      })
  }

  deleteReward (id) {
    fetch(EnvVars.apiUrl + 'routine_manager/remove-reward/', {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        rewardID: id,
        childID: this.props.childID
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === '200') {
          console.log('trofeu apagada')
          this.fetchChildReward()
        } else {
          console.log('trofeu nao apagado')
        }
        return responseJson
      })
      .catch((error) => {
        console.error(error)
      })
  }

  openShop () {
    this.setState({ isShopVisible: true })
  }

  closeShop () {
    this.setState({ isShopVisible: false })
  }

  onCloseModal () {
    this.setState({ showModal: false })
    if (this.props.showLevelUpModal) {
      this.props.toggleLevelUpModal()
      this.deleteReward(this.state.reward.id)
    }
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
            onPress={this.showRewardModal}
            photo={this.state.reward.photo} />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => { this.props.navigation.navigate('ShopScreen') }}
            activeOpacity={0.9} >
            <Avatar button equiped={this.props.itemsEquiped} gender={this.props.gender} />
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
          onClosed={this.onCloseModal}
          playSounds={this.props.playSounds}
          reward={this.state.reward} />}
      </View>
    )
  }
}

export default connect(
  /* istanbul ignore next */
  state => ({
    childID: state.child.id,
    level: state.child.level,
    xp: state.child.xp,
    gender: state.child.gender,
    itemsEquiped: state.child.itemsEquiped,
    showLevelUpModal: state.child.showLevelUpModal,
    playSounds: state.settings.playSounds
  }),
  /* istanbul ignore next */
  dispatch => ({
    toggleLevelUpModal: () => dispatch(toggleLevelUpModal()),
    addRoutines: routines => dispatch(addRoutines(routines))
  })
)(ChildMainMenuScreen)

ChildMainMenuScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  level: PropTypes.number.isRequired,
  xp: PropTypes.number.isRequired,
  showLevelUpModal: PropTypes.bool.isRequired,
  toggleLevelUpModal: PropTypes.func.isRequired,
  playSounds: PropTypes.bool.isRequired,
  gender: PropTypes.string.isRequired,
  itemsEquiped: PropTypes.array.isRequired,
  childID: PropTypes.number.isRequired,
  addRoutines: PropTypes.func.isRequired
}
