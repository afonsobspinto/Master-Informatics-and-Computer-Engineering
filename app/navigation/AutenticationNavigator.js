import { createStackNavigator } from 'react-navigation'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import AppNavigator from './AppNavigator'
import ChildFormScreen from '../screens/parent/ChildFormScreen'

export default createStackNavigator({
  MainMenu: AppNavigator,
  LoginMenu: LoginScreen,
  RegisterMenu: RegisterScreen,
  ChildFormScreen
},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false
  }
})
