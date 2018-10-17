import React from 'react'
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native'
import Images from '../../assets/images/images'
import CardButton from './CardButton'

import { getCardStyle } from '../../styles/CardCarousel.style'

export default class Card extends React.Component {
  render () {
    const { item, navigation, renderButton } = this.props

    const cardStyle = getCardStyle(item.color)
    return (
      <View style={cardStyle.cardContainer}>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('ChooseActivityScreen', { activities: item.activities })}>
          <View style={cardStyle.card}>
            <Image
              source={Images.routine[item.image]}
              resizeMode={'center'}
              style={cardStyle.cardImage} />
            <Text style={cardStyle.cardTitle}> { item.title } </Text>
            {renderButton && <CardButton cardStyle={cardStyle} />}
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}
