import React from 'react'
import { Image } from 'react-native'
import { createStackNavigator } from 'react-navigation'

import MyAccountScreen from '../screens/ParentHomeScreen'
import ChangeEmailScreen from '../screens/ChangeEmailScreen'
import ChangePasswordScreen from '../screens/ChangePasswordScreen'

export default createStackNavigator({
  Home: MyAccountScreen,
  ChangePassword: ChangePasswordScreen,
  ChangeEmail: ChangeEmailScreen
},
{
  initialRouteName: 'Home'
},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
    drawerIcon: (
      <Image source={require('../assets/images/home-icon.png')} style={{ height: 24, width: 24 }} />
    )
  }
})
