import React from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { buttonStyle } from '../../styles/Activity.style'
import { yellow } from '../../styles/Colors'
import Images from '../../assets/images/images'

export class PauseButton extends React.Component {
  render () {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.button, this.props.style]}
        onPress={this.props.isPaused ? this.props.resumeActivity : this.props.pauseActivity} >
        <Image
          style={styles.image}
          resizeMode={'contain'}
          source={this.props.isPaused ? Images.ui.play : Images.ui.pause} />
      </TouchableOpacity>
    )
  }
}

PauseButton.propTypes = {
  resumeActivity: PropTypes.func.isRequired,
  pauseActivity: PropTypes.func.isRequired,
  isPaused: PropTypes.bool
}

const styles = StyleSheet.create({
  button: {
    ...buttonStyle,
    backgroundColor: yellow
  },
  image: {
    height: '35%',
    width: '35%',
    tintColor: '#fff'
  }
})
