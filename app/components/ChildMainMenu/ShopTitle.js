import React from 'react'
import { View, Text } from 'react-native'

import styles from '../../styles/Shop.style'
import PropTypes from 'prop-types'

export class ShopTitle extends React.Component {
  render () {
    return (
      <View style={styles.shopTitleContainer} >
        <Text style={styles.shopTitle}>{this.props.title}</Text>
      </View>
    )
  }
}

ShopTitle.propTypes = {
  title: PropTypes.string.isRequired
}
