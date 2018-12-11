import React from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'

import * as Animatable from 'react-native-animatable'
import Images from '../../assets/images/images'

import styles from '../../styles/RewardModal.style'
import { RewardModalExperienceBar } from './RewardModalExperienceBar'
import { RewardModalStars } from './RewardModalStars'
import { RewardSound } from './RewardSound'

export class BonusModal extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      progress: (this.props.xp - this.props.level * 100) / 100
    }

    this.increaseProgress = this.increaseProgress.bind(this)
  }

  increaseProgress = (increase) => {
    this.setState({ progress: (this.props.xp - this.props.level * 100 + increase) / 100 })
  }

  render () {
    return (
      <View style={styles.rewardsModal}>
        <View style={styles.rewardContainer}>
          <Image style={[styles.icon, styles.iconGreyedOut]} resizeMode={'center'} source={Images.ui.star} />
          <Image style={[styles.icon, styles.iconGreyedOut, styles.iconCenter]} resizeMode={'center'} source={Images.ui.star} />
          <Image style={[styles.icon, styles.iconGreyedOut]} resizeMode={'center'} source={Images.ui.star} />
        </View>
        <RewardModalStars activities={[{ status: 3 }]} currentActivity={0} increaseProgress={this.increaseProgress} />
        <View style={styles.rewardCard}>
          <Animatable.Text
            animation={'fadeOut'}
            delay={2400}
            style={styles.cardTitle}>
            Rotina Completa
          </Animatable.Text>
          <RewardModalExperienceBar progress={this.state.progress} />
          <View style={styles.routineButtonContainer}>
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
          <RewardSound success playSounds={this.props.playSounds} />
        </View>
      </View>
    )
  }
}

BonusModal.propTypes = {
  xp: PropTypes.number.isRequired,
  level: PropTypes.number.isRequired,
  nextPress: PropTypes.func.isRequired,
  playSounds: PropTypes.bool.isRequired
}
