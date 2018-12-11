import React, { Component } from 'react'
import { Body, Header, Icon, Left, Label, Title, Button, Form, Content, Container, Item, Input } from 'native-base'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { ImagePickerButtons } from '../../components/Parent/ImagePickerButtons'
import { BottomButton } from '../../components/Parent/BottomButton'

export class ChildFormScreen extends Component {
  constructor (props) {
    super(props)

    this.state = {
      title: 'Adicionar Nova Criança',
      color: '#0074D9',
      childName: 'Nova Criança',
      childPhoto: null
    }

    this.createChild = this.createChild.bind(this)
  }

  onPhotoChange = (uri) => {
    this.setState({ photo: { uri } })
  }

  onImageChange = (image) => {
    this.setState({ image: image })
  }

  createChild = () => {
    console.log('Create Child with email ' + this.props.loggedUserEmail)
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

export default connect(
  /* istanbul ignore next */
  state => ({
    loggedUserEmail: state.user.email
  }),
  /* istanbul ignore next */
  dispatch => ({

  })
)(ChildFormScreen)

ChildFormScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  loggedUserEmail: PropTypes.string.isRequired
}
