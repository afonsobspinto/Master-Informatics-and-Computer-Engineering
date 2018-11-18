import { createStackNavigator } from 'react-navigation'

import ActivityScreen from '../screens/ActivityScreen'
import ChooseRoutineScreen from '../screens/ChooseRoutineScreen'
import ChooseActivityScreen from '../screens/ChooseActivityScreen'
import ChildMainMenuScreen from '../screens/ChildMainMenuScreen'
import ShopScreen from '../screens/ShopScreen'

export default createStackNavigator({
  ChildMainMenu: ChildMainMenuScreen,
  Activity: ActivityScreen,
  ChooseRoutineScreen: ChooseRoutineScreen,
  ChooseActivityScreen: ChooseActivityScreen,
  ShopScreen: ShopScreen
},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false
  }
})
