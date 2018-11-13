import { ImagePicker, Permissions } from 'expo'
import React, { Component } from 'react'
import { addCustomActivity } from '../actions/gameActions'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Image, View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import { Header, Left, Body, Right, Icon, Picker } from 'native-base'
import DateTimePicker from 'react-native-modal-datetime-picker'

import style from '../styles/CreateActivity.style'
import Images from '../assets/images/images.js'
class CreateNewActivityScreen extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isDatePickerVisible: false,
      isTimePickerVisible: false,
      activityStartingTime: new Date(),
      activityWeekDay: null,
      image: null
    }

    this.daysOfWeek = [
      'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ]
  }

  convertToWeekDay = (dayNumber) => {
    return this.daysOfWeek[dayNumber]
  }

  /* DATE PICKER */
  showDatePicker = () => {
    this.setState({
      isDatePickerVisible: true
    })
  }

  handleDatePicked = (date) => {
    this.state.activityWeekDay = this.convertToWeekDay(date.getDay())
    this.setState({
      isDatePickerVisible: false
    })
  }

  hideDatePicker = () => {
    this.setState({
      isDatePickerVisible: false
    })
  }

  /* TIME PICKER */
  showTimePicker = () => {
    this.setState({
      isTimePickerVisible: true
    })
  }

  handleTimePicked = (time) => {
    this.state.activityStartingTime.setHours(time.getHours())
    this.state.activityStartingTime.setMinutes(time.getMinutes())
    console.log(this.state.activityStartingTime.getHours() + '------' + this.state.activityStartingTime.getMinutes())
    this.setState({
      isTimePickerVisible: false
    })
  }

  hideTimePicker = () => {
    this.setState({
      isTimePickerVisible: false
    })
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
      console.log(result.uri)
    }
  }

  getPickerImages = () => {
    return Object.keys(Images).map((image, index) =>
      <Picker.Item value={image} label={image} key={index} />
    )
  }

  buildNewCustomActivity = () => {
    this.props.addCustomActivity('Após acordar', {
      title: 'Teste',
      image: 'bed',
      color: '#7d84b2',
      time: {
        min: 0,
        max: 20,
        goal: 10
      }
    })
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
            <TouchableOpacity onPress={this.showDatePicker}>
              <Text>Escolher data</Text>
            </TouchableOpacity>
            <DateTimePicker
              isVisible={this.state.isDatePickerVisible}
              onConfirm={this.handleDatePicked}
              onCancel={this.hideDatePicker}
            />
          </View>
          <View style={styles.inputContainer} >
            <Text style={styles.label} >Hora de Início :</Text>
            <TouchableOpacity onPress={this.showTimePicker}>
              <Text>Escolher hora de início</Text>
            </TouchableOpacity>
            <DateTimePicker
              mode='time'
              isVisible={this.state.isTimePickerVisible}
              onConfirm={this.handleTimePicked}
              onCancel={this.hideTimePicker}
            />
          </View>
          <View style={styles.inputContainer} >
            <Text style={styles.label} >Duração :</Text>
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
            <TouchableOpacity style={style.uploadImageBtn} onPress={() => this.imagePicker(false)}>
              <Text>Upload Image</Text>
            </TouchableOpacity>
            <Picker selectedValue={this.state.image} style={style.uploadImageBtn}
              onValueChange={(item) => this.setState({ image: item })}>
              {this.getPickerImages()}
            </Picker>
          </View>
        </ScrollView>
        <View>
          <TouchableOpacity style={styles.centeredContainer} onPress={this.buildNewCustomActivity}>
            <Text>Criar Atividade</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default connect(
  state => ({
    addCustomActivity: state.game.addCustomActivity
  }),
  dispatch => ({
    addCustomActivity: (routineTitle, activity) => dispatch(addCustomActivity(routineTitle, activity))
  })
)(CreateNewActivityScreen)

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
  navigation: PropTypes.object.isRequired,
  addCustomActivity: PropTypes.func.isRequired
}
