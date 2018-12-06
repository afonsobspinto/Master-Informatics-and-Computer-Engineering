import React, { Component } from 'react'
import { Button, Text } from 'native-base'
import { View } from 'react-native'
import PropTypes from 'prop-types'

export class BottomButton extends Component {
  render () {
    return (
      <View style={{ padding: 15, width: '100%' }}>
        <Button style={{ backgroundColor: this.props.color, justifyContent: 'center', width: '100%' }} onPress={this.props.onPress}>
          <Text>{this.props.text}</Text>
        </Button>
      </View>
    )
  }
}

BottomButton.propTypes = {
  color: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
}
