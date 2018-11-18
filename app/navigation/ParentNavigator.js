import { createStackNavigator } from 'react-navigation'

import HomeScreen from '../screens/HomeScreen'
import ChooseActivityScreen from '../screens/ChooseActivityScreen'
import ChildMainMenuScreen from '../screens/ChildMainMenuScreen'
import ParentScreen from '../screens/ParentScreen'

export default createStackNavigator({
  Home: HomeScreen,
  ChooseActivityScreen: ChooseActivityScreen,
  ParentScreen: ParentScreen,
  ChildMainMenu: ChildMainMenuScreen
},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false
  }
})
