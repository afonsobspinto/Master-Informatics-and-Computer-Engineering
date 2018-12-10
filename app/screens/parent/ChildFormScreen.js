import React, { Component } from 'react'
import { Body, Header, Icon, Left, Label, Title, Button, Form, Content, Container, Item, Input } from 'native-base'
import PropTypes from 'prop-types'

import { ImagePickerButtons } from '../../components/Parent/ImagePickerButtons'
import { BottomButton } from '../../components/Parent/BottomButton'

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

  createChild = () => {
    console.log('Create Child')
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
            <BottomButton color={this.state.color} text={'Adicionar Criança'} onPress={this.createChild} />
          </Form>
        </Content>
      </Container>
    )
  }
}

ChildFormScreen.propTypes = {
  navigation: PropTypes.object.isRequired
}
