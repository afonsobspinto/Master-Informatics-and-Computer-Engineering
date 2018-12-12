import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, ScrollView, Image, Text } from 'react-native'
import { connect } from 'react-redux'

import Images, { avatarItems, avatarCategories } from '../../assets/images/images'
import { ShopItem } from '../../components/ChildMainMenu/ShopItem'
import { ShopTitle } from '../../components/ChildMainMenu/ShopTitle'
import { Avatar } from '../../components/ChildMainMenu/Avatar'

import styles from '../../styles/Shop.style'
import { purchaseItem, toggleItem } from '../../actions/childActions'

export class ShopScreen extends Component {
  render () {
    let shopItems = []

    for (let i = 0; i < avatarCategories.length; i++) {
      shopItems.push(<ShopTitle key={1000 + i} title={avatarCategories[i]} />)

      avatarItems
        .filter(item => item.category === avatarCategories[i])
        .forEach((item, index) => shopItems.push(
          <ShopItem
            key={i * 100 + index}
            id={item.id}
            cost={item.price}
            image={item.thumbnail}
            disabled={item.price > this.props.stars && !this.props.itemsOwned.includes(item.id)}
            purchaseItem={this.props.purchaseItem}
            toggleItem={this.props.toggleItem}
            equiped={this.props.itemsEquiped.includes(item.id)}
            purchased={this.props.itemsOwned.includes(item.id)} />
        ))
    }

    return (
      <View style={styles.shopModal}>
        <View style={styles.imageCard} >
          <Avatar equiped={this.props.itemsEquiped} gender={this.props.gender} />
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
    itemsOwned: state.child.itemsOwned,
    itemsEquiped: state.child.itemsEquiped,
    gender: state.child.gender
  }),
  dispatch => ({
    purchaseItem: (cost, id) => dispatch(purchaseItem(cost, id)),
    toggleItem: id => dispatch(toggleItem(id))
  })
)(ShopScreen)

ShopScreen.propTypes = {
  stars: PropTypes.number.isRequired,
  gender: PropTypes.string.isRequired,
  itemsOwned: PropTypes.array.isRequired,
  purchaseItem: PropTypes.func.isRequired,
  toggleItem: PropTypes.func.isRequired,
  itemsEquiped: PropTypes.array.isRequired
}
