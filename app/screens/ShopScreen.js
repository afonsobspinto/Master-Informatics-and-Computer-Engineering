import React, { Component } from 'react'
import { View, ScrollView, Image, Text } from 'react-native'

import Images from '../assets/images/images'
import { ShopItem } from '../components/MainMenu/ShopItem'
import { ShopTitle } from '../components/MainMenu/ShopTitle'

import styles from '../styles/Shop.style'

export default class ShopScreen extends Component {
  static navigationOptions = {
    header: null
  }

  render () {
    let shopItems = []
    let nPerCategory = Math.floor(Math.random() * 8)

    for (let i = 0; i < 36; i++) {
      shopItems.push(
        <ShopItem key={i} cost={100} canAfford={Math.random() < 0.5} />
      )
      if (i > nPerCategory) {
        shopItems.push(<ShopTitle key={100 + i} title='Chapéus' />)
        nPerCategory = i + Math.floor(Math.random() * 8)
      }
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
              <Text style={styles.currentBalance}>600</Text>
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
