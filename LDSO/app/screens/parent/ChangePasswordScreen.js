import React from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'

import styles from '../../styles/ParentStyles/ChangePasswordScreen.style'

export default class ChangePasswordScreen extends React.Component {
  static navigationOptions = {
    headerMode: 'screen',
    navigationOptions: {
      title: 'Alterar Password'
    }
  };
  render () {
    return (
      <View>
        <View style={styles.generalLayout}>
          <View style={{ paddingTop: 10, paddingBottom: 20 }}>
            <Text>Insira a sua antiga password.</Text>
            <TextInput
              secureTextEntry
              placeholder='Password Antiga'
              style={styles.inputContainer}
            />
          </View>
          <View style={styles.container}>
            <Text>Insira a sua nova password.</Text>
            <TextInput
              secureTextEntry
              placeholder='Nova Password'
              style={styles.inputContainer}
            />
          </View>
          <View style={styles.container}>
            <Text>Repita a sua nova password.</Text>
            <TextInput
              secureTextEntry
              placeholder='Nova Password'
              style={styles.inputContainer}
            />
          </View>
          <View style={styles.confirmBtn}>
            <TouchableOpacity onPress={() => { console.log('changed password') }}>
              <Text>Alterar Password</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}
