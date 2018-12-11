import { createStackNavigator } from 'react-navigation'
import MainMenuScreen from '../screens/MainMenuScreen'
import ChildNavigator from './ChildNavigator'
import ParentNavigator from './ParentNavigator'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import AppIntroScreen from '../screens/parent/AppIntroScreen'
import ChildFormScreen from '../screens/parent/ChildFormScreen'

export default createStackNavigator({
  MainMenu: MainMenuScreen,
  LoginMenu: LoginScreen,
  RegisterMenu: RegisterScreen,
  ChildMainMenu: ChildNavigator,
  ParentMainMenu: ParentNavigator,
  AppIntro: AppIntroScreen,
  ChildFormScreen
},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false
  }
})
