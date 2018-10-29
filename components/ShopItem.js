import React from 'react'
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native'

import Layout from '../constants/Layout'
import PropTypes from 'prop-types'

export class ShopItem extends React.Component {
  render () {
    return (
      <View>
        <TouchableOpacity>
          <View style={styles.shopItem} />
          <View style={styles.itemPrice} >
            <Image style={styles.currencyIcon} source={require('../assets/images/yellow_star.png')} resizeMode='contain' />
            <Text>{this.props.cost}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

ShopItem.propTypes = {
  cost: PropTypes.number.isRequired
}

const styles = StyleSheet.create({
  shopItem: {
    width: Layout.window.width * 0.25,
    height: Layout.window.height * 0.2,
    borderColor: 'black',
    borderWidth: 2,
    backgroundColor: '#C5CAE9',
    position: 'relative'
  },
  currencyIcon: {
    width: Layout.window.width * 0.03,
    height: Layout.window.height * 0.03,
    marginHorizontal: Layout.window.width * 0.01
  },
  itemPrice: {
    width: Layout.window.width * 0.25,
    height: Layout.window.height * 0.04,
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  }
})
