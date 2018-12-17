import React, { Component } from 'react'
import { Picker, Text } from 'native-base'
import { View, Image, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import images from '../../assets/images/images'

export class SelectChildPicker extends Component {
  render () {
    const pickerItems = this.props.children.map((child, index) => (<Picker.Item label={child.name} value={index} key={index} />))

    return (
      <View style={styles.childPickerContainer}>
        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
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
        {!this.props.hideStatus && <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 15, paddingTop: 0 }}>
          <Text>Nível {this.props.children[this.props.selected].level}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image style={{ height: 20, width: 20, marginRight: 5 }} source={images.ui.star} />
            <Text>{this.props.children[this.props.selected].stars}</Text>
          </View>
        </View>}
      </View>
    )
  }
}

SelectChildPicker.propTypes = {
  children: PropTypes.array.isRequired,
  selected: PropTypes.number.isRequired,
  onChildChanged: PropTypes.func.isRequired,
  hideStatus: PropTypes.bool
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
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey'
  },
  rowView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center'
  }
})
