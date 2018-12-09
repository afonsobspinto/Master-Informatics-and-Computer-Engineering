import React, { Component } from 'react'
import { StatusBar, Text, View } from 'react-native'
import { Container, Content, Form, Item, Input, Label, Button } from 'native-base'

import styles from '../styles/ParentStyles/RegisterScreen.style'
import PropTypes from 'prop-types'

export default class LoginScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      emailError: true,
      password: '',
      passwordError: true,
      emailHadInteraction: false,
      passwordHadInteraction: false
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

            <Button rounded block primary style={styles.submitButton}>
              <Text style={styles.buttonText}>Login</Text>
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

LoginScreen.propTypes = {
  navigation: PropTypes.object.isRequired
}
