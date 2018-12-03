import { ImagePicker, Permissions } from 'expo'
import { Body, Header, Icon, Left, Picker, Right } from 'native-base'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Alert, Animated, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal'
import DateTimePicker from 'react-native-modal-datetime-picker'
import { connect } from 'react-redux'
import { addCustomActivity } from '../actions/gameActions'
import Images from '../assets/images/images.js'
import { DurationModal } from '../components/Slides/DurationModal'

class CreateNewActivityScreen extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isDatePickerVisible: false,
      isTimePickerVisible: false,
      activityStartingTime: new Date(),
      activityWeekDay: null,
      image: null,
      photo: null,
      title: 'Atividade de testes',
      color: '#7d84b2',
      routinePeriod: '',
      minTime: 0,
      maxTime: 20,
      goalTime: 10,
      routine: 'Após acordar',
      showRoutineDurationView: false,
      bouceValue: new Animated.Value(200)
    }

    this.daysOfWeek = [
      'Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'
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
    this.setState({
      isTimePickerVisible: false
    })
  }

  hideTimePicker = () => {
    this.setState({
      isTimePickerVisible: false
    })
  }

  updateRoutinePeriod = (period) => {
    this.setState({
      routinePeriod: period
    })
  }

  toggleRoutineDurationModal = () => {
    this.setState({
      showRoutineDurationView: !this.state.showRoutineDurationView
    })
  }
  static navigationOptions = {
    header: null,
    drawerIcon: (
      <Image source={require('../assets/images/add-activity-icon.png')} style={{ height: 24, width: 24 }} />
    )
  };

  imagePicker = async (camera, photo) => {
    let options = {
      allowsEditing: true, aspect: [1, 1]
    }
    let result

    if (camera) {
      await Permissions.askAsync(Permissions.CAMERA)
      result = await ImagePicker.launchCameraAsync({ ...options, mediaTypes: 'Images', aspect: [5, 3] })
    } else {
      await Permissions.askAsync(Permissions.CAMERA_ROLL)
      if (photo) {
        result = await ImagePicker.launchImageLibraryAsync({ ...options, aspect: [5, 3] })
      } else {
        result = await ImagePicker.launchImageLibraryAsync(options)
      }
    }

    if (!result.cancelled) {
      this.setState(camera ? { photo: result.uri } : { image: result.uri })
    }
  }

  getPickerImages = () => {
    return Object.keys(Images).map((image, index) =>
      <Picker.Item value={image} label={image} key={index} />
    )
  }

  buildNewCustomActivity = () => {
    Alert.alert('Atividade criada!')

    this.props.addCustomActivity(this.state.routine, {
      title: this.state.title,
      color: this.state.color,
      image: (this.state.image !== null ? this.state.image : undefined),
      photo: (this.state.photo !== null ? this.state.photo : undefined),
      time: {
        min: this.state.minTime,
        max: this.state.maxTime,
        goal: this.state.goalTime
      }
    })
  }

  render () {
    return (
      <View style={{ flex: 1 }} >
        <Header style={styles.container}>
          <Left>
            <Icon name='menu' onPress={() => this.props.navigation.openDrawer()} />
          </Left>
          <Body>
            <Text style={{ color: '#E8F1F2' }}>Criar uma nova atividade</Text>
          </Body>
          <Right />
        </Header>
        <ScrollView style={styles.activeScrollView}>
          <View style={styles.centeredContainer}>
            <Text style={{ paddingBottom: 20 }}>Introduza os seguintes dados de forma a criar uma nova rotina.</Text>
          </View>
          <View style={styles.inputContainer} >
            <Text style={styles.label} >Nome</Text>
            <TextInput style={{ height: 50, alignSelf: 'stretch', paddingHorizontal: 10, borderBottomColor: '#13293D', borderBottomWidth: 1 }} placeholder='Nome da nova Atividade'
              underlineColorAndroid={'transparent'} onChangeText={(title) => this.setState({ title })} value={this.state.title} />
          </View>
          <View style={{ flexDirection: 'row', height: 70 }} >
            <View style={{ flexBasis: '50%', justifyContent: 'center', alignItems: 'flex-start' }}>
              <Text>Data da Atividade</Text>
            </View>
            <View style={{ flexDirection: 'row', flexBasis: '50%', justifyContent: 'center', alignItems: 'center' }}>
              <Text>{this.state.activityWeekDay}</Text>
              <View style={{ flexBasis: '35%' }}>
                <TouchableOpacity onPress={this.showDatePicker}>
                  <Image style={{ alignSelf: 'flex-end', height: 35, width: 35 }} source={require('../assets/images/add-activity-icon.png')} />
                  <DateTimePicker
                    isVisible={this.state.isDatePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.hideDatePicker}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'row', height: 70 }}>
            <View style={{ flexBasis: '50%', justifyContent: 'center', alignItems: 'flex-start' }} >
              <Text>Hora da Atividade</Text>
            </View>
            <View style={{ flexDirection: 'row', flexBasis: '50%', justifyContent: 'center', alignItems: 'center' }} >
              <Text>{this.state.activityStartingTime.getHours()} : {this.state.activityStartingTime.getMinutes()}</Text>
              <View style={{ flexBasis: '35%' }} >
                <TouchableOpacity onPress={this.showTimePicker}>
                  <Image style={{ alignSelf: 'flex-end', height: 35, width: 35 }} source={require('../assets/images/add-activity-icon.png')} />
                </TouchableOpacity>
                <DateTimePicker
                  mode='time'
                  isVisible={this.state.isTimePickerVisible}
                  onConfirm={this.handleTimePicked}
                  onCancel={this.hideTimePicker}
                />
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'row', paddingBottom: 20, justifyContent: 'center', alignItems: 'flex-start' }} >
            <Text style={{ alignSelf: 'center', flexBasis: '40%' }} >Periodicidade</Text>
            <Picker
              selectedValue={this.state.routinePeriod}
              onValueChange={this.updateRoutinePeriod}
            >
              <Picker.Item label='Uma vez apenas' value='only-one' />
              <Picker.Item label='Semanalmente' value='weekly' />
              <Picker.Item label='Mensalmente' value='monthly' />
              <Picker.Item label='Personalizar' value='personalized' />
            </Picker>
          </View>
          <View style={{ flexDirection: 'row', height: 70, paddingBottom: 20 }}>
            <View style={{ flexBasis: '50%', justifyContent: 'center', alignItems: 'flex-start' }} >
              <Text>Duração da Atividade</Text>
            </View>
            <View style={{ flexDirection: 'row', flexBasis: '50%', justifyContent: 'center', alignItems: 'center' }} >
              <Text>Dura selecionada</Text>
              <View style={{ flexBasis: '35%' }} >
                <TouchableOpacity onPress={this.showTimePicker}>
                  <Image style={{ alignSelf: 'flex-end', height: 35, width: 35 }} source={require('../assets/images/add-activity-icon.png')} />
                </TouchableOpacity>
                <Modal
                  isVisible={this.state.showRoutineDurationView}
                  style={styles.durationModal}>
                  <DurationModal closeModalCallback={this.toggleRoutineDurationModal} />
                </Modal>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.label} >Recompensa: </Text>
          </View>
          <View style={{ flexDirection: 'row' }} >
            <Text style={styles.label} >Inserir em Rotina</Text>
            <Picker
              selectedValue={this.state.routinePeriod}
              onValueChange={this.updateRoutinePeriod}
            >
              <Picker.Item label='Após Acordar' value='after-wakeup' />
            </Picker>
          </View>
          <View>
            <Text style={styles.label}>Imagem da Atividade</Text>
            <View style={{ flexDirection: 'row', paddingBottom: 20 }}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                <TouchableOpacity style={{ flexBasis: '50%', flexDirection: 'column' }}
                  onPress={() => this.imagePicker(false, true)}>
                  <Image style={{ height: 35, width: 35 }} source={require('../assets/images/icons/upload.png')} />
                </TouchableOpacity>
                <Text style={{ fontSize: 12, paddingTop: 5 }}>Importar imagem da galeria</Text>
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center', flexBasis: '50%' }}>
                <TouchableOpacity
                  onPress={() => this.imagePicker(true, true)}>
                  <Image style={{ height: 40, width: 40 }} source={require('../assets/images/icons/camera.png')} />
                </TouchableOpacity>
                <Text style={{ fontSize: 12, paddingTop: 5 }}>Tirar fotografia</Text>
              </View>
            </View>
          </View>
          <View style={{ paddingBottom: 20 }}>
            <Text style={styles.label}>Logótipo de Atividade</Text>
            <View styles={{ flexDirection: 'row' }}>
              <View style={{ flexBasis: '50%' }}>
                <TouchableOpacity onPress={() => this.imagePicker(false, false)}>
                  <Image style={{ height: 35, width: 35 }} source={require('../assets/images/icons/upload.png')} />
                </TouchableOpacity>
                <Text style={{ fontSize: 12, paddingTop: 5 }}>Importar imagem da galeria</Text>
              </View>
              <View style={{ flexBasis: '50%' }}>
                <Picker selectedValue={this.state.image}
                  style={{ width: 100 }}
                  onValueChange={(item) => this.setState({ image: item })}>
                  {this.getPickerImages()}
                </Picker>
                <Text style={{ fontSize: 12 }}>Escolher imagem pré-definida</Text>
              </View>
            </View>
          </View>
          <View style={{ paddingBottom: 40, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={this.buildNewCustomActivity}
              style={{ backgroundColor: 'gray', paddingLeft: 30, paddingRight: 30, paddingTop: 15, paddingBottom: 15 }}>
              <Text>Criar Atividade</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
    width: 150,
    height: 40
  },
  inputContainer: {
    paddingBottom: 20
  },
  container: {
    height: 90,
    paddingTop: 15,
    backgroundColor: '#006494'
  },
  centeredContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  animatedModal: {
    position: 'absolute',
    alignSelf: 'stretch',
    left: 10,
    bottom: 200,
    right: 10
  },
  activeScrollView: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 40,
    paddingRight: 40,
    backgroundColor: '#EFF2F2'
  },
  durationModal: {
    flex: 1,
    backgroundColor: 'white'
  }
})

CreateNewActivityScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  addCustomActivity: PropTypes.func.isRequired
}
