import { ImagePicker, Permissions } from 'expo'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Image, View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import { Header, Left, Body, Right, Icon } from 'native-base'
import CustomDrowpdown from '../components/Dropdowns/CustomDropdown'

import style from '../styles/CreateActivity.style'
export default class CreateNewActivityScreen extends Component {
  constructor (props) {
    super(props)

    this.state = {
      image: null
    }

    this.imagePicker = this.imagePicker.bind(this)
  }

  static navigationOptions = {
    header: null,
    drawerIcon: (
      <Image source={require('../assets/images/add-activity-icon.png')} style={{ height: 24, width: 24 }} />
    )
  };

  imagePicker = async (camera) => {
    let options = {
      allowsEditing: true, aspect: [1, 1]
    }
    let result

    if (camera) {
      await Permissions.askAsync(Permissions.CAMERA)
      result = await ImagePicker.launchCameraAsync({ ...options, mediaTypes: 'Images' })
    } else {
      await Permissions.askAsync(Permissions.CAMERA_ROLL)
      result = await ImagePicker.launchImageLibraryAsync(options)
    }

    if (!result.cancelled) {
      this.setState({ image: result.uri })
    }
  }

  render () {
    let { image } = this.state
    return (
      <View style={{ flex: 1 }} >
        <Header style={styles.container}>
          <Left>
            <Icon name='menu' onPress={() => this.props.navigation.openDrawer()} />
          </Left>
          <Body>
            <Text>Criar uma nova atividade</Text>
          </Body>
          <Right />
        </Header>
        <ScrollView style={{ flex: 1, flexDirection: 'row', padding: 20 }}>
          {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
          <View style={styles.centeredContainer}>
            <Text style={{ paddingBottom: 20 }}>Introduza os seguintes dados de forma a criar uma nova rotina.</Text>
          </View>
          <View style={styles.inputContainer} >
            <Text style={styles.label} >Nome :</Text>
            <TextInput style={{ height: 40, justifyContent: 'flex-end', width: 200, paddingHorizontal: 10, backgroundColor: 'gray', marginLeft: 20 }} placeholder='Nome da nova Atividade' />
          </View>
          <View style={styles.inputContainer} >
            <Text style={styles.label} >Dia da Tarefa :</Text>
            <CustomDrowpdown style={{ height: 40, justifyContent: 'flex-end', width: 200, paddingHorizontal: 10, backgroundColor: 'gray', marginLeft: 20 }} />
          </View>
          <View style={styles.inputContainer} >
            <Text style={styles.label} >Hora de Início :</Text>
          </View>
          <View style={styles.inputContainer} >
            <Text style={styles.label} >Duração :</Text>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label} >Categoria: </Text>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label} >Recompensa: </Text>
          </View>
          <View style={styles.inputContainer} >
            <Text style={styles.label} >Tema: </Text>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Logótipo da Atividade</Text>
            <TouchableOpacity style={style.uploadImageBtn} onPress={() => this.imagePicker(false)}>
              <Text>Upload Image</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.uploadImageBtn} onPress={() => this.imagePicker(true)}>
              <Text>Open Camera</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Imagem de Atividade</Text>
          </View>
        </ScrollView>
        <View>
          <TouchableOpacity style={styles.centeredContainer}>
            <Text>Criar Atividade</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  label: {
    justifyContent: 'flex-start',
    backgroundColor: 'blue',
    width: 150,
    height: 40
  },
  inputContainer: {
    flexDirection: 'row',
    paddingBottom: 20
  },
  container: {
    height: 90,
    paddingTop: 15,
    backgroundColor: '#33adff'
  },
  centeredContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})

CreateNewActivityScreen.propTypes = {
  navigation: PropTypes.object.isRequired
}
