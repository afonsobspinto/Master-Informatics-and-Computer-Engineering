import React, { Component } from 'react'
import { StatusBar, Text, View } from 'react-native'
import { Container, Content, Form, Item, Input, Label, Button } from 'native-base'

import styles from '../styles/ParentStyles/RegisterScreen.style'

export default class RegisterScreen extends Component {
  render () {
    return (
      <Container style={styles.registerContainter}>
        <StatusBar hidden />
        <Content contentContainerStyle={styles.contentContainter}>
          <Text style={styles.registerTitle}>Registo de Conta</Text>
          <Form>
            <Item floatingLabel regular style={styles.inputContainer}>
              <Label style={styles.labelText}>Nome de Utilizador</Label>
              <Input style={styles.labelText} />
            </Item>

            <Item floatingLabel regular style={styles.inputContainer}>
              <Label style={styles.labelText}>E-mail</Label>
              <Input style={styles.labelText} />
            </Item>

            <Item floatingLabel regular style={styles.inputContainer}>
              <Label style={styles.labelText}>Password</Label>
              <Input style={styles.labelText} secureTextEntry />
            </Item>

            <Button rounded block primary style={styles.submitButton}>
              <Text style={styles.buttonText}>Concluir Registo</Text>
            </Button>
          </Form>

          <View style={styles.loginTextContainer}>
            <Text style={styles.loginText}>Já possui uma conta?</Text>
            <Text style={styles.loginText}>Faça login!</Text>
          </View>
        </Content>
      </Container>
    )
  }
}
