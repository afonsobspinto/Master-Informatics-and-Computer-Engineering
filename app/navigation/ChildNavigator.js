import { createStackNavigator } from 'react-navigation'

import Activity from '../screens/child/ActivityScreen'
import ChooseRoutineScreen from '../screens/child/ChooseRoutineScreen'
import ChooseActivityScreen from '../screens/child/ChooseActivityScreen'
import ChildMainMenu from '../screens/child/ChildMainMenuScreen'
import ShopScreen from '../screens/child/ShopScreen'
import RoutineBonusScreen from '../screens/child/RoutineBonusScreen'

export default createStackNavigator({
  ChildMainMenu,
  Activity,
  ChooseRoutineScreen,
  ChooseActivityScreen,
  ShopScreen,
  RoutineBonusScreen
},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false
  }
})
