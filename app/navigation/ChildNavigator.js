import { createStackNavigator } from 'react-navigation'

import ActivityScreen from '../screens/child/ActivityScreen'
import ChooseRoutineScreen from '../screens/child/ChooseRoutineScreen'
import ChooseActivityScreen from '../screens/child/ChooseActivityScreen'
import ChildMainMenuScreen from '../screens/child/ChildMainMenuScreen'
import ShopScreen from '../screens/child/ShopScreen'

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
