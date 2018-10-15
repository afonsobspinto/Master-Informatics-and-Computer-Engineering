import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import Images from '../assets/images/images'

import styles, { sliderWidth, itemWidth } from '../styles/RoutineCarousel.style'

export default class RoutineCarousel extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      activeSlide: 0
    }
  }
  _renderItem ({ item, index }) {
    return (
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <View style={styles.contentStyle}>
            <Text> { item.title } </Text>
          </View>
          <View style={styles.contentStyle}>
            <Image
              source={Images.routine[item.image]}
              resizeMode={'contain'}
              style={{ width: 100, height: 100 }} />
          </View>
          <View>
            <TouchableOpacity activeOpacity={0.7} onPress={this.onPress}>
              <Image
                source={Images.button[`playButton`]}
                resizeMode={'contain'}
                style={{ width: 45, height: 45 }} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
  get pagination () {
    return (
      <Pagination
        dotsLength={this.props.data.length}
        activeDotIndex={this.state.activeSlide}
        dotStyle={styles.dotStyle}
      />
    )
  }
  render () {
    return (
      <View>
        <Carousel
          ref={(c) => { this._carousel = c }}
          data={this.props.data}
          renderItem={this._renderItem}
          onSnapToItem={(index) => this.setState({ activeSlide: index })}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          inactiveSlideScale={1}
        />
        { this.pagination }
      </View>
    )
  }
}
