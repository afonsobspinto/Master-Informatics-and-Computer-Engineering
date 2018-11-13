import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'

import styles from '../../styles/Shop.style'
import PropTypes from 'prop-types'

import Images from '../../assets/images/images'

export class ShopItem extends React.Component {
  render () {
    return (
      <View style={styles.shopItemContainer} >
        <TouchableOpacity style={this.props.canAfford ? styles.shopItem : styles.shopItemDisabled} activeOpacity={0.6} disabled={!this.props.canAfford}>
          <Image style={[styles.shopItemImage, !this.props.canAfford && { opacity: 0.3 }]} source={Images.cap} recizeMode='contain' />
          <View style={[styles.itemPrice, !this.props.canAfford && { opacity: 0.3 }]} >
            <Image style={styles.currencyIcon} source={Images.ui.star} resizeMode='contain' />
            <Text style={styles.currencyText}>{this.props.cost}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

ShopItem.propTypes = {
  cost: PropTypes.number.isRequired,
  canAfford: PropTypes.bool.isRequired
}
