import React from 'react'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'

export default class RoutineButton extends React.Component {
  onPress = () => {
  }

  render () {
    let image, viewStyle, imageStyle

    if (this.props.type === 'Day') {
      image = require('../assets/images/sun.png')
      viewStyle = styles.dayView
      imageStyle = styles.dayImage
    } else {
      image = require('../assets/images/night.png')
      viewStyle = styles.nightView
      imageStyle = styles.nightImage
    }

    return <TouchableOpacity activeOpacity={0.7} style={[viewStyle, styles.view]} onPress={this.onPress}>
      <Image
        source={image}
        resizeMode={'contain'}
        style={imageStyle} />
    </TouchableOpacity>
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dayView: {
    backgroundColor: '#8bd8ec'
  },
  nightView: {
    backgroundColor: '#203262'
  },
  nightImage: {
    height: '30%'
  },
  dayImage: {
    height: '50%'
  }
})
