import React from 'react'
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native'
import PropTypes from 'prop-types'
import Images from '../../assets/images/images'
import CardButton from './CardButton'

import { getCardStyle } from '../../styles/CardCarousel.style'

export default class Card extends React.Component {
  onPress = () => {
    this.props.onPress(this.props.item)
  }

  render () {
    const cardStyle = getCardStyle(this.props.item.color)
    return (
      <View style={cardStyle.cardContainer}>
        <TouchableWithoutFeedback
          onPress={this.onPress}>
          <View style={cardStyle.card}>
            <Image
              source={Images[this.props.item.image]}
              resizeMode={'center'}
              style={this.props.isRoutineCard ? cardStyle.cardRoutineImage : cardStyle.cardActivityImage} />
            <Text style={cardStyle.cardTitle}> { this.props.item.title } </Text>
            {this.props.isRoutineCard && <CardButton cardStyle={cardStyle} />}
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

Card.propTypes = {
  onPress: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  isRoutineCard: PropTypes.bool.isRequired
}
