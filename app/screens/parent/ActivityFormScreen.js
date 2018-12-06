import React, { Component } from 'react'
import { Body, Header, Icon, Left, Label, Title, Button, Form, Content, Container, Item, Input, Right } from 'native-base'
import PropTypes from 'prop-types'

import { ItemPicker } from '../../components/Parent/ItemPicker'
import { ColorPicker } from '../../components/Parent/ColorPicker'
import { DurationPickers } from '../../components/Parent/DurationPickers'
import { ImagePickerButtons } from '../../components/Parent/ImagePickerButtons'
import { BottomButton } from '../../components/Parent/BottomButton'
import { availableColors } from '../../styles/Colors'

const defaultState = {
  title: 'Atividade de testes',
  color: '#0074D9',
  time: {
    goal: '3',
    min: '1.5',
    max: '6'
  },
  photo: undefined,
  image: undefined,
  routine: 'Manhã',
  createActivity: true
}

export default class ActivityFormScreen extends Component {
  constructor (props) {
    super(props)

    const activity = this.props.navigation.getParam('activity')

    if (activity) {
      this.state = {
        ...activity,
        time: {
          goal: activity.time.goal.toString(),
          min: activity.time.min.toString(),
          max: activity.time.max.toString()
        }
      }
    } else this.state = defaultState

    this.routines = ['Manhã', 'Noite']

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

  onPhotoChange = (uri) => {
    this.setState({ photo: { uri } })
  }

  onImageChange = (image) => {
    this.setState({ image: image })
  }

  onRoutineChange = (index) => {
    this.setState({ routine: this.routines[index] })
  }

  removeActivity = () => {
    console.log('Remove Activity')
  }

  createActivity = () => {
    console.log('Create Activity')
  }

  editActivity = () => {
    console.log('Edit Activity')
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
          {!this.state.createActivity && <Right>
            <Button transparent onPress={this.removeActivity}>
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
              <Label>Rotina</Label>
              <ItemPicker items={this.routines} selected={this.state.routine} onValueChange={this.onRoutineChange} />
            </Item>
            <Item stackedLabel>
              <Label>Cor</Label>
              <ColorPicker color={this.state.color} colors={availableColors} onColorChange={this.onColorChange} />
            </Item>
            <DurationPickers color={this.state.color} time={this.state.time} onDurationChange={this.onDurationChange} />
            <ImagePickerButtons color={this.state.color} onImageChange={this.onImageChange} onPhotoChange={this.onPhotoChange} photo={this.state.photo} image={this.state.image} />
            <BottomButton color={this.state.color} text={this.state.createActivity ? 'Criar Actividade' : 'Editar Actividade'} onPress={this.state.createActivity ? this.createActivity : this.editActivity} />
          </Form>
        </Content>
      </Container>
    )
  }
}

ActivityFormScreen.propTypes = {
  navigation: PropTypes.object.isRequired
}
