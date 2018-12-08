import React from 'react'
import { TouchableOpacity, Image, View, Text } from 'react-native'
import PropTypes from 'prop-types'

import Modal from 'react-native-modalbox'
import { RewardSound } from '../RewardsModal/RewardSound'
import styles from '../../styles/ChildMainMenuScreen.style'

import Images from '../../assets/images/images'

export class LevelUpModal extends React.Component {
  state = {
    isOpened: this.props.show
  }

  onPress = () => this.setState({ isOpened: false })

  render () {
    return (
      <View style={styles.modalContainer}>
        <Modal style={styles.levelUpModal} isOpen={this.state.isOpened} onClosed={this.props.onClosed}>
          <View style={styles.levelUpCardTitleContainer}>
            <Text style={styles.levelUpCardTitle}>{this.props.isReward ? `Nível ${this.props.level - 1} completo!` : `Faltam ${(this.props.level + 1) * 100 - this.props.xp}`}</Text>
            {!this.props.isReward && <Image style={styles.levelUpStarIcon} source={Images.ui.star} resizeMode='contain' />}
            {!this.props.isReward && <Text style={styles.levelUpCardTitle}> para</Text>}
          </View>
          <View style={styles.levelUpCard}>
            <Image style={styles.levelUpRewardImage} source={Images.pool} resizeMode={'cover'} />
            <View style={styles.levelUpCardBottomContainer}>
              <Text style={styles.levelUpText}>Dia na piscina</Text>
              {this.props.isReward && <TouchableOpacity
                activeOpacity={0.8}
                style={styles.levelUpButton}
                onPress={this.onPress}>
                <Image
                  style={styles.levelUpButtonImage}
                  resizeMode={'contain'}
                  source={Images.ui.next} />
              </TouchableOpacity>}
            </View>
          </View>
        </Modal>
        {this.props.isReward && <RewardSound success />}
      </View>
    )
  }
}

LevelUpModal.propTypes = {
  show: PropTypes.bool.isRequired,
  level: PropTypes.number.isRequired,
  xp: PropTypes.number.isRequired,
  isReward: PropTypes.bool.isRequired,
  onClosed: PropTypes.func.isRequired
}
