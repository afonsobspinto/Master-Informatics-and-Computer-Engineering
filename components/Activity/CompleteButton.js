import React from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { buttonStyle } from '../../styles/Activity.style'
import { green, gray } from '../../styles/Colors'
import Images from '../../assets/images/images'

export class CompleteButton extends React.Component {
  render () {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[(this.props.isCompletable ? styles.buttonActive : styles.buttonDisabled), this.props.style]}
        onPress={this.props.completeActivity}
        disabled={!this.props.isCompletable} >
        <Image
          style={styles.image}
          resizeMode={'contain'}
          source={Images.ui.confirm} />
      </TouchableOpacity>
    )
  }
}

CompleteButton.propTypes = {
  completeActivity: PropTypes.func.isRequired,
  isCompletable: PropTypes.bool
}

const styles = StyleSheet.create({
  buttonActive: {
    ...buttonStyle,
    backgroundColor: green
  },
  buttonDisabled: {
    ...buttonStyle,
    backgroundColor: gray
  },
  image: {
    height: '50%',
    width: '50%',
    tintColor: '#fff'
  }
})
