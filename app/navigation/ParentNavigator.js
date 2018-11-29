import { createStackNavigator } from 'react-navigation'

import ChooseActivityScreen from '../screens/ChooseActivityScreen'
import ChildMainMenuScreen from '../screens/ChildMainMenuScreen'
import ParentScreen from '../screens/ParentScreen'

export default createStackNavigator({
  ParentScreen: ParentScreen,
  ChooseActivityScreen: ChooseActivityScreen,
  ChildMainMenu: ChildMainMenuScreen
},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false
  }
})
