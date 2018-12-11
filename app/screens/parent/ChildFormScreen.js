import React, { Component } from 'react'
import { Body, Header, Icon, Left, Label, Title, Button, Form, Content, Container, Item, Input } from 'native-base'
import PropTypes from 'prop-types'

import { ImagePickerButtons } from '../../components/Parent/ImagePickerButtons'
import { BottomButton } from '../../components/Parent/BottomButton'
import EnvVars from '../../constants/EnviromentVars'

export default class ChildFormScreen extends Component {
  constructor (props) {
    super(props)

    this.state = {
      title: 'Adicionar Nova Criança',
      color: '#0074D9',
      childName: 'Nova Criança',
      childPhoto: null
    }
  }

  onPhotoChange = (uri) => {
    this.setState({ photo: { uri } })
  }

  onImageChange = (image) => {
    this.setState({ image: image })
  }

  handlePress () {
    if (this.state.childName) {
      fetch(EnvVars.apiUrl + 'routine_manager/add-child/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userEmail: 'A@a.com', // TODO: this.props.userEmail
          name: this.state.childName,
          gender: 'M', // TODO: this.props.gender Gender deve ser um F ou um M
          image: this.state.image
        })
      }).then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.status === '200') {
            console.log('Criança Adicionada')
            // TODO: Criança Adicionada
          } else {
            console.log('Criança Não Adicionada')
            // TODO: Criança Não Adicionada
          }
          return responseJson
        })
        .catch((error) => {
          console.error(error)
        })
    }
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
        </Header>
        <Content>
          <Form>
            <Item stackedLabel>
              <Label>Nome</Label>
              <Input value={this.state.childName} onChangeText={text => this.setState({ childName: text })} />
            </Item>
            <ImagePickerButtons color={this.state.color} onImageChange={this.onImageChange} onPhotoChange={this.onPhotoChange} photo={this.state.photo} image={this.state.image} />
            <BottomButton color={this.state.color} text={'Adicionar Criança'} onPress={() => this.handlePress()} />
          </Form>
        </Content>
      </Container>
    )
  }
}

ChildFormScreen.propTypes = {
  navigation: PropTypes.object.isRequired
}
