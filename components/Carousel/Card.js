import React from 'react'
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native'
import Images from '../../assets/images/images'
import CardButton from './CardButton'

import { getCardStyle } from '../../styles/CardCarousel.style'

export default class Card extends React.Component {
  onRoutinePress = () => {
    this.props.navigation.navigate('ChooseActivityScreen', { activities: this.props.item.activities })
  }

  onActivityPress = () => {
    this.props.navigation.navigate('SingleActivity')
  }

  render () {
    const { item, isRoutineCard } = this.props

    const cardStyle = getCardStyle(item.color)
    return (
      <View style={cardStyle.cardContainer}>
        <TouchableWithoutFeedback
          onPress={isRoutineCard ? this.onRoutinePress : this.onActivityPress}>
          <View style={cardStyle.card}>
            <Image
              source={Images[item.image]}
              resizeMode={'center'}
              style={isRoutineCard ? cardStyle.cardRoutineImage : cardStyle.cardActivityImage} />
            <Text style={cardStyle.cardTitle}> { item.title } </Text>
            {isRoutineCard && <CardButton cardStyle={cardStyle} />}
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}
