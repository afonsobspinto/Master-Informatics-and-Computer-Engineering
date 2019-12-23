import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import Carousel, { Pagination } from 'react-native-snap-carousel'

import Card from './Card'
import styles, { sliderWidth, itemWidth } from '../../styles/CardCarousel.style'

export default class CardCarousel extends React.Component {
  constructor (props) {
    super(props)
    this.renderCard = this.renderCard.bind(this)
    this.state = {
      activeSlide: 0
    }
  }

  renderCard = ({ item }) => {
    return (
      <Card
        item={item}
        onPress={this.props.onPress}
        onButtonPress={this.props.onButtonPress}
        isRoutine={this.props.isRoutine}
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
            ref={/* istanbul ignore next */(c) => { this._carousel = c }}
            data={this.props.data}
            renderItem={this.renderCard}
            onSnapToItem={/* istanbul ignore next */index => this.setState({ activeSlide: index })}
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

CardCarousel.propTypes = {
  onPress: PropTypes.func.isRequired,
  isRoutine: PropTypes.bool,
  onButtonPress: PropTypes.func,
  data: PropTypes.array.isRequired
}
