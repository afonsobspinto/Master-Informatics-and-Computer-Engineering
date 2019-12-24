import React, { Component } from 'react'
import { Body, Header, Icon, Left, Label, Title, Button, Form, Content, Container, Item, Input, Right, Toast } from 'native-base'
import { Alert } from 'react-native'
import PropTypes from 'prop-types'
import EnvVars from '../../constants/EnviromentVars'

import { ItemPicker } from '../../components/Parent/ItemPicker'
import { ColorPicker } from '../../components/Parent/ColorPicker'
import { DurationPickers } from '../../components/Parent/DurationPickers'
import { ImagePickerButtons } from '../../components/Parent/ImagePickerButtons'
import { BottomButton } from '../../components/Parent/BottomButton'
import { availableColors } from '../../styles/Colors'
import { connect } from 'react-redux'

export class ActivityFormScreen extends Component {
  constructor (props) {
    super(props)

    const activity = this.props.navigation.getParam('activity')

    if (activity) {
      this.state = {
        ...activity,
        time: {
          goal: (activity.time.goal / 60).toFixed(2).toString(),
          min: (activity.time.min / 60).toFixed(2).toString(),
          max: (activity.time.max / 60).toFixed(2).toString()
        },
        routine: this.props.routines.find(routine => routine.activities.some(act => act.id === activity.id)).id
      }
    } else {
      this.state = {
        title: 'Atividade de testes',
        color: '#0074D9',
        time: {
          goal: '3',
          min: '1.5',
          max: '6'
        },
        photo: undefined,
        image: undefined,
        routine: this.props.routines[0].id,
        createActivity: true
      }
    }

    this.state.imageHash = Math.random().toString(36).substr(2, 10)
    this.state.fileType = undefined

    this.onColorChange = this.onColorChange.bind(this)
    this.onImageChange = this.onImageChange.bind(this)
    this.onPhotoChange = this.onPhotoChange.bind(this)
  }

  onColorChange = code => {
    this.setState({ color: code })
  }

  onDurationChange = bundle => {
    if (bundle.goal !== undefined) this.calculateTime(bundle.goal, this.state.time.min, this.state.time.max, !bundle.interpolate)
    if (bundle.min !== undefined) this.calculateTime(this.state.time.goal, bundle.min, this.state.time.max, !bundle.interpolate)
    if (bundle.max !== undefined) this.calculateTime(this.state.time.goal, this.state.time.min, bundle.max, !bundle.interpolate)
  }

  calculateTime = (goal, min, max, interpolate) => {
    const time = interpolate
      ? { goal, min: (goal * 0.25).toString(), max: (goal * 2).toString() }
      : { goal, min, max }

    this.setState({ time })
  }

  onPhotoChange = uri => {
    this.setState({ photo: uri, fileType: uri.split('.')[uri.split('.').length - 1] })
  }

  onImageChange = image => {
    this.setState({ image: image })
  }

  onRoutineChange = index => {
    this.setState({ routine: this.props.routines[index].id })
  }

  removeActivity = () => {
    Alert.alert(
      `Tem a certeza que pretende apagar a atividade "${this.state.title}"?`,
      'Esta ação não pode ser revertida.',
      [
        { text: 'Não', style: 'cancel' },
        { text: 'Sim', onPress: this.sendRemovePost }
      ],
      { cancelable: false }
    )
  }

  sendRemovePost = () => {
    fetch(EnvVars.apiUrl + 'routine_manager/delete-activity/', {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        activityID: this.state.id
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === '200') {
          console.log('actividade apagada')
          this.props.navigation.popToTop()
        } else {
          console.log('actividade nao apagada')
        }
        return responseJson
      })
      .catch((error) => {
        console.error(error)
      })
  }

  handleServerRequests = () => {
    if (!this.checkInputs()) return
    if (this.state.photo) {
      this.uploadImageAsync(this.state.photo)
        .then(this.createActivity())
    } else {
      this.createActivity()
    }
  }

  createActivity = () => {
    fetch(EnvVars.apiUrl + 'routine_manager/add-activity/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        routineID: this.state.routine,
        title: this.state.title,
        color: this.state.color,
        image: this.state.image === undefined ? null : this.state.image,
        photo: this.state.photo === undefined ? null : `${this.state.imageHash}.${this.state.fileType}`,
        timeGoal: parseFloat(this.state.time.goal) * 60,
        timeMin: parseFloat(this.state.time.min) * 60,
        timeMax: parseFloat(this.state.time.max) * 60
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === '200') {
          this.props.navigation.pop()
        } else {
          console.log('not ok')
        }
        return responseJson
      })
      .catch((error) => {
        console.error(error)
      })
  }

  async uploadImageAsync (uri) {
    let apiUrl = EnvVars.apiUrl + 'routine_manager/assets/images/'
    let formData = new FormData()
    formData.append('photo', {
      uri,
      name: `${this.state.imageHash}.${this.state.fileType}`,
      type: `image/${this.state.fileType}`
    })

    let options = {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data'
      }
    }
    return fetch(apiUrl, options)
  }

  editActivity = () => {
    if (this.state.photo !== null && this.state.photo.includes('file://')) {
      this.uploadImageAsync(this.state.photo)
        .then(this.sendEditRequest(true))
    } else {
      this.sendEditRequest(false)
    }
  }

  sendEditRequest = photoChanged => {
    fetch(EnvVars.apiUrl + 'routine_manager/edit-activity/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        activityID: this.state.id,
        routineID: this.state.routine,
        title: this.state.title,
        color: this.state.color,
        image: this.state.image,
        photo: photoChanged ? `${this.state.imageHash}.${this.state.fileType}` : this.state.photo,
        timeGoal: parseFloat(this.state.time.goal) * 60,
        timeMin: parseFloat(this.state.time.min) * 60,
        timeMax: parseFloat(this.state.time.max) * 60
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === '200') {
          console.log('actividade editada')
          this.props.navigation.popToTop()
        } else {
          console.log('actividade nao editada')
        }
        return responseJson
      })
      .catch(
        /* istanbul ignore next */
        (error) => {
          console.error(error)
        })
  }

  showToast = message => (Toast.show({ text: message, buttonText: 'OK' }))

  checkInputs = () => {
    if (this.state.title === '') {
      this.showToast('O nome da atividade não deverá estar vazio!')
      return false
    }
    if (this.state.time.goal === undefined || this.state.time.min === undefined || this.state.time.max === undefined) {
      this.showToast('O tempo da atividade não deverá estar vazia!')
      return false
    }
    return true
  }

  render () {
    return (
      <Container>
        <Header style={{ backgroundColor: this.state.color }} androidStatusBarColor={this.state.color}>
          <Left>
            <Button className='back' transparent onPress={() => this.props.navigation.pop()}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>{this.state.title}</Title>
          </Body>
          <Right>
            {!this.state.createActivity && <Button className='delete' transparent onPress={this.removeActivity}>
              <Icon name='md-trash' />
            </Button>}
          </Right>
        </Header>
        <Content>
          <Form>
            <Item stackedLabel>
              <Label>Nome</Label>
              <Input className='input' value={this.state.title} onChangeText={text => this.setState({ title: text })} />
            </Item>
            <Item stackedLabel>
              <Label>Rotina</Label>
              <ItemPicker items={this.props.routines.map(routine => routine.title)} selected={this.props.routines.find(routine => routine.id === this.state.routine).title} onValueChange={this.onRoutineChange} />
            </Item>
            <Item stackedLabel>
              <Label>Cor</Label>
              <ColorPicker color={this.state.color} colors={availableColors} onColorChange={this.onColorChange} />
            </Item>
            <DurationPickers color={this.state.color} time={this.state.time} onDurationChange={this.onDurationChange} />
            <ImagePickerButtons color={this.state.color} onImageChange={this.onImageChange} onPhotoChange={this.onPhotoChange} photo={this.state.photo} image={this.state.image} />
            <BottomButton color={this.state.color} text={this.state.createActivity ? 'Criar Atividade' : 'Editar Atividade'} onPress={this.state.createActivity ? this.handleServerRequests : this.editActivity} />
          </Form>
        </Content>
      </Container>
    )
  }
}

export default connect(
  /* istanbul ignore next */
  state => ({
    routines: state.user.routines
  })
)(ActivityFormScreen)

ActivityFormScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  routines: PropTypes.array.isRequired
}