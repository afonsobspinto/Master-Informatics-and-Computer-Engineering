import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Container, Content, Form, Item, Input, Label, Button, Icon, Spinner } from 'native-base'
import styles from '../../styles/ParentStyles/RegisterScreen.style'
import PropTypes from 'prop-types'
import { oppositeColor } from '../../styles/Colors'
import { connect } from 'react-redux'
import EnvVars from '../../constants/EnviromentVars'

export class PasswordPromptScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      inputPW: '',
      passwordError: null,
      passwordHadInteraction: false,
      PWIsSecure: true,
      loading: false
    }
  }

  handlePress = () => {
    this.setState({ loading: true })
    fetch(EnvVars.apiUrl + 'routine_manager/login/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.props.loggedUserEmail,
        password: this.state.inputPW
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === '200') {
          this.props.navigation.replace('ParentMainMenuScreen')
        } else {
          this.setState(() => ({ passwordError: true, loading: false, passwordHadInteraction: true }))
        }
        return responseJson
      })
      .catch((error) => {
        console.error(error)
      })
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
              <Button rounded block primary style={styles.submitButton} onPress={this.handlePress}>
                <Text style={styles.buttonText}>Entrar</Text>
              </Button>
            </Form>
          </Content>
        </Container>
      )
    }
  }
}

export default connect(
  /* istanbul ignore next */
  state => ({
    loggedUserEmail: state.user.email
  })
)(PasswordPromptScreen)

PasswordPromptScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  loggedUserEmail: PropTypes.string.isRequired
}
