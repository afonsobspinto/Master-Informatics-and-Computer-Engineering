import React from 'react'
import { Button, Text, View } from 'react-native'
import PropTypes from 'prop-types'

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
            this.props.navigation.navigate('Activity',
              { activity: {
                title: 'Fazer a cama',
                duration: 10,
                image: 'bed',
                color: '#7d84b2'
              },
              progressType: 'bar' })
          }}
        />
        <Text />
        <Button
          title='Go to Single Activity Clock Screen'
          onPress={() => {
            this.props.navigation.navigate('Activity',
              { activity: {
                title: 'Fazer a cama',
                duration: 10,
                image: 'bed',
                color: '#7d84b2'
              },
              progressType: 'clock' })
          }}
        />
        <Text />
        <Button
          title='Go to Routine Screen'
          onPress={() => {
            this.props.navigation.navigate('ChooseRoutineScreen')
          }}
        />
      </View>
    )
  }
}

HomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired
}
