import React, { Component } from 'react'
import { View, Text, Alert } from 'react-native'
import { Container, Content, Form, Item, Input, Label, Button, Icon, Spinner } from 'native-base'
import styles from '../../styles/ParentStyles/RegisterScreen.style'
import PropTypes from 'prop-types'
import { oppositeColor } from '../../styles/Colors'

export default class PasswordPromptScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      storedPW: 'asdf',
      inputPW: '',
      passwordError: null,
      passwordHadInteraction: false,
      PWIsSecure: true,
      loading: false
    }
  }

  verifyPassword = () => {
    if (this.state.storedPW === this.state.inputPW) this.props.navigation.replace('ParentMainMenuScreen')
    else {
      Alert.alert('Palavra-passe incorreta!', 'Tente novamente...', [
        { text: 'Esqueci-me', onPress: () => console.log('Esqueceu-se lol burro') },
        { text: 'OK', style: 'cancel' }
      ],
      { cancelable: false })
    }
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
            <Text style={styles.registerTitle}>Bloqueio parental</Text>
            <Text style={styles.loginText}>Introduza a sua palavra-passe abaixo para aceder à zona de pai.</Text>
            <Form>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Item floatingLabel error={this.state.passwordError} success={!this.state.passwordError && this.state.passwordHadInteraction} style={styles.inputContainer}>
                  <Label style={styles.labelText}>Palavra-passe</Label>
                  <Input className='password' onChangeText={inputPW => this.setState({ inputPW })} style={styles.labelText} secureTextEntry={this.state.PWIsSecure} />
                </Item>
                <Button style={{ position: 'absolute', right: -10, bottom: -5 }} transparent onPress={() => this.setState({ PWIsSecure: !this.state.PWIsSecure })}>
                  <Icon name='eye' style={{ color: 'white' }} />
                </Button>
              </View>
              <Button rounded block primary style={styles.submitButton} onPress={() => this.verifyPassword()}>
                <Text style={styles.buttonText}>Entrar</Text>
              </Button>
            </Form>
          </Content>
        </Container>
      )
    }
  }
}

PasswordPromptScreen.propTypes = {
  navigation: PropTypes.object.isRequired
}
