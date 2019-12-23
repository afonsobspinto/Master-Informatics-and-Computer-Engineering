import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'

import styles from '../../styles/Shop.style'
import PropTypes from 'prop-types'

import Images from '../../assets/images/images'

export class ShopItem extends React.Component {
  purchaseItem = () => {
    this.props.purchaseItem(this.props.cost, this.props.id)
    this.props.toggleItem(this.props.id)
  }

  toggleItem = () => this.props.toggleItem(this.props.id)

  render () {
    return (
      <View style={styles.shopItemContainer} >
        <TouchableOpacity
          style={this.props.disabled ? styles.shopItemDisabled : this.props.equiped ? styles.shopItemEquiped : styles.shopItem}
          activeOpacity={0.6}
          disabled={this.props.disabled}
          onPress={this.props.purchased ? this.toggleItem : this.purchaseItem}>
          <Image style={[styles.shopItemImage, this.props.disabled && { opacity: 0.3 }]} source={this.props.image} recizeMode='contain' />
          <View style={[styles.itemPrice, this.props.disabled && { opacity: 0.3 }]} >
            {!this.props.purchased && <Image style={styles.currencyIcon} source={Images.ui.star} resizeMode='contain' />}
            <Text style={styles.currencyText}>{this.props.purchased ? 'Comprado' : this.props.cost}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

ShopItem.propTypes = {
  cost: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
  purchased: PropTypes.bool.isRequired,
  equiped: PropTypes.bool.isRequired,
  purchaseItem: PropTypes.func.isRequired,
  toggleItem: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  image: PropTypes.number.isRequired
}
