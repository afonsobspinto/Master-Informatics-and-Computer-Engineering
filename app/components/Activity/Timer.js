import React from 'react'
import { Text } from 'react-native'
import PropTypes from 'prop-types'

export class Timer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      minutes: '0',
      seconds: '00'
    }
  }

  componentWillReceiveProps (props) {
    let minutes = Math.floor(props.elapsedTime / 60)

    let seconds = Math.floor(props.elapsedTime % 60)
    if (seconds < 10) seconds = '0' + seconds

    this.setState(() => ({ minutes: minutes, seconds: seconds }))
  }

  render () {
    return (
      <Text style={this.props.style}>{`${this.state.minutes}:${this.state.seconds}`}</Text>
    )
  }
}

Timer.propTypes = {
  elapsedTime: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired
}
