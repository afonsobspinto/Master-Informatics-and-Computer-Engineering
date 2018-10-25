import React from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { buttonStyle } from '../../styles/Activity.style'

export class PauseButton extends React.Component {
  render () {
    return (
      <TouchableOpacity
        style={[styles.button, this.props.style]}
        onPress={this.props.pauseActivity} >
        <Image
          style={styles.image}
          resizeMode={'contain'}
          source={require('../../assets/images/nav-pause.png')} />
      </TouchableOpacity>
    )
  }
}

PauseButton.propTypes = {
  // resumeActivity: PropTypes.func.isRequired,
  pauseActivity: PropTypes.func.isRequired,
  // isPaused: PropTypes.bool
}

const styles = StyleSheet.create({
  button: {
    ...buttonStyle,
    backgroundColor: '#dba159'
  },
  image: {
    height: '50%',
    width: '50%',
    tintColor: '#fff'
  }
})
