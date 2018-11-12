import React from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'

import Modal from 'react-native-modalbox'
import * as Animatable from 'react-native-animatable'

import styles from '../../styles/RewardModal.style'
import { grayedOut } from '../../styles/Colors'
import Images from '../../assets/images/images'

export class RewardsModal extends React.Component {
  render () {
    let pastActivityIcons = this.props.activities
      .filter((_, index, array) => {
        if (this.props.currentActivity + 8 > array.length) return index >= array.length - 8
        else return index >= this.props.currentActivity && index < this.props.currentActivity + 8
      })
      .map((activity, index) =>
        (<View key={index} style={[styles.pastActivityIcon, { backgroundColor: activity.status ? activity.color : grayedOut }]}>
          <Image style={[styles.pastActivityImage, { opacity: activity.status ? 1 : 0.3 }]} recizeMode={'center'} source={Images[activity.image]} />
        </View>))

    const routineIsDone = this.props.activities.every(activity => activity.status !== undefined)

    let cardText = this.props.activities[this.props.currentActivity].status
      ? routineIsDone
        ? 'Rotina completada!'
        : this.props.activities[this.props.currentActivity].status.reward ? 'Atividade completada!' : 'Atividade falhada...'
      : ''

    return (
      <Modal style={styles.rewardsModal} isOpen={this.props.activities[this.props.currentActivity].status !== undefined} backButtonClose={false} swipeToClose={false} backdropPressToClose={false}>
        <View style={styles.rewardContainer}>
          <Image style={[styles.icon, styles.iconGreyedOut]} resizeMode={'center'} source={Images.ui.star} />
          <Image style={[styles.icon, styles.iconGreyedOut, styles.iconCenter]} resizeMode={'center'} source={Images.ui.star} />
          <Image style={[styles.icon, styles.iconGreyedOut]} resizeMode={'center'} source={Images.ui.star} />
        </View>
        <View style={styles.rewardContainer}>
          <Animatable.Image
            animation={this.props.activities[this.props.currentActivity].status && this.props.activities[this.props.currentActivity].status.reward < 1 ? '' : 'zoomIn'}
            delay={400}
            style={styles.icon}
            resizeMode={'center'}
            source={Images.ui.star} />
          <Animatable.Image
            animation={this.props.activities[this.props.currentActivity].status && this.props.activities[this.props.currentActivity].status.reward < 2 ? '' : 'zoomIn'}
            delay={1400}
            style={[styles.icon, styles.iconCenter]}
            resizeMode={'center'}
            source={Images.ui.star} />
          <Animatable.Image
            animation={this.props.activities[this.props.currentActivity].status && this.props.activities[this.props.currentActivity].status.reward < 3 ? '' : 'zoomIn'}
            delay={2400}
            style={styles.icon}
            resizeMode={'center'}
            source={Images.ui.star} />
        </View>
        <View style={styles.rewardCard}>
          <Text style={styles.cardTitle}>
            { cardText }
          </Text>
          <View style={styles.pastActivityContainer}>
            {pastActivityIcons}
          </View>
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
            onPress={routineIsDone ? this.props.backPress : this.props.nextPress} >
            <Image
              style={styles.buttonImage}
              resizeMode={'contain'}
              source={Images.ui.next} />
          </TouchableOpacity>
        </View>
      </Modal>
    )
  }
}

RewardsModal.propTypes = {
  activities: PropTypes.array.isRequired,
  currentActivity: PropTypes.number.isRequired,
  nextPress: PropTypes.func.isRequired,
  backPress: PropTypes.func.isRequired
}
