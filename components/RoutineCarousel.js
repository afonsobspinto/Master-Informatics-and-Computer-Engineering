import React from 'react'
import { View, Text } from 'react-native'
import Carousel from 'react-native-snap-carousel'

import styles, { sliderWidth, itemWidth } from '../styles/RoutineCarousel.style'

export default class RoutineCarousel extends React.Component {
  _renderItem ({ item, index }) {
    return (
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text> { item } </Text>
        </View>
      </View>
    )
  }

  render () {
    return (
      <Carousel
        ref={(c) => { this._carousel = c }}
        data={this.props.data}
        renderItem={this._renderItem}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
        inactiveSlideScale={1}
      />
    )
  }
}
