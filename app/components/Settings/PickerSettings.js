import React, { Component } from 'react'
import { Picker, Item } from 'native-base'
import PropTypes from 'prop-types'

export class PickerSettings extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: 0
    }
  }

  onValueChange = value => {
    this.setState({
      selected: value
    })
  }

  render () {
    const pickerItems = this.props.items.map((item, index) => (<Picker.Item label={item} value={index} key={index} />))
    return (
      <Item picker>
        <Picker
          mode='dropdown'
          style={{ width: 120 }}
          placeholder={this.props.title}
          placeholderIconColor='#007aff'
          selectedValue={this.state.selected}
          onValueChange={this.onValueChange}
        >
          {pickerItems}
        </Picker>
      </Item>
    )
  }
}

PickerSettings.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired
}
