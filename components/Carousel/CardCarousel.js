import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import Carousel, { Pagination } from 'react-native-snap-carousel'

import Card from './Card'
import styles, { sliderWidth, itemWidth } from '../../styles/CardCarousel.style'

export default class CardCarousel extends React.Component {
  constructor (props) {
    super(props)
    this.onRoutinePress = this.onRoutinePress.bind(this)
    this.onActivityPress = this.onActivityPress.bind(this)
    this.onRoutineButtonPress = this.onRoutineButtonPress.bind(this)
    this.state = {
      activeSlide: 0
    }
  }

  renderCard = ({ item }) => {
    return (
      <Card
        item={item}
        isRoutineCard={this.props.isRoutine}
        onPress={this.props.isRoutine ? this.onRoutinePress : this.onActivityPress}
        onButtonPress={this.props.isRoutine && this.onRoutineButtonPress}
      />
    )
  }

  onRoutinePress = (routine) => {
    this.props.navigation.navigate('ChooseActivityScreen', { activities: routine.activities })
  }

  onRoutineButtonPress = (routine) => {
    this.props.navigation.navigate('Activity', { progressType: 'bar', activity: routine.activities[0] })
  }

  onActivityPress = (activity) => {
    this.props.navigation.navigate('Activity', { progressType: 'bar', activity: activity })
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

CardCarousel.propTypes = {
  isRoutine: PropTypes.bool,
  navigation: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired
}
