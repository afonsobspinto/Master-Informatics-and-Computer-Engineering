import React, { Component } from 'react'
import { Picker } from 'native-base'
import { View, Image, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

export class SelectChildPicker extends Component {
  render () {
    const pickerItems = this.props.children.map((child, index) => (<Picker.Item label={child.name} value={index} key={index} />))

    return (
      <View style={styles.childPickerContainer}>
        <View style={styles.imageView}>
          <Image style={styles.photo} source={{ uri: this.props.children[this.props.selected].image }} />
        </View>
        <Picker
          mode='dropdown'
          style={{ flexGrow: 1, height: '100%' }}
          selectedValue={this.props.selected}
          onValueChange={this.props.onChildChanged}
          itemTextStyle={{ color: 'red' }}
        >
          {pickerItems}
        </Picker>
      </View>
    )
  }
}

SelectChildPicker.propTypes = {
  children: PropTypes.array.isRequired,
  selected: PropTypes.number.isRequired,
  onChildChanged: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  imageView: {
    height: 70,
    width: 70,
    borderRadius: 35,
    margin: 15,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  photo: {
    width: '100%',
    height: '100%'
  },
  childPickerContainer: {
    width: '100%',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    alignItems: 'center'
  }
})
