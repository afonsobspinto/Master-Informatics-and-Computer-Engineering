import React from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { buttonStyle } from '../../styles/Activity.style'

export class CancelButton extends React.Component {
  render () {
    return (
      <TouchableOpacity
        style={[styles.button, this.props.style]}
        onPress={this.props.cancelActivity} >
        <Image
          style={styles.image}
          resizeMode={'contain'}
          source={require('../../assets/images/nav-cancel.png')} />
      </TouchableOpacity>
    )
  }
}

CancelButton.propTypes = {
  cancelActivity: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  button: {
    ...buttonStyle,
    backgroundColor: '#e63b2e'
  },
  image: {
    height: '35%',
    width: '35%',
    tintColor: '#fff'
  }
})
