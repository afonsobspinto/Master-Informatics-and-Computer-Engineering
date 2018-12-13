import { createStackNavigator } from 'react-navigation'
import MainMenuScreen from '../screens/MainMenuScreen'
import ChildNavigator from './ChildNavigator'
import ParentNavigator from './ParentNavigator'
import AppIntroScreen from '../screens/AppIntroScreen'

export default createStackNavigator({
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
