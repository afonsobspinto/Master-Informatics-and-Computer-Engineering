import React from 'react'
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native'
import Images from '../../assets/images/images'
import CardButton from './CardButton'

import { getCardStyle } from '../../styles/CardCarousel.style'

export const renderCard = ({ item }) => {
  const cardStyle = getCardStyle(item.color)
  return (
    <TouchableWithoutFeedback
      style={cardStyle.cardContainer}
      onPress={() => console.log(item.title)}>
      <View style={cardStyle.card}>
        <Image
          source={Images.routine[item.image]}
          resizeMode={'center'}
          style={cardStyle.cardImage} />
        <View style={cardStyle.cardContent}>
          <Text style={cardStyle.cardTitle}> { item.title } </Text>
          <CardButton cardStyle={cardStyle} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}
