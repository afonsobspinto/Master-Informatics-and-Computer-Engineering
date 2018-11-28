import { ImagePicker, Permissions } from 'expo'
import { Body, Header, Icon, Left, Picker, Right, Form, Content, Container, Item, Input } from 'native-base'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Alert, Animated, Image, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'
// import Modal from 'react-native-modal'
// import DateTimePicker from 'react-native-modal-datetime-picker'
import { connect } from 'react-redux'
import { addCustomActivity } from '../actions/gameActions'
import Images from '../assets/images/images.js'
// import { DurationModal } from '../components/Slides/DurationModal'
import { PickerSettings } from '../components/Settings/PickerSettings'

class CreateNewActivityScreen extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isDatePickerVisible: false,
      isTimePickerVisible: false,
      activityStartingTime: new Date(),
      activityWeekDay: null,
      image: 'bed',
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
    this.items = ['Manhã', 'Noite']
    this.title = 'Escolher Rotina'
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

  getPickerImages = () => {
    return Object.keys(Images).map((image, index) =>
      <Picker.Item value={image} label={image} key={index} />
    )
  }

  buildNewCustomActivity = () => {
    Alert.alert('Atividade criada!')
    this.props.addCustomActivity(this.state.routine, {
      title: this.state.title,
      image: this.state.image,
      color: this.state.color,
      time: {
        min: this.state.minTime,
        max: this.state.maxTime,
        goal: this.state.goalTime
      }
    })
  }

  render () {
    return (
      <Container>
        <Header style={styles.container}>
          <Left>
            <Icon name='menu' onPress={() => this.props.navigation.openDrawer()} />
          </Left>
          <Body>
            <Text style={{ color: '#E8F1F2' }}>Criar uma nova atividade</Text>
          </Body>
          <Right />
        </Header>
        <Content>
          <Form>
            <Text>Nome:</Text>
            <Item>
              <Input />
            </Item>
            <Text>Escolha a rotina:</Text>
            <PickerSettings title={this.title} items={this.items} />
            <Text>Escolha a cor da rotina:</Text>
            <Text>Duração Mínima:</Text>
            <TextInput keyboardType='numeric' textContentType='telephoneNumber' />
            <Text>Duração Máximo:</Text>
            <TextInput keyboardType='numeric' textContentType='telephoneNumber' />
            <Text>Duração Ideal:</Text>
            <TextInput keyboardType='numeric' textContentType='telephoneNumber' />
            <Text>Escolha a imagem da atividade:</Text>
            <TouchableOpacity onPress={() => this.imagePicker(false)}>
              <Image style={{ height: 35, width: 35 }} source={require('../assets/images/icons/upload.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.buildNewCustomActivity}
              style={{ backgroundColor: 'gray', paddingLeft: 30, paddingRight: 30, paddingTop: 15, paddingBottom: 15 }}>
              <Text>Criar Atividade</Text>
            </TouchableOpacity>

          </Form>
        </Content>
      </Container>
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
