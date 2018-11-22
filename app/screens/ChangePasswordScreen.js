import React from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'

import styles from '../styles/ParentStyles/ChangePasswordScreen.style'

export default class ChangePasswordScreen extends React.Component {
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
          <Text>Insira a sua antiga password.</Text>
          <TextInput
            secureTextEntry
            placeholder='Insira o seu novo e-mail'
            style={styles.inputContainer}
          />
        </View>
        <View style={styles.container}>
          <Text>Insira a sua nova password.</Text>
          <TextInput
            secureTextEntry
            placeholder='Insira o seu novo e-mail'
            style={styles.inputContainer}
          />
        </View>
        <View style={styles.container}>
          <Text>Repita a sua nova password.</Text>
          <TextInput
            secureTextEntry
            placeholder='Insira o seu novo e-mail'
            style={styles.inputContainer}
          />
        </View>
        <View>
          <TouchableOpacity onPress={() => { console.log('changed password') }}>
            <Text>Alterar Password</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
