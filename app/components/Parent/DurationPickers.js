import React, { Component } from 'react'
import { View } from 'react-native'
import { Item, Label, Input, Button, Text } from 'native-base'
import PropTypes from 'prop-types'

export class DurationPickers extends Component {
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
          <Label>{this.state.detailedView ? 'Duração ideal (minutos)' : 'Duração (minutos)'}</Label>
          <Input keyboardType='numeric' textContentType='telephoneNumber' value={this.props.time.goal} onChangeText={this.changeGoalValue} />
        </Item>
        {this.state.detailedView && <Item stackedLabel>
          <Label>Duração Minima (minutos)</Label>
          <Input keyboardType='numeric' textContentType='telephoneNumber' value={this.props.time.min} onChangeText={this.changeMinValue} />
        </Item>}
        {this.state.detailedView && <Item stackedLabel>
          <Label>Duração Máxima (minutos)</Label>
          <Input keyboardType='numeric' textContentType='telephoneNumber' value={this.props.time.max} onChangeText={this.changeMaxValue} />
        </Item>}
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          <Button transparent onPress={this.toggleDetailedView}>
            <Text style={{ color: this.props.color }}>{this.state.detailedView ? 'Menos opções de duração' : 'Mais opções de duração'}</Text>
          </Button>
        </View>
      </View>
    )
  }
}

DurationPickers.propTypes = {
  onDurationChange: PropTypes.func,
  time: PropTypes.object.isRequired,
  color: PropTypes.string.isRequired
}
