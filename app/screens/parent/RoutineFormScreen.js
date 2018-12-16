import React, { Component } from 'react'
import { Body, Header, Icon, Left, Label, Title, Button, Form, Content, Container, Item, Input, Right } from 'native-base'
import { Alert } from 'react-native'
import PropTypes from 'prop-types'

import { ColorPicker } from '../../components/Parent/ColorPicker'
import { PeriodicityPicker } from '../../components/Parent/PeriodicityPicker'
import { ImagePickerButtons } from '../../components/Parent/ImagePickerButtons'
import { BottomButton } from '../../components/Parent/BottomButton'
import { availableColors } from '../../styles/Colors'
import { SortableList } from '../../components/Parent/SortableList'

import EnvVars from '../../constants/EnviromentVars'

const defaultState = {
  title: 'Nome da rotina',
  color: '#0074D9',
  isRepeat: false,
  periodicity: '0000011',
  createRoutine: true
}

export default class RoutineFormScreen extends Component {
  constructor (props) {
    super(props)

    const routine = this.props.navigation.getParam('routine')

    this.state = routine ? { ...routine } : defaultState

    this.state.periodicity = this.decodePeriodicity(this.state.periodicity)

    this.onColorChange = this.onColorChange.bind(this)
    this.onImageChange = this.onImageChange.bind(this)
    this.onPhotoChange = this.onPhotoChange.bind(this)
    this.togglePeriodicity = this.togglePeriodicity.bind(this)
    this.moveItemUp = this.moveItemUp.bind(this)
  }

  decodePeriodicity = periodicity => {
    const periodicityArray = []
    for (let i = 0; i < periodicity.length; i++) if (periodicity.charAt(i) === '1') periodicityArray.push(i)
    return periodicityArray
  }

  onColorChange = code => {
    this.setState({ color: code })
  }

  onPhotoChange = uri => {
    this.setState({ photo: uri })
  }

  onImageChange = image => {
    this.setState({ image: image })
  }

  onActivityPress = index => {
    this.props.navigation.navigate('ActivityFormScreen', { activity: this.state.activities[index] })
  }

  togglePeriodicity = (index) => {
    if (this.state.periodicity.includes(index)) this.setState({ periodicity: this.state.periodicity.filter(day => day !== index) })
    else this.setState({ periodicity: [index, ...this.state.periodicity] })
  }

  toggleIsRepeat = () => {
    this.setState({ isRepeat: !this.state.isRepeat })
  }

  encodePeriodicity () {
    let codedPeriodicity = '0000000'
    for (let x in this.state.periodicity) {
      let index = this.state.periodicity[x]
      if (index > codedPeriodicity.length - 1) {
        break
      } else {
        codedPeriodicity = codedPeriodicity.substr(0, index) + '1' + codedPeriodicity.substr(index + 1)
      }
    }
    return codedPeriodicity
  }

  createRoutine = () => {
    fetch(EnvVars.apiUrl + 'routine_manager/add-routine/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: this.state.title,
        color: this.state.color,
        image: this.state.image,
        photo: this.state.photo,
        repeatable: (this.state.isRepeat).toString(),
        periodicity: this.encodePeriodicity()
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === '200') {
          console.log('salvo')
        } else {
          console.log('oops')
        }
        return responseJson
      })
      .catch((error) => {
        console.error(error)
      })
  }

  editRoutine = () => {
    fetch(EnvVars.apiUrl + 'routine_manager/edit-routine/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        routineID: this.state.id,
        title: this.state.title,
        color: this.state.color,
        // TODO: adicionar foto/imagem aos edits
        image: this.state.image,
        photo: this.state.photo,
        isWeeklyRepeatable: (this.state.isRepeat).toString(),
        periodicity: this.encodePeriodicity()
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === '200') {
          console.log('editado')
          this.props.navigation.pop()
        } else {
          console.log('nao editado')
        }
        return responseJson
      })
      .catch((error) => {
        console.error(error)
      })
  }

  removeRoutine = () => {
    Alert.alert(
      `Tem a certeza que pretende apagar a rotina "${this.state.title}"?`,
      'Esta ação não pode ser revertida',
      [
        { text: 'Não', style: 'cancel' },
        { text: 'Sim', onPress: this.sendRemovePost }
      ],
      { cancelable: false }
    )
  }

  sendRemovePost = () => {
    fetch(EnvVars.apiUrl + 'routine_manager/delete-routine/', {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        routineID: this.state.id
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === '200') {
          console.log('rotina apagada')
          this.props.navigation.pop()
        } else {
          console.log('rotina nao apagada')
        }
        return responseJson
      })
      .catch((error) => {
        console.error(error)
      })
  }

  moveItemUp = (i) => {
    if (i === 0) return
    this.setState({ activities: this.state.activities.map((element, index) => {
      if (index === i - 1) return this.state.activities[i]
      else if (index === i) return this.state.activities[i - 1]
      else return element
    }) }, () => {
      let url = `${EnvVars.apiUrl}routine_manager/switch-activity-weight`
      fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstActivityID: this.state.activities[i].id,
          secondActivityID: this.state.activities[i - 1].id
        })
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.status === '200') {
            console.log('trocado')
          } else {
            console.log('nao trocado')
          }
          return responseJson
        })
        .catch((error) => {
          console.error(error)
        })
    })
  }

  render () {
    return (
      <Container>
        <Header style={{ backgroundColor: this.state.color }} androidStatusBarColor={this.state.color}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.pop()}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>{this.state.title}</Title>
          </Body>
          <Right>
            {!this.state.createRoutine && <Button transparent onPress={this.removeRoutine}>
              <Icon name='md-trash' />
            </Button>}
          </Right>
        </Header>
        <Content>
          <Form>
            <Item stackedLabel>
              <Label>Nome</Label>
              <Input value={this.state.title} onChangeText={text => this.setState({ title: text })} />
            </Item>
            <Item stackedLabel>
              <Label>Cor</Label>
              <ColorPicker color={this.state.color} colors={availableColors} onColorChange={this.onColorChange} />
            </Item>
            <PeriodicityPicker color={this.state.color} isRepeat={this.state.isRepeat} periodicity={this.state.periodicity} togglePeriodicity={this.togglePeriodicity} toggleIsRepeat={this.toggleIsRepeat} />
            <ImagePickerButtons color={this.state.color} onImageChange={this.onImageChange} onPhotoChange={this.onPhotoChange} photo={this.state.photo} image={this.state.image} />
            {this.state.activities && <Item stackedLabel style={{ borderColor: 'transparent' }}>
              <Label>Atividades</Label>
              <SortableList items={this.state.activities} color={this.state.color} onItemPress={this.onActivityPress} moveItemUp={this.moveItemUp} />
            </Item>}
            <BottomButton color={this.state.color} text={this.state.createRoutine ? 'Criar Rotina' : 'Editar Rotina'} onPress={this.state.createRoutine ? this.createRoutine : this.editRoutine} />
          </Form>
        </Content>
      </Container>
    )
  }
}

RoutineFormScreen.propTypes = {
  navigation: PropTypes.object.isRequired
}
