import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Container, Content, Form, Item, Input, Label, Button, Spinner } from 'native-base'
import { connect } from 'react-redux'
import { login } from '../actions/userActions'
import { oppositeColor } from '../styles/Colors'
import { _storeJson } from '../helpers/LocalStore'

import styles from '../styles/ParentStyles/RegisterScreen.style'
import PropTypes from 'prop-types'
import EnvVars from '../constants/EnviromentVars'

export class RegisterScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      emailError: true,
      emailErrorMessage: 'Este e-mail não é válido!',
      password: '',
      passwordError: true,
      passwordErrorMessage: 'A password deve conter 6 caracteres!',
      emailHadInteraction: false,
      passwordHadInteraction: false,
      loading: false
    }
  }

  handlePress (email, password) {
    if (!this.state.passwordError && !this.state.emailError) {
      this.setState({ loading: true })
      fetch(EnvVars.apiUrl + 'routine_manager/register/', {
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
            _storeJson('login', { email })
            this.props.login(this.state.email)
            this.props.navigation.replace('ChildFormScreen', { afterRegisterScreen: true })
          } else {
            this.setState(() => ({ emailErrorMessage: 'Este e-mail já está a ser utilizado!', loading: false, emailHadInteraction: false, passwordHadInteraction: false }))
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
    this.setState(() => ({ emailErrorMessage: 'Este e-mail não é válido!' }))
  }

  render () {
    if (this.state.loading) {
      return (
        <Container style={styles.registerContainter}>
          <Content contentContainerStyle={styles.contentContainter}>
            <Spinner color={oppositeColor} />
          </Content>
        </Container>
      )
    } else {
      return (
        <Container style={styles.registerContainter}>
          <Content contentContainerStyle={styles.contentContainter}>
            <Text style={styles.registerTitle}>Registo de Conta</Text>
            <Form>

              {this.state.emailError && this.state.emailHadInteraction && <Text style={styles.errorMessage}>{this.state.emailErrorMessage}</Text>}
              <Item floatingLabel error={this.state.emailError && this.state.emailHadInteraction} success={!this.state.emailError && this.state.emailHadInteraction} style={styles.inputContainer}>
                <Label style={styles.labelText}>E-mail</Label>
                <Input
                  className='email'
                  onChangeText={(text) => this.validate('email', text.trim())}
                  style={styles.labelText}
                />
              </Item>

              {this.state.passwordError && this.state.passwordHadInteraction && <Text style={styles.errorMessage}>{this.state.passwordErrorMessage}</Text>}
              <Item floatingLabel error={this.state.passwordError && this.state.passwordHadInteraction} success={!this.state.passwordError && this.state.passwordHadInteraction} style={styles.inputContainer}>
                <Label style={styles.labelText}>Password</Label>
                <Input
                  className='password'
                  onChangeText={(text) => this.validate('password', text.trim())}
                  style={styles.labelText}
                  secureTextEntry
                />
              </Item>

              <Button rounded block primary style={styles.submitButton} onPress={() => this.handlePress(this.state.email, this.state.password)}>
                <Text style={styles.buttonText}>Concluir Registo</Text>
              </Button>
            </Form>

            <View style={styles.loginTextContainer}>
              <Text style={styles.loginText}>Já possui uma conta?</Text>
              <Text style={styles.loginRegisterText} onPress={() => this.props.navigation.replace('LoginMenu')}>Faça login aqui!</Text>
            </View>
          </Content>
        </Container>
      )
    }
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
)(RegisterScreen)

RegisterScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired
}
