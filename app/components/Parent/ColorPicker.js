import React, { Component } from 'react'
import { Picker, Item } from 'native-base'
import PropTypes from 'prop-types'

export class ColorPicker extends Component {
  constructor (props) {
    super(props)
    if (!this.props.colors.some(color => color.code === props.color)) this.state = { customColor: props.color }
    else this.state = {}
  }

  onValueChange = value => {
    if (value === 999) this.props.onColorChange(this.state.customColor)
    else this.props.onColorChange(this.props.colors[value].code)
  }

  getSelectedValue = () => {
    const index = this.props.colors.findIndex(color => color.code === this.props.color)
    return index === undefined ? 999 : index
  }

  render () {
    let pickerItems = this.props.colors.map((color, index) => (<Picker.Item label={color.name} value={index} key={index} />))
    if (this.state.customColor) pickerItems = [(<Picker.Item label={'Outra'} value={999} key={999} />), ...pickerItems]

    return (
      <Item picker style={{ borderColor: this.props.color }}>
        <Picker
          mode='dropdown'
          style={{ width: 120 }}
          selectedValue={this.getSelectedValue()}
          onValueChange={this.onValueChange}>
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
