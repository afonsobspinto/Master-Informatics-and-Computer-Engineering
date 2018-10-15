import React from 'react'
import { Button, Text, View } from 'react-native'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  }

  render () {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title='Go to Single Activity Screen'
          onPress={() => {
            this.props.navigation.navigate('SingleActivity')
          }}
        />
        <Text />
        <Button
          title='Go to Single Activity Clock Screen'
          onPress={() => {
            this.props.navigation.navigate('SingleActivityClock')
          }}
        />
        <Text />
        <Button
          title='Go to Routine Screen'
          onPress={() => {
            this.props.navigation.navigate('RoutineScreen')
          }}
        />
        <Text />
        <Button
          title='Go to Carousel Routine Screen'
          onPress={() => {
            this.props.navigation.navigate('CarouselRoutineScreen')
          }}
        />
      </View>
    )
  }
}
