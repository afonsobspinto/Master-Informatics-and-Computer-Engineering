import { createStackNavigator } from 'react-navigation'

import MyAccountScreen from '../screens/ParentHomeScreen'
import ChangeEmailScreen from '../screens/ChangeEmailScreen'
import ChangePasswordScreen from '../screens/ChangePasswordScreen'

const SettingsNavigator = createStackNavigator({
  Home: { screen: MyAccountScreen },
  ChangePasswordScreen,
  ChangeEmailScreen
},
{
  initialRouteName: 'Home'
})

export default SettingsNavigator
