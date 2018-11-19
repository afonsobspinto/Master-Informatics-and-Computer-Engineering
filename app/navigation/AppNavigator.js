import { createStackNavigator } from 'react-navigation'
import MainMenuScreen from '../screens/MainMenuScreen'
import ChildNavigator from './ChildNavigator'
import ParentNavigator from './ParentNavigator'

export default createStackNavigator({
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
