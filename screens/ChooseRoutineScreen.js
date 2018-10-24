import React from 'react'
import { StatusBar, View, StyleSheet } from 'react-native'
import { ScreenOrientation } from 'expo'

import RoutineButton from '../components/RoutineButton'

export default class ChooseRoutineScreen extends React.Component {
  static navigationOptions = {
    title: 'Rotinas',
    header: null
  };

  componentDidMount () {
    ScreenOrientation.allow(ScreenOrientation.Orientation.LANDSCAPE)
  }
  componentWillUnmount () {
    ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT)
  }

  render () {
    return (
      <View style={styles.view}>
        <StatusBar hidden />
        <RoutineButton type='Day' />
        <RoutineButton type='Night' />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#000000'
  }
})
