import React, { Component } from 'react'
import { Container, Header, Left, Button, Icon, Body, Title, Right, Form, Item, Label, Input } from 'native-base'
import PropTypes from 'prop-types'
import { PhotoPickerButton } from '../../components/Parent/PhotoPickerButton'
import { BottomButton } from '../../components/Parent/BottomButton'
import EnvVars from '../../constants/EnviromentVars'

export default class RewardFormScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: 'Nova recompensa',
      photo: undefined
    }

    this.state.childID = this.props.navigation.getParam('childID')
    this.state.imageHash = Math.random().toString(36).substr(2, 10)
    this.state.fileType = undefined
  }

  async uploadImageAsync (uri) {
    let apiUrl = EnvVars.apiUrl + 'routine_manager/assets/images/'
    let formData = new FormData()
    console.log(this.state.fileType)
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

  handleServerRequests = () => {
    if (!this.state.photo) { return }
    this.uploadImageAsync(this.state.photo.uri)
      .then(this.createReward())
  }

  createReward = () => {
    fetch(EnvVars.apiUrl + 'routine_manager/add-reward/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        childID: this.state.childID,
        name: this.state.title,
        photo: `${this.state.imageHash}.${this.state.fileType}`
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

  onPhotoChange = uri => {
    this.setState({ photo: { uri }, fileType: uri.split('.')[uri.split('.').length - 1] })
  }

  render () {
    return (
      <Container>
        <Header style={{ backgroundColor: '#0074D9' }} androidStatusBarColor={'#0074D9'}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.pop()}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Criar prémio</Title>
          </Body>
          <Right />
        </Header>
        <Form>
          <Item stackedLabel>
            <Label>Nome do prémio</Label>
            <Input onChangeText={text => this.setState({ title: text })} />
          </Item>
          <PhotoPickerButton color={'#0074D9'} onPhotoChange={this.onPhotoChange} photo={this.state.photo} />
          <BottomButton color={'#0074D9'} text={'Criar prémio'} onPress={this.handleServerRequests} />
        </Form>
      </Container>
    )
  }
}

RewardFormScreen.propTypes = {
  navigation: PropTypes.object.isRequired
}
