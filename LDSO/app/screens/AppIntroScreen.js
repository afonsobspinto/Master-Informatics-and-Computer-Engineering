import React, { Component } from 'react'
import AppIntroSlider from 'react-native-app-intro-slider'
import PropTypes from 'prop-types'
import Images from '../assets/images/images'

const slides = [
  {
    key: '1',
    title: 'Texto explicativo #1',
    text: 'A ser preenchido pelas nossas fantásticas product owners.\nO número de páginas e imagem é ajustável consoante necessário.',
    image: Images.socks,
    imageStyle: { width: 240, height: 240 },
    backgroundColor: '#59b2ab'
  },
  {
    key: '2',
    title: 'Texto explicativo #2',
    text: 'A ser preenchido pelas nossas fantásticas product owners.\nO número de páginas e imagem é ajustável consoante necessário.',
    image: Images.socks,
    imageStyle: { width: 240, height: 240 },
    backgroundColor: '#febe29'
  },
  {
    key: '3',
    title: 'Texto explicativo #3',
    text: 'A ser preenchido pelas nossas fantásticas product owners.\nO número de páginas e imagem é ajustável consoante necessário.',
    image: Images.socks,
    imageStyle: { width: 240, height: 240 },
    backgroundColor: '#22bcb5'
  }
]

export default class AppIntroScreen extends Component {
  _onDone = () => {
    this.props.navigation.goBack()
  }

  render () {
    return (
      <AppIntroSlider slides={slides} onDone={this._onDone} />
    )
  }
}

AppIntroScreen.propTypes = {
  navigation: PropTypes.object.isRequired
}
