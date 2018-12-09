import React from 'react'
import PropTypes from 'prop-types'
import { Audio } from 'expo'

export class RewardSound extends React.Component {
  sound = null

  componentDidMount () {
    setTimeout(this.playSound, 400)
  }

  componentWillUnmount () {
    if (this.sound !== null) {
      this.sound.unloadAsync()
    }
  }

  playSound = async () => {
    this.sound = new Audio.Sound()
    try {
      if (this.props.success) await this.sound.loadAsync(require('../../assets/sounds/happy.wav'))
      else await this.sound.loadAsync(require('../../assets/sounds/sad.wav'))
      this.sound.playAsync()
      this.sound.setPositionAsync(0)
    } catch (error) { }
  }

  render () {
    return null
  }
}

RewardSound.propTypes = {
  success: PropTypes.bool.isRequired
}
