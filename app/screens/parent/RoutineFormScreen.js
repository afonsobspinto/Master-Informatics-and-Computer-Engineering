import React, { Component } from 'react'
import { Body, Header, Icon, Left, Label, Title, Button, Form, Content, Container, Item, Input, Right } from 'native-base'
import PropTypes from 'prop-types'

import { ColorPicker } from '../../components/Parent/ColorPicker'
import { ImagePickerButtons } from '../../components/Parent/ImagePickerButtons'
import { BottomButton } from '../../components/Parent/BottomButton'
import { availableColors } from '../../styles/Colors'
import { SortableList } from '../../components/Parent/SortableList'

const defaultState = {
  title: 'Nome da rotina',
  color: '#0074D9',
  createRoutine: true
}

export default class RoutineFormScreen extends Component {
  constructor (props) {
    super(props)

    const routine = this.props.navigation.getParam('routine')

    this.state = routine ? { ...routine } : defaultState

    this.onColorChange = this.onColorChange.bind(this)
    this.onImageChange = this.onImageChange.bind(this)
    this.onPhotoChange = this.onPhotoChange.bind(this)
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

  removeRoutine = () => {
    console.log('Remove Routine')
  }

  createRoutine = () => {
    console.log('Create Routine')
  }

  editRoutine = () => {
    console.log('Edit Routine')
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
          {!this.state.createRoutine && <Right>
            <Button transparent onPress={this.removeRoutine}>
              <Icon name='md-trash' />
            </Button>
          </Right>}
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
            <ImagePickerButtons color={this.state.color} onImageChange={this.onImageChange} onPhotoChange={this.onPhotoChange} photo={this.state.photo} image={this.state.image} />
            {this.state.activities && <Item stackedLabel style={{ borderColor: 'transparent' }}>
              <Label>Actividades</Label>
              <SortableList items={this.state.activities} color={this.state.color} onItemPress={this.onActivityPress} />
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
