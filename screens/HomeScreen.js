import React from 'react'
import { Button, Text, View } from 'react-native'
import { VISUAL_SYTLE } from '../helpers/SettingTypes'
import { _storeSetting } from '../helpers/Settings'

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
            this.props.navigation.navigate('SingleActivity', { progressType: 'bar' })
          }}
        />
        <Text />
        <Button
          title='Go to Single Activity Clock Screen'
          onPress={() => {
            this.props.navigation.navigate('SingleActivity', { progressType: 'clock' })
          }}
        />
        <Text />
        <Button
          title='Go to Routine Screen Photo'
          onPress={() => {
            _storeSetting(VISUAL_SYTLE, 'photo').then(() => this.props.navigation.navigate('RoutineScreen'))
          }}
        /><Text />
        <Button
          title='Go to Routine Screen Cartoon'
          onPress={() => {
            _storeSetting(VISUAL_SYTLE, 'cartoon').then(() => {
              this.props.navigation.navigate('RoutineScreen')
            })
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
