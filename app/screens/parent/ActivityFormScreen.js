import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Body, Header, Icon, Left, Label, Title, Button, Form, Content, Container, Item, Input, Right } from 'native-base'
import PropTypes from 'prop-types'

import { addCustomActivity } from '../../actions/gameActions'
import { ItemPicker } from '../../components/Parent/ItemPicker'
import { ColorPicker } from '../../components/Parent/ColorPicker'
import { DurationPickers } from '../../components/Parent/DurationPickers'
import { ImagePickerButtons } from '../../components/Parent/ImagePickerButtons'
import { BottomButton } from '../../components/Parent/BottomButton'
import { availableColors } from '../../styles/Colors'

class ActivityFormScreen extends Component {
  constructor (props) {
    super(props)

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
      routine: 'Manhã'
    }

    this.items = ['Manhã', 'Noite']

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
    this.setState({ routine: this.items[index] })
  }

  buildNewCustomActivity = () => {
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
          <Right />
        </Header>
        <Content>
          <Form>
            <Item stackedLabel>
              <Label>Nome</Label>
              <Input value={this.state.title} onChangeText={text => this.setState({ title: text })} />
            </Item>
            <Item stackedLabel>
              <Label>Rotina</Label>
              <ItemPicker items={this.items} selected={this.state.routine} onValueChange={this.onRoutineChange} />
            </Item>
            <Item stackedLabel>
              <Label>Cor</Label>
              <ColorPicker color={this.state.color} colors={availableColors} onColorChange={this.onColorChange} />
            </Item>
            <DurationPickers color={this.state.color} time={this.state.time} onDurationChange={this.onDurationChange} />
            <ImagePickerButtons color={this.state.color} onImageChange={this.onImageChange} onPhotoChange={this.onPhotoChange} photo={this.state.photo} image={this.state.image} />
            <BottomButton color={this.state.color} text='Criar Actividade' onPress={() => console.log('without a promise')} />
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
)(ActivityFormScreen)

ActivityFormScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  addCustomActivity: PropTypes.func.isRequired
}
