import React, { Component } from 'react'
import { Body, Header, Icon, Left, Right, Label, Title, Button, Form, Content, Container, Item, Input, Toast } from 'native-base'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { PhotoPickerButton } from '../../components/Parent/PhotoPickerButton'
import { BottomButton } from '../../components/Parent/BottomButton'
import EnvVars from '../../constants/EnviromentVars'
import { ItemPicker } from '../../components/Parent/ItemPicker'

const genders = ['Masculino', 'Feminino']

export class ChildFormScreen extends Component {
  constructor (props) {
    super(props)

    this.state = {
      title: 'Adicionar Criança',
      color: '#0074D9',
      name: '',
      photo: undefined,
      gender: 'M',
      fileType: undefined,
      imageHash: Math.random().toString(36).substr(2, 10),
      afterRegister: this.props.navigation.getParam('afterRegisterScreen', false)
    }
    this.handleServerRequests = this.handleServerRequests.bind(this)
  }

  onPhotoChange = uri => {
    this.setState({ photo: { uri }, fileType: uri.split('.')[uri.split('.').length - 1] })
  }

  onGenderChange = index => {
    this.setState({ gender: genders[index].charAt(0) })
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

  handlePress () {
    if (this.state.name) {
      fetch(EnvVars.apiUrl + 'routine_manager/add-child/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userEmail: this.props.loggedUserEmail,
          name: this.state.name,
          gender: this.state.gender,
          image: `${this.state.imageHash}.${this.state.fileType}`
        })
      }).then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.status === '200') {
            console.log('Criança Adicionada')
            if (this.state.afterRegister) this.props.navigation.replace('MainMenu')
            else this.props.navigation.popToTop()
          } else {
            console.log('Criança Não Adicionada')
          }
          return responseJson
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }

  showToast = message => (Toast.show({ text: message, buttonText: 'OK' }))

  checkInputs = () => {
    if (this.state.name === '') {
      this.showToast('O nome da criança não deverá estar vazio!')
      return false
    } else if (this.state.photo === undefined) {
      this.showToast('A criança deverá ter uma imagem associada!')
      return false
    }
    return true
  }

  handleServerRequests () {
    if (!this.checkInputs()) return
    this.handlePress()
    this.uploadImageAsync(this.state.photo.uri)
      .then(this.handlePress())
  }

  render () {
    return (
      <Container>
        <Header style={{ backgroundColor: this.state.color }} androidStatusBarColor={this.state.color}>
          <Left>
            {!this.state.afterRegister && <Button transparent onPress={() => this.props.navigation.pop()}>
              <Icon name='arrow-back' />
            </Button>}
          </Left>
          <Body>
            <Title>{this.state.title}</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Form>
            <Item stackedLabel>
              <Label>Nome</Label>
              <Input value={this.state.name} onChangeText={text => this.setState({ name: text })} />
            </Item>
            <Item stackedLabel>
              <Label>Género</Label>
              <ItemPicker items={genders} selected={genders.find(gender => gender.charAt(0) === this.state.gender)} onValueChange={this.onGenderChange} />
            </Item>
            <PhotoPickerButton color={this.state.color} onPhotoChange={this.onPhotoChange} photo={this.state.photo} />
            <BottomButton color={this.state.color} text={'Adicionar Criança'} onPress={this.handleServerRequests} />
          </Form>
        </Content>
      </Container>
    )
  }
}

export default connect(
  /* istanbul ignore next */
  state => ({
    loggedUserEmail: state.user.email
  })
)(ChildFormScreen)

ChildFormScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  loggedUserEmail: PropTypes.string.isRequired
}
