import React, { Component } from 'react'
import { Body, Header, Icon, Left, Right, Label, Title, Button, Form, Content, Container, Item, Input } from 'native-base'
import { BackHandler } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { PhotoPickerButton } from '../../components/Parent/PhotoPickerButton'
import { BottomButton } from '../../components/Parent/BottomButton'
import EnvVars from '../../constants/EnviromentVars'

export class ChildFormScreen extends Component {
  constructor (props) {
    super(props)

    this.state = {
      title: 'Adicionar Criança',
      color: '#0074D9',
      name: '',
      photo: undefined,
      afterRegister: this.props.navigation.getParam('afterRegisterScreen', false)
    }
    this.handlePress = this.handlePress.bind(this)
  }

  removeBackButton () {
    return true // To be called by andrdid back button
  }

  componentDidMount () {
    if (this.state.afterRegister) BackHandler.addEventListener('hardwareBackPress', this.removeBackButton)
  }

  componentWillUnmount () {
    if (this.state.afterRegister) BackHandler.removeEventListener('hardwareBackPress', this.removeBackButton)
  }

  onPhotoChange = (uri) => {
    this.setState({ photo: { uri } })
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
          gender: 'M', // TODO: this.props.gender Gender deve ser um F ou um M
          image: 'image' // TODO: nome da imagem
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

  render () {
    console.log(this.state.name)
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
            <PhotoPickerButton color={this.state.color} onPhotoChange={this.onPhotoChange} photo={this.state.photo} />
            <BottomButton color={this.state.color} text={'Adicionar Criança'} onPress={this.handlePress} />
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
