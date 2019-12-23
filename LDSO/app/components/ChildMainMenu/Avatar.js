import React from 'react'
import { View, Image } from 'react-native'

import styles from '../../styles/Shop.style'
import PropTypes from 'prop-types'

import { avatarItems, avatars } from '../../assets/images/images'

export class Avatar extends React.Component {
  render () {
    let images = this.props.equiped
      .map(id => avatarItems.find(item => item.id === id))

    this.props.gender === 'M' ? images.push(avatars.boy) : images.push(avatars.girl)

    images = images
      .sort((a, b) => a.position - b.position)
      .map((item, index) => (<Image style={styles.avatarItem} key={index} resizeMode={'cover'} source={item.overlay} />))

    return (
      <View style={this.props.button ? styles.buttonAvatarContainer : styles.avatarContainer}>
        {images}
      </View>
    )
  }
}

Avatar.propTypes = {
  equiped: PropTypes.array.isRequired,
  gender: PropTypes.string.isRequired,
  button: PropTypes.bool
}
