import { createStackNavigator } from 'react-navigation'

import HomeScreen from '../screens/HomeScreen'
import ChooseActivityScreen from '../screens/ChooseActivityScreen'
import ChildMainMenuScreen from '../screens/ChildMainMenuScreen'
import ParentScreen from '../screens/ParentScreen'
import RegisterScreen from '../screens/RegisterScreen'

export default createStackNavigator({
  Home: HomeScreen,
  ChooseActivityScreen: ChooseActivityScreen,
  ParentScreen: ParentScreen,
  ChildMainMenu: ChildMainMenuScreen,
  RegisterScreen: RegisterScreen
},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false
  }
})
