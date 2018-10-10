import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default class RoutineButton extends React.Component {
  render () {
    return <View style={styles.view}>
      <Text style={styles.button}>
        {this.props.name}
      </Text>
    </View>
  }
}

const styles = StyleSheet.create({
  button: {
    fontSize: 50,
    color: '#000000',
    textAlign: 'center'
  },
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0000ff'
  }
})
