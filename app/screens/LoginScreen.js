import React, { Component } from 'react'
import { StatusBar, Text, View } from 'react-native'
import { Container, Content, Form, Item, Input, Label, Button } from 'native-base'
import { connect } from 'react-redux'
import { login } from '../actions/userActions'

import styles from '../styles/ParentStyles/RegisterScreen.style'
import PropTypes from 'prop-types'
import EnvVars from '../constants/EnviromentVars'

export class LoginScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      emailError: true,
      password: '',
      passwordError: true,
      emailHadInteraction: false,
      passwordHadInteraction: false,
      loginFailed: false,
      errorMessage: 'As suas credenciais estão erradas!'
    }
  }

  handlePress (email, password) {
    if (!this.state.passwordError && !this.state.emailError) {
      fetch(EnvVars.apiUrl + 'routine_manager/login/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      }).then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.status === '200') {
            this.props.login(this.state.email)
            this.props.navigation.navigate('MainMenu')
          } else {
            this.setState(() => ({ loginFailed: true }))
          }
          return responseJson
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }

  validate (type, value) {
    if (type === 'email') {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (re.test(value)) {
        this.setState(() => ({ emailError: false }))
      } else {
        this.setState(() => ({ emailError: true, email: value }))
      }
      this.setState(() => ({ emailHadInteraction: true, email: value }))
    } else if (type === 'password') {
      if (String(value).length < 6) {
        this.setState(() => ({ passwordError: true }))
      } else {
        this.setState(() => ({ passwordError: false }))
      }
      this.setState(() => ({ passwordHadInteraction: true, password: value }))
    }
    this.setState(() => ({ loginFailed: false }))
  }

  render () {
    return (
      <Container style={styles.registerContainter}>
        <StatusBar hidden />
        <Content contentContainerStyle={styles.contentContainter}>
          <Text style={styles.registerTitle}>Início de sessão</Text>
          <Form>
            <Item floatingLabel error={this.state.emailError && this.state.emailHadInteraction} success={!this.state.emailError && this.state.emailHadInteraction} style={styles.inputContainer}>
              <Label style={styles.labelText}>E-mail</Label>
              <Input
                className='email'
                onChangeText={(text) => this.validate('email', text.trim())}
                style={styles.labelText}
              />
            </Item>

            <Item floatingLabel error={this.state.passwordError && this.state.passwordHadInteraction} success={!this.state.passwordError && this.state.passwordHadInteraction} style={styles.inputContainer}>
              <Label style={styles.labelText}>Password</Label>
              <Input
                className='password'
                onChangeText={(text) => this.validate('password', text.trim())}
                style={styles.labelText}
                secureTextEntry
              />
            </Item>

            {this.state.loginFailed && <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>}
            <Button rounded block primary style={styles.submitButton}>
              <Text style={styles.buttonText} onPress={() => this.handlePress(this.state.email, this.state.password)}>Login</Text>
            </Button>
          </Form>

          <View style={styles.loginTextContainer}>
            <Text style={styles.loginText}>Não possui uma conta?</Text>
            <Text style={styles.loginRegisterText} onPress={() => this.props.navigation.navigate('RegisterMenu')} >Registe-se aqui</Text>
          </View>
        </Content>
      </Container>
    )
  }
}

export default connect(
  /* istanbul ignore next */
  state => ({

  }),
  /* istanbul ignore next */
  dispatch => ({
    login: (email) => dispatch(login(email))
  })
)(LoginScreen)

LoginScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired
}
