import React from 'react'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'
import Images from '../assets/images/images'
import { _retrieveSetting } from '../helpers/Settings'
import { VISUAL_SYTLE } from '../helpers/SettingTypes'

export default class RoutineButton extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      visualStyle: 'photo'
    }
  }

  onPress = () => {
  }

  componentDidMount () {
    _retrieveSetting(VISUAL_SYTLE)
      .then(res => {
        this.setState({ visualStyle: res })
      })
  }

  render () {
    const image = Images.routine[`${this.state.visualStyle}${this.props.type}`]
    const imageStyle = styles[`${this.state.visualStyle}${this.props.type}Image`]
    const viewColor = this.props.type === 'Day' ? { backgroundColor: '#8bd8ec' } : { backgroundColor: '#203262' }

    return <TouchableOpacity activeOpacity={0.7} style={[styles.view, viewColor]} onPress={this.onPress}>
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
  cartoonNightImage: {
    height: '30%'
  },
  cartoonDayImage: {
    height: '50%'
  },
  photoDayImage: {
    height: '100%'
  },
  photoNightImage: {
    height: '100%'
  }
})
