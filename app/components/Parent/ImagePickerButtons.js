import React, { Component } from 'react'
import { ImagePicker, Permissions } from 'expo'
import { Label, Button, Text, Item } from 'native-base'
import { View, StyleSheet, Image } from 'react-native'
import PropTypes from 'prop-types'

import Images, { availableImages } from '../../assets/images/images'
import { ItemPicker } from './ItemPicker'

export class ImagePickerButtons extends Component {
  constructor (props) {
    super(props)
    this.state = {
      photoView: true
    }
  }

  togglePhotoView = () => {
    this.setState({ photoView: !this.state.photoView })
  }

  imagePicker = async (camera) => {
    const options = { allowsEditing: true, aspect: [5, 3] }
    let result

    if (camera) {
      await Permissions.askAsync(Permissions.CAMERA)
      result = await ImagePicker.launchCameraAsync({ ...options, mediaTypes: 'Images' })
    } else {
      await Permissions.askAsync(Permissions.CAMERA_ROLL)
      result = await ImagePicker.launchImageLibraryAsync(options)
    }

    if (!result.cancelled) {
      this.props.onPhotoChange(result.uri)
    }
  }

  onImageChanged = (index) => {
    this.props.onImageChange(availableImages.map(item => item.image)[index])
  }

  getSelectedImageName = () => {
    const image = availableImages.find(item => item.image === this.props.image)
    if (image) return image.name
    else return undefined
  }

  renderOption = () => {
    if (this.state.photoView) {
      return (
        <View style={styles.itemContainer}>
          {this.props.photo && <View style={styles.imageContainer}>
            <Image style={styles.photoPreview} source={this.props.photo} resizeMode={'contain'} />
          </View>}
          <View style={styles.imageButtonContainer}>
            <Button style={[styles.imageButton, { backgroundColor: this.props.color }]} onPress={() => this.imagePicker(true)}>
              <Text>Camara</Text>
            </Button>
            <Button style={[styles.imageButton, { backgroundColor: this.props.color }]} onPress={() => this.imagePicker(false)}>
              <Text>Galeria</Text>
            </Button>
          </View>
        </View>)
    } else {
      return (
        <View style={styles.itemContainer}>
          {this.props.image && <View style={styles.imageContainer}>
            <Image style={styles.imagePreview} source={Images[this.props.image]} resizeMode={'contain'} />
          </View>}
          <Item style={{ borderColor: 'transparent' }}>
            <ItemPicker items={availableImages.map(item => item.name)} selected={this.getSelectedImageName()} onValueChange={this.onImageChanged} />
          </Item>
        </View>
      )
    }
  }

  render () {
    return (
      <View>
        <Item stackedLabel>
          <Label>Imagem</Label>
          {this.renderOption()}
        </Item>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          <Button transparent onPress={this.togglePhotoView}>
            <Text style={{ color: this.props.color }}>{this.state.photoView ? 'Escolher imagem' : 'Escolher fotografia'}</Text>
          </Button>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'column',
    width: '100%'
  },
  imageButtonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  imageButton: {
    flex: 1,
    marginRight: 15,
    marginVertical: 15,
    justifyContent: 'center'
  },
  photoPreview: {
    width: '100%',
    aspectRatio: 1.666
  },
  imagePreview: {
    width: 100,
    height: 100
  },
  imageContainer: {
    flexGrow: 1,
    paddingRight: 15,
    marginTop: 15,
    alignItems: 'center'
  }
})

ImagePickerButtons.propTypes = {
  color: PropTypes.string.isRequired,
  onPhotoChange: PropTypes.func.isRequired,
  onImageChange: PropTypes.func.isRequired,
  photo: PropTypes.object,
  image: PropTypes.string
}
