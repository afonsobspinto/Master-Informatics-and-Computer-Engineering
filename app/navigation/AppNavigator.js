import { createStackNavigator } from 'react-navigation'
import MainMenuScreen from '../screens/MainMenuScreen'
import ChildNavigator from './ChildNavigator'
import ParentNavigator from './ParentNavigator'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'

export default createStackNavigator({
  LoginMenu: LoginScreen,
  RegisterMenu: RegisterScreen,
  MainMenu: MainMenuScreen,
  ChildMainMenu: ChildNavigator,
  ParentMainMenu: ParentNavigator
},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false
  }
})
