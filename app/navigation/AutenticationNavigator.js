import { createStackNavigator } from 'react-navigation'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import AppNavigator from './AppNavigator'
import ChildFormScreen from '../screens/parent/ChildFormScreen'

export default createStackNavigator({
  LoginMenu: LoginScreen,
  RegisterMenu: RegisterScreen,
  MainMenu: AppNavigator,
  ChildFormScreen
},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false
  }
})
