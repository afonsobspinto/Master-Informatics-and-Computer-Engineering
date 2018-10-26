import React from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { buttonStyle } from '../../styles/Activity.style'
import { red } from '../../styles/Colors'
import Images from '../../assets/images/images'

export class CancelButton extends React.Component {
  render () {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.button, this.props.style]}
        onPress={this.props.cancelActivity} >
        <Image
          style={styles.image}
          resizeMode={'contain'}
          source={Images.ui.cancel} />
      </TouchableOpacity>
    )
  }
}

CancelButton.propTypes = {
  cancelActivity: PropTypes.func.isRequired,
  style: PropTypes.object
}

const styles = StyleSheet.create({
  button: {
    ...buttonStyle,
    backgroundColor: red
  },
  image: {
    height: '35%',
    width: '35%',
    tintColor: '#fff'
  }
})
