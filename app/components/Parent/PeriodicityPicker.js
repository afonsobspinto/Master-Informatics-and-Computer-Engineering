import React, { Component } from 'react'
import { View } from 'react-native'
import { Item, Label, Input, Button, Text } from 'native-base'
import PropTypes from 'prop-types'

export class PeriodicityPicker extends Component {
  constructor (props) {
    super(props)
    this.state = {
      detailedView: false
    }
  }

  toggleDetailedView = () => {
    this.setState({ detailedView: !this.state.detailedView })
  }

  changeGoalValue = (value) => {
    this.props.onDurationChange({ goal: value.replace(/[^\d.-]/g, ''), interpolate: this.state.detailedView })
  }

  changeMaxValue = (value) => {
    this.props.onDurationChange({ max: value.replace(/[^\d.-]/g, ''), interpolate: this.state.detailedView })
  }

  changeMinValue = (value) => {
    this.props.onDurationChange({ min: value.replace(/[^\d.-]/g, ''), interpolate: this.state.detailedView })
  }

  render () {
    return (
      <View>
        <Item stackedLabel>
          <Label>Periodicidade</Label>
          
        </Item>
      </View>
    )
  }
}

PeriodicityPicker.propTypes = {
}
