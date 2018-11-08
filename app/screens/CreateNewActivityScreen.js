import React, { Component } from 'react'
import { View, Text } from 'react-native'

export default class CreateNewActivityScreen extends Component {
  static navigationOptions = {
    header: null
  };
  render () {
    return (
      <View>
        <Text>Crie uma nova atividade</Text>
      </View>
    )
  }
}
