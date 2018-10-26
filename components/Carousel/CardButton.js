import React from 'react'
import { Text, Image, TouchableOpacity } from 'react-native'
import Images from '../../assets/images/images'

export default class CardButton extends React.Component {
  render () {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={this.onPress}
        style={this.props.cardStyle.playButton}>
        <Image
          source={Images.ui.play}
          resizeMode={'contain'}
          style={this.props.cardStyle.playIcon}
        />
        <Text style={this.props.cardStyle.playText}>Começar</Text>
      </TouchableOpacity>
    )
  }
}
