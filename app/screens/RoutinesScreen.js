import React from 'react'
import { View } from 'react-native'
import { List, Icon, Fab } from 'native-base'
import { RoutineItem } from '../components/Settings/RoutineItem'

export class RoutinesScreen extends React.Component {
  render () {
    return (
      <View style={{ flex: 1 }}>
        <List style={{ paddingBottom: 370 }}>
          <RoutineItem title='Após Acordar' image={require('../assets/images/activities/breakfast.png')} />
          <RoutineItem title='Depois do Almoço' image={require('../assets/images/activities/breakfast.png')} />
          <RoutineItem title='Antes de Dormir' image={require('../assets/images/activities/breakfast.png')} />
        </List>
        <Fab
          active
          direction='up'
          containerStyle={{ backgroundColor: 'transparent' }}
          style={{ backgroundColor: '#5067FF' }}
          position='bottomRight'>
          <Icon name='add' />
        </Fab>
      </View>
    )
  }
}
