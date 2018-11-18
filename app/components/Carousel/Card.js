import React from 'react'
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native'
import PropTypes from 'prop-types'
import Images from '../../assets/images/images'
import CardButton from './CardButton'

import { getCardStyle } from '../../styles/CardCarousel.style'

export default class Card extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      isPhoto: this.props.item.photo !== undefined,
      hasButton: this.props.onButtonPress !== undefined
    }
  }

  onPress = () => {
    this.props.onPress(this.props.item)
  }

  onButtonPress = () => {
    this.props.onButtonPress(this.props.item)
  }

  returnURIorImage = () => {
    // TODO: This checks whether the photo attribute is type URI and should probably just eventually be totally changed to URI.
    if (this.props.item.photo !== undefined && this.props.item.photo.includes('file://')) {
      return { uri: this.props.item.photo }
    } else {
      return Images[this.state.isPhoto ? this.props.item.photo : this.props.item.image]
    }
  }

  render () {
    const cardStyle = getCardStyle(this.props.item.color)
    return (
      <View style={cardStyle.cardContainer}>
        <TouchableWithoutFeedback
          onPress={this.onPress}>
          <View style={cardStyle.card}>
            <Image
              source={this.returnURIorImage()}
              resizeMode={this.state.isPhoto ? 'cover' : 'center'}
              style={this.state.isPhoto ? cardStyle.cardPhoto : this.state.hasButton ? cardStyle.cardRoutineImage : cardStyle.cardActivityImage} />
            <Text style={this.state.isPhoto ? cardStyle.photoCardTitle : cardStyle.cardTitle}> { this.props.item.title } </Text>
            {this.state.hasButton && <CardButton cardStyle={cardStyle} onPress={this.onButtonPress} />}
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

Card.propTypes = {
  onPress: PropTypes.func.isRequired,
  onButtonPress: PropTypes.func,
  item: PropTypes.object.isRequired
}
