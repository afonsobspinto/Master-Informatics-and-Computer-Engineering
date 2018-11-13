import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import PropTypes from 'prop-types'
import { buttonStyle } from '../../styles/Activity.style'
import { red } from '../../styles/Colors'
import Images from '../../assets/images/images'
import Layout from '../../constants/Layout'

import * as Progress from 'react-native-progress'

export class CancelButton extends React.Component {
  constructor (props) {
    super(props)
    this.handleButtonPress = this.handleButtonPress.bind(this)
    this.handleButtonRelease = this.handleButtonRelease.bind(this)

    this.state = {
      progress: 0,
      isCancelling: false
    }
  }

  handleButtonPress () {
    this.timer = setInterval(() => {
      if (this.state.progress >= 0.99) {
        this.props.cancelActivity()
      }

      this.setState(() => {
        return {
          progress: this.state.progress + 0.01,
          isCancelling: true
        }
      })
    }, 10)
  }

  handleButtonRelease () {
    clearInterval(this.timer)
    this.setState(() => {
      return {
        progress: 0,
        isCancelling: false
      }
    })
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  render () {
    return (
      <View>
        { this.state.isCancelling &&
          <Progress.Bar
            width={Layout.window.height * 0.12 / 1.5}
            progress={this.state.progress}
          />
        }
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.button, this.props.style]}
          onPressIn={this.handleButtonPress}
          onPressOut={this.handleButtonRelease} >
          <Image
            style={styles.image}
            resizeMode={'contain'}
            source={Images.ui.cancel} />
        </TouchableOpacity>
      </View>
    )
  }
}

CancelButton.propTypes = {
  cancelActivity: PropTypes.func.isRequired,
  style: PropTypes.number.isRequired
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
