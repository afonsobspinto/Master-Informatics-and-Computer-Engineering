import React from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { buttonStyle } from '../../styles/Activity.style'
import { green } from '../../styles/Colors'

export class CompleteButton extends React.Component {
  render () {
    return (
      <TouchableOpacity
        style={[styles.button, this.props.style]}
        onPress={this.props.completeActivity}
        disabled={!this.props.isCompletable} >
        <Image
          style={styles.image}
          resizeMode={'contain'}
          source={require('../../assets/images/nav-complete.png')} />
      </TouchableOpacity>
    )
  }
}

CompleteButton.propTypes = {
  completeActivity: PropTypes.func.isRequired,
  isCompletable: PropTypes.bool
}

const styles = StyleSheet.create({
  button: {
    ...buttonStyle,
    backgroundColor: green
  },
  image: {
    height: '50%',
    width: '50%',
    tintColor: '#fff'
  }
})
