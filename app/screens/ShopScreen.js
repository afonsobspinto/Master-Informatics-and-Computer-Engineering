import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, ScrollView, Image, Text } from 'react-native'
import { connect } from 'react-redux'

import Images from '../assets/images/images'
import { ShopItem } from '../components/MainMenu/ShopItem'
import { ShopTitle } from '../components/MainMenu/ShopTitle'

import styles from '../styles/Shop.style'
import { purchaseItem } from '../actions/childActions'

class ShopScreen extends Component {
  static navigationOptions = {
    header: null
  }

  render () {
    let shopItems = []

    for (let i = 0; i < 36; i++) {
      if (i % 8 === 0) {
        shopItems.push(<ShopTitle key={100 + i} title='Chapéus' />)
      }
      let cost = (Math.floor(Math.random() * 9) + 1) * 10
      shopItems.push(
        <ShopItem
          key={i}
          id={i}
          cost={cost}
          disabled={cost > this.props.stars || this.props.itemsOwned.includes(i)}
          purchaseItem={this.props.purchaseItem}
          purchased={this.props.itemsOwned.includes(i)} />
      )
    }

    return (
      <View style={styles.shopModal}>
        <View style={styles.imageCard} >
          <Image style={styles.avatar} resizeMode={'contain'} source={Images.avatar} />
        </View>
        <View style={styles.shopItemsContainer} >
          <View style={styles.shopTitleContainer}>
            <Text style={styles.shopTitle}>Loja</Text>
            <View style={styles.currentBalanceContainer}>
              <Image style={styles.currentBalanceIcon} resizeMode={'contain'} source={Images.ui.star} />
              <Text style={styles.currentBalance}>{this.props.stars}</Text>
            </View>
          </View>
          <ScrollView>
            <View style={styles.shopContainer}>
              {shopItems}
            </View>
          </ScrollView>
        </View>
      </View>
    )
  }
}

export default connect(
  state => ({
    stars: state.child.stars,
    itemsOwned: state.child.itemsOwned
  }),
  dispatch => ({
    purchaseItem: (cost, id) => dispatch(purchaseItem(cost, id))
  })
)(ShopScreen)

ShopScreen.propTypes = {
  stars: PropTypes.number.isRequired,
  itemsOwned: PropTypes.array.isRequired,
  purchaseItem: PropTypes.func.isRequired
}
