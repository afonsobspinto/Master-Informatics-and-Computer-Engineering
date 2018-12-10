import React from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'

import Modal from 'react-native-modalbox'
import * as Animatable from 'react-native-animatable'
import Images from '../../assets/images/images'

import styles from '../../styles/RewardModal.style'
import { PastActivityIcons } from './PastActivityIcons'
import { RewardModalExperienceBar } from './RewardModalExperienceBar'
import { RewardModalStars } from './RewardModalStars'
import { RewardSound } from './RewardSound'

export class RewardsModal extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      progress: (props.xp - props.level * 100) / 100
    }

    this.increaseProgress = this.increaseProgress.bind(this)
  }

  increaseProgress = (increase) => {
    this.setState({ progress: (this.props.xp - this.props.level * 100 + increase) / 100 })
  }

  render () {
    const routineIsDone = this.props.activities.every(activity => activity.status !== undefined)

    let cardText = this.props.activities[this.props.currentActivity].status ? routineIsDone ? 'Rotina completada!' : 'Atividade completada!' : ''
    let failed = this.props.activities[this.props.currentActivity].status && this.props.activities[this.props.currentActivity].status.reward === 0

    return (
      <Modal style={styles.rewardsModal} isOpen={this.props.activities[this.props.currentActivity].status !== undefined} backButtonClose={false} swipeToClose={false} backdropPressToClose={false}>
        {!failed && <View style={styles.rewardContainer}>
          <Image style={[styles.icon, styles.iconGreyedOut]} resizeMode={'center'} source={Images.ui.star} />
          <Image style={[styles.icon, styles.iconGreyedOut, styles.iconCenter]} resizeMode={'center'} source={Images.ui.star} />
          <Image style={[styles.icon, styles.iconGreyedOut]} resizeMode={'center'} source={Images.ui.star} />
        </View>}
        {!failed && <RewardModalStars activities={this.props.activities} currentActivity={this.props.currentActivity} increaseProgress={this.increaseProgress} />}
        {failed && <View style={styles.sadFaceContainer}>
          <Image style={styles.sadFaceImage} source={Images.ui.sad} resizeMode={'contain'} />
        </View>}
        <View style={styles.rewardCard}>
          {!failed && <Animatable.Text
            animation={'fadeOut'}
            delay={2400}
            style={styles.cardTitle}>
            { cardText }
          </Animatable.Text>}
          {!failed && <RewardModalExperienceBar progress={this.state.progress} />}
          <PastActivityIcons activities={this.props.activities} currentActivity={this.props.currentActivity} />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.button, styles.backButton]}
            onPress={this.props.backPress} >
            <Image
              style={styles.buttonImage}
              resizeMode={'contain'}
              source={Images.ui.cancel} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.button, styles.nextButton]}
            onPress={this.props.nextPress} >
            <Image
              style={styles.buttonImage}
              resizeMode={'contain'}
              source={Images.ui.next} />
          </TouchableOpacity>
        </View>
        {this.props.activities[this.props.currentActivity].status && <RewardSound success={this.props.activities[this.props.currentActivity].status.reward !== 0} />}
      </Modal>
    )
  }
}

RewardsModal.propTypes = {
  activities: PropTypes.array.isRequired,
  currentActivity: PropTypes.number.isRequired,
  xp: PropTypes.number.isRequired,
  level: PropTypes.number.isRequired,
  nextPress: PropTypes.func.isRequired,
  backPress: PropTypes.func.isRequired
}
