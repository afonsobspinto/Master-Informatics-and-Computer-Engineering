import { createStackNavigator } from 'react-navigation'
import MainMenuScreen from '../screens/MainMenuScreen'
import ChildNavigator from './ChildNavigator'
import ParentNavigator from './ParentNavigator'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import AppIntroScreen from '../screens/parent/AppIntroScreen'

export default createStackNavigator({
  LoginMenu: LoginScreen,
  RegisterMenu: RegisterScreen,
  MainMenu: MainMenuScreen,
  ChildMainMenu: ChildNavigator,
  ParentMainMenu: ParentNavigator,
  AppIntro: AppIntroScreen
},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false
  }
})
