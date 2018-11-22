import React from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'

import PropTypes from 'prop-types'

import styles from '../styles/ParentStyles/ChangeEmailScreen.style'

export default class ChangeEmailScreen extends React.Component {
  static navigationOptions = {
    headerMode: 'screen',
    navigationOptions: {
      headerTitle: 'Repor E-mail'
    }
  };
  render () {
    return (
      <View style={styles.generalLayout}>
        <View style={styles.container}>
          <Text>E-mail Atual</Text>
          <Text>{this.props.navigation.state.params.email}</Text>
        </View>
        <View style={styles.container}>
          <Text>Novo E-mail</Text>
          <TextInput
            keyboardType='email-address'
            placeholder='Insira o seu novo e-mail'
            style={styles.inputContainer}
          />
        </View>
        <View style={styles.container}>
          <Text>Password</Text>
          <Text>Insira a sua password para confirmar a alteração de e-mail.</Text>
          <TextInput
            secureTextEntry
            placeholder='Insira o seu novo e-mail'
            style={styles.inputContainer}
          />
        </View>
        <View >
          <TouchableOpacity style={styles.confirmBtn} onPress={() => { this.props.navigation.state.params.setEmail('hahahha') }}>
            <Text>Confirmar</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

ChangeEmailScreen.propTypes = {
  navigation: PropTypes.object.isRequired
}
