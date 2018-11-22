import React from 'react'
import { TouchableOpacity, Image, View, Text } from 'react-native'
import PropTypes from 'prop-types'

import Modal from 'react-native-modalbox'
import styles from '../../styles/ChildMainMenuScreen.style'

import Images from '../../assets/images/images'

export class LevelUpModal extends React.Component {
  state = {
    isOpened: this.props.show
  }

  render () {
    return (
      <View style={styles.modalContainer}>
        <Modal style={styles.levelUpModal} isOpen={this.state.isOpened} onClosed={this.props.onClosed}>
          <View style={styles.levelUpCard}>
            <Image style={styles.levelUpRewardImage} source={Images.pool} resizeMode={'cover'} />
            <Text style={styles.levelUpText}>Vamos à piscina</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.levelUpButton}
              onPress={() => this.setState({ isOpened: false })}>
              <Image
                style={styles.levelUpButtonImage}
                resizeMode={'contain'}
                source={Images.ui.next} />
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    )
  }
}

LevelUpModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClosed: PropTypes.func.isRequired
}
