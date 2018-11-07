import React from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'

import Modal from 'react-native-modalbox'

import styles from '../../styles/RewardModal.style'
import Images from '../../assets/images/images'

export class RewardsModal extends React.Component {
  render () {
    return (
      <Modal style={styles.rewardsModal} isOpen={this.props.isOpen} backButtonClose={false} swipeToClose={false} backdropPressToClose={false}>
        <View style={styles.rewardContainer}>
          <Image style={styles.icon} resizeMode={'center'} source={Images.ui.star} />
          <Image style={[styles.icon, styles.iconCenter]} resizeMode={'center'} source={Images.ui.star} />
          <Image style={[styles.icon, styles.iconGreyedOut]} resizeMode={'center'} source={Images.ui.star} />
        </View>
        <View style={styles.rewardCard}>
          <Text style={styles.cardTitle}>
            {this.props.elapsedTime < this.props.activity.time.max ? 'Actividade completa!' : 'Actividade falhada.'}
          </Text>
          <View style={styles.pastActivityContainer}>
            <View style={styles.pastActivityIcon}>
              <Image style={styles.pastActivityImage} recizeMode={'center'} source={Images.bed} />
            </View>
            <View style={styles.pastActivityIcon}>
              <Image style={styles.pastActivityImage} recizeMode={'center'} source={Images.bed} />
            </View>
            <View style={styles.pastActivityIcon}>
              <Image style={styles.pastActivityImage} recizeMode={'center'} source={Images.bed} />
            </View>
            <View style={styles.pastActivityIcon}>
              <Image style={styles.pastActivityImage} recizeMode={'center'} source={Images.bed} />
            </View>
            <View style={styles.pastActivityIcon}>
              <Image style={styles.pastActivityImage} recizeMode={'center'} source={Images.bed} />
            </View>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.button}
          onPress={() => console.log('ola')} >
          <Image
            style={styles.buttonImage}
            resizeMode={'contain'}
            source={Images.ui.next} />
        </TouchableOpacity>
      </Modal>
    )
  }
}

RewardsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  elapsedTime: PropTypes.number.isRequired,
  activity: PropTypes.object.isRequired
}
