import React, { Component } from 'react'
import { ImagePicker, Permissions } from 'expo'
import { Label, Button, Text, Item } from 'native-base'
import { View, StyleSheet, Image } from 'react-native'
import PropTypes from 'prop-types'

export class PhotoPickerButton extends Component {
  imagePicker = async (camera) => {
    const options = { allowsEditing: true, aspect: [1, 1] }
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

  render () {
    return (
      <View>
        <Item stackedLabel>
          <Label>Imagem</Label>
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
          </View>
        </Item>
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
    aspectRatio: 1
  },
  imageContainer: {
    flexGrow: 1,
    paddingRight: 15,
    marginTop: 15,
    alignItems: 'center'
  }
})

PhotoPickerButton.propTypes = {
  color: PropTypes.string.isRequired,
  onPhotoChange: PropTypes.func.isRequired,
  photo: PropTypes.object
}
