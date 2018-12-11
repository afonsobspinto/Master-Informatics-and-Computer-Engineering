import React from 'react'
import { Notifications } from 'expo'
import { Text, View } from 'react-native'
import registerForPushNotificationsAsync from './Notification'

export default class AppContainer extends React.Component {
  state = { notification: {} };

  componentDidMount () {
    registerForPushNotificationsAsync()
    this._notificationSubscription = Notifications.addListener(this._handleNotification)
  }

  _handleNotification = notification => {
    this.setState({ notification: notification })
  }

  render () {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Origin: {this.state.notification.origin}</Text>
        <Text>Data: {JSON.stringify(this.state.notification.data)}</Text>
      </View>
    )
  }
}
