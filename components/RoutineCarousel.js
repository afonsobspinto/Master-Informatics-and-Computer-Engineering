import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import Carousel from 'react-native-snap-carousel'
import Images from '../assets/images/images'

import styles, { sliderWidth, itemWidth } from '../styles/RoutineCarousel.style'

export default class RoutineCarousel extends React.Component {
  _renderItem ({ item, index }) {
    return (
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text> { item } </Text>
          <View>
            <TouchableOpacity activeOpacity={0.7} onPress={this.onPress}>
              <Image
                source={Images.button[`playButton`]}
                resizeMode={'contain'}
                style={{ width: 200, height: 200 }} />
            </TouchableOpacity>
          </View>
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
