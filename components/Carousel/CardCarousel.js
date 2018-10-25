import React from 'react'
import { View } from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel'

import Card from './Card'
import styles, { sliderWidth, itemWidth } from '../../styles/CardCarousel.style'

export default class CardCarousel extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      activeSlide: 0
    }
  }

  renderCard = ({ item }) => {
    return (
      <Card
        item={item}
        isRoutineCard={this.props.isRoutine}
        navigation={this.props.navigation}
        onPress={this.onCardPress}
      />
    )
  }

  get pagination () {
    return (
      <View style={styles.paginationContainer}>
        <Pagination
          dotsLength={this.props.data.length}
          activeDotIndex={this.state.activeSlide}
          dotStyle={styles.dotStyle}
          containerStyle={{ paddingVertical: 0 }}
        />
      </View>
    )
  }

  render () {
    return (
      <View style={styles.carouselContainer}>
        <View style={{ flexGrow: 1 }}>
          <Carousel
            ref={(c) => { this._carousel = c }}
            data={this.props.data}
            renderItem={this.renderCard.bind(this)} // eslint-disable-line
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
