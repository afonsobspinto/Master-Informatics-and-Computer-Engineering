import React from 'react'
import { View, StyleSheet } from 'react-native'
import { List, Icon } from 'native-base'
import ActionButton from 'react-native-action-button'
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
        <ActionButton buttonColor='rgba(231,76,60,1)'>
          <ActionButton.Item buttonColor='#9b59b6' title='Nova Atividade' onPress={() => {}}>
            <Icon name='md-create' style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#1abc9c' title='Nova Rotina' onPress={() => console.log('criar nova rotina')}>
            <Icon name='md-done-all' style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white'
  }
})
