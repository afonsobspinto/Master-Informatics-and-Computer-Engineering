import { Permissions, Notifications } from 'expo'
const PUSH_ENDPOINT = 'https://your-server.com/users/push-token'

export async function registerForPushNotificationsAsync () {
  const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS)
  let finalStatus = existingStatus

  if (existingStatus !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
    finalStatus = status
  }

  if (finalStatus !== 'granted') {
    return
  }

  let token = await Notifications.getExpoPushTokenAsync()

  let requestInit = {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: { value: token }, user: { username: 'Brent' } })
  }

  return fetch(PUSH_ENDPOINT, requestInit)
}
