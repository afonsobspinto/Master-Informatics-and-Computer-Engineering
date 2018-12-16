import React, { Component } from 'react'
import { Container, Header, Left, Button, Icon, Body, Title, Right, Form, Item, Label, Input, Toast } from 'native-base'
import PropTypes from 'prop-types'
import { ImagePickerButtons } from '../../components/Parent/ImagePickerButtons'
import { BottomButton } from '../../components/Parent/BottomButton'

export default class RewardFormScreen extends Component {
  constructor (props) {
    super(props)
    this.state = { title: '', image: null, photo: null }
  }

  onImageChange = image => {
    this.setState({ image: image })
  }

  onPhotoChange = uri => {
    this.setState({ photo: uri })
  }

  showToast = message => (Toast.show({ text: message, buttonText: 'OK' }))

  checkInputs = () => {
    if (this.state.title === '') {
      this.showToast('O nome do prémio não deverá estar vazio!')
      return false
    }
    return true
  }

  uploadToDatabase = () => {
    if (!this.checkInputs()) return
    console.log('TODO: THIS SHOULD UPLOAD TO DATABASE')
    this.props.navigation.pop()
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
          <ImagePickerButtons color={'#0074D9'} onImageChange={this.onImageChange} onPhotoChange={this.onPhotoChange} photo={this.state.photo} image={this.state.image} />
          <BottomButton color={'#0074D9'} text={'Criar prémio'} onPress={() => this.uploadToDatabase()} />
        </Form>
      </Container>
    )
  }
}

RewardFormScreen.propTypes = {
  navigation: PropTypes.object.isRequired
}
