import React, { Component } from 'react'
import { Picker, Item } from 'native-base'
import PropTypes from 'prop-types'

export class ColorPicker extends Component {
  onValueChange = value => {
    this.props.onColorChange(this.props.colors[value].code)
  }

  render () {
    const pickerItems = this.props.colors.map((color, index) => (<Picker.Item label={color.name} value={index} key={index} />))
    return (
      <Item picker style={{ borderColor: this.props.color }}>
        <Picker
          mode='dropdown'
          style={{ width: 120 }}
          selectedValue={this.props.colors.findIndex(color => color.code === this.props.color)}
          onValueChange={this.onValueChange}
        >
          {pickerItems}
        </Picker>
      </Item>
    )
  }
}

ColorPicker.propTypes = {
  color: PropTypes.string.isRequired,
  colors: PropTypes.array.isRequired,
  onColorChange: PropTypes.func.isRequired
}
