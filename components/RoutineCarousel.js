import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import Images from '../assets/images/images'

import styles, { sliderWidth, itemWidth, getCardStyle } from '../styles/RoutineCarousel.style'

export default class RoutineCarousel extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      activeSlide: 0
    }
  }

  _renderItem ({ item, index }) {
    const cardStyle = getCardStyle(item.color)
    return (
      <View style={cardStyle.cardContainer}>
        <View style={cardStyle.card}>
          <Image
            source={Images.routine[item.image]}
            resizeMode={'center'}
            style={cardStyle.cardImage} />
          <View style={cardStyle.cardContent}>
            <Text style={cardStyle.cardTitle}> { item.title } </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={this.onPress}
              style={cardStyle.playButton}>
              <Image
                source={Images.button.playButton}
                resizeMode={'contain'}
                style={cardStyle.playIcon} />
              <Text style={cardStyle.playText}>Começar</Text>
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
      <View style={styles.carouselContainer}>
        <View style={{ flexGrow: 1 }}>
          <Carousel
            ref={(c) => { this._carousel = c }}
            data={this.props.data}
            renderItem={this._renderItem}
            onSnapToItem={index => this.setState({ activeSlide: index })}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            inactiveSlideScale={1}
          />
        </View>
        { this.pagination }
      </View>
    )
  }
}
