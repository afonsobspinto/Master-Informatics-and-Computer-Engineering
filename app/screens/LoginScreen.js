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
      emailError: null,
      password: '',
      passwordError: null,
      emailHadInteraction: false,
      passwordHadInteraction: false
    }
  }

  render () {
    return (
      <Container style={styles.registerContainter}>
        <StatusBar hidden />
        <Content contentContainerStyle={styles.contentContainter}>
          <Text style={styles.registerTitle}>Início de sessão</Text>
          <Form>
            <Item floatingLabel error={this.state.emailError} success={!this.state.emailError && this.state.emailHadInteraction} style={styles.inputContainer}>
              <Label style={styles.labelText}>E-mail</Label>
              <Input
                className='email'
                style={styles.labelText}
              />
            </Item>

            <Item floatingLabel error={this.state.passwordError} success={!this.state.passwordError && this.state.passwordHadInteraction} style={styles.inputContainer}>
              <Label style={styles.labelText}>Password</Label>
              <Input
                className='password'
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
