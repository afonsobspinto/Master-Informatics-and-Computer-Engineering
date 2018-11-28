import React from 'react'
import { List } from 'native-base'
import { RoutineItem } from '../components/Settings/RoutineItem'

export class RoutinesScreen extends React.Component {
  render () {
    return (
      <List>
        <RoutineItem title='Após Acordar' image={require('../assets/images/activities/breakfast.png')} />
        <RoutineItem title='Depois do Almoço' image={require('../assets/images/activities/breakfast.png')} />
        <RoutineItem title='Antes de Dormir' image={require('../assets/images/activities/breakfast.png')} />
      </List>
    )
  }
}
