import React, { Component } from 'react'
import { Picker } from 'native-base'
import PropTypes from 'prop-types'

export class ItemPicker extends Component {
  render () {
    const pickerItems = this.props.items.map((item, index) => (<Picker.Item label={item} value={index} key={index} />))
    return (
      <Picker
        mode='dropdown'
        style={{ width: '100%' }}
        selectedValue={this.props.items.findIndex(item => item === this.props.selected)}
        onValueChange={this.props.onValueChange}
      >
        {pickerItems}
      </Picker>
    )
  }
}

ItemPicker.propTypes = {
  items: PropTypes.array.isRequired,
  selected: PropTypes.any,
  onValueChange: PropTypes.func.isRequired
}
