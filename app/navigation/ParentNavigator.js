import { createStackNavigator } from 'react-navigation'

import ChooseActivityScreen from '../screens/ChooseActivityScreen'
import ChildMainMenuScreen from '../screens/ChildMainMenuScreen'
import ParentScreen from '../screens/ParentScreen'
import ParentMainMenuScreen from '../screens/ParentMainMenuScreen'

export default createStackNavigator({
  ParentMainMenuScreen,
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
