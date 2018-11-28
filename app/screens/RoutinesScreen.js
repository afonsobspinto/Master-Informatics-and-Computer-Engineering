import React from 'react'
import { List } from 'native-base'
import { ScrollView, View } from 'react-native'
import { RoutineItem } from '../components/Slides/RoutineItem'

export class RoutinesScreen extends React.Component {
  render () {
    return (
      <View style={{ flex: 1 }} >
        <ScrollView>
          <List>
            <RoutineItem title='Após Acordar' image={require('../assets/images/activities/breakfast.png')} />
            <RoutineItem title='Depois do Almoço' image={require('../assets/images/activities/breakfast.png')} />
            <RoutineItem title='Antes de Dormir' image={require('../assets/images/activities/breakfast.png')} />
          </List>
        </ScrollView>
      </View>
    )
  }
}
